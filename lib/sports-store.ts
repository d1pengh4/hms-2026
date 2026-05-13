"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { events as initialEvents, type Event } from "./sports-data";

interface SportsStore {
  events: Event[];
  updateEventResult: (eventId: string, results: { teamId: string; rank: number }[]) => void;
  updateEventStatus: (eventId: string, status: "upcoming" | "ongoing" | "completed") => void;
  resetAllResults: () => void;
}

export const useSportsStore = create<SportsStore>()(
  persist(
    (set) => ({
      events: initialEvents,
      updateEventResult: (eventId, results) =>
        set((state) => {
          const eventsAfterUpdate = state.events.map((event) =>
            event.id === eventId
              ? { ...event, results, status: "completed" as const }
              : event
          );

          const updatedEvent = eventsAfterUpdate.find((e) => e.id === eventId);

          // 예선 결과 업데이트 시 해당 종목 결승의 participants 자동 갱신
          if (updatedEvent?.round === "예선") {
            const sportName = updatedEvent.name;
            const prelimWinners = eventsAfterUpdate
              .filter((e) => e.round === "예선" && e.name === sportName && e.results)
              .map((e) => e.results!.find((r) => r.rank === 1)?.teamId)
              .filter((id): id is string => !!id);

            return {
              events: eventsAfterUpdate.map((event) =>
                event.round === "결승" && event.name === sportName
                  ? { ...event, participants: prelimWinners }
                  : event
              ),
            };
          }

          return { events: eventsAfterUpdate };
        }),
      updateEventStatus: (eventId, status) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === eventId ? { ...event, status } : event
          ),
        })),
      resetAllResults: () =>
        set(() => ({
          events: initialEvents.map((event) => ({
            ...event,
            results: undefined,
            status: "upcoming" as const,
            participants: event.round === "결승" ? [] : event.participants,
          })),
        })),
    }),
    {
      name: "sports-day-storage",
    }
  )
);
