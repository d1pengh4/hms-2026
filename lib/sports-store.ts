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
          const updated = state.events.map((event) =>
            event.id === eventId
              ? { ...event, results, status: "completed" as const }
              : event
          );

          // 예선 결과 확정 시 해당 종목 결승 참가팀 자동 갱신
          const changedEvent = updated.find((e) => e.id === eventId);
          if (changedEvent && !changedEvent.isFinal) {
            const winners = updated
              .filter((e) => !e.isFinal && e.name === changedEvent.name && e.results)
              .map((e) => e.results!.find((r) => r.rank === 1)?.teamId)
              .filter((id): id is string => !!id);

            return {
              events: updated.map((e) =>
                e.isFinal && e.name === changedEvent.name
                  ? { ...e, participants: winners }
                  : e
              ),
            };
          }

          return { events: updated };
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
            participants: event.isFinal ? [] : event.participants,
          })),
        })),
    }),
    {
      name: "sports-day-storage",
    }
  )
);
