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
        set((state) => ({
          events: state.events.map((event) =>
            event.id === eventId
              ? { ...event, results, status: "completed" as const }
              : event
          ),
        })),
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
          })),
        })),
    }),
    {
      name: "sports-day-storage",
    }
  )
);
