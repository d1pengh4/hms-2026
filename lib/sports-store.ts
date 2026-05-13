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

          const changedEvent = updated.find((e) => e.id === eventId);
          if (!changedEvent) return { events: updated };

          if (!changedEvent.isFinal) {
            // 예선 완료 → 같은 학년·종목 결승 participants 자동 갱신
            const prelims = updated.filter(
              (e) => !e.isFinal && e.grade === changedEvent.grade && e.name === changedEvent.name && e.results
            );
            const winners = prelims
              .map((e) => e.results!.find((r) => r.rank === 1)?.teamId)
              .filter((id): id is string => !!id);

            return {
              events: updated.map((e) =>
                e.isFinal && e.grade === changedEvent.grade && e.name === changedEvent.name
                  ? { ...e, participants: winners }
                  : e
              ),
            };
          } else {
            // 결승 완료 → 예선 패자를 3위·4위로 자동 추가
            const prelims = updated.filter(
              (e) => !e.isFinal && e.grade === changedEvent.grade && e.name === changedEvent.name && e.results
            );
            const losers = prelims
              .map((e) => e.results!.find((r) => r.rank === 2)?.teamId)
              .filter((id): id is string => !!id);

            const alreadyRanked = results.map((r) => r.teamId);
            const loserResults = losers
              .filter((id) => !alreadyRanked.includes(id))
              .map((id, i) => ({ teamId: id, rank: 3 + i }));

            return {
              events: updated.map((e) =>
                e.id === eventId
                  ? { ...e, results: [...results, ...loserResults] }
                  : e
              ),
            };
          }
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
