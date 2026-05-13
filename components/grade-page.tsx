"use client";

import { useState } from "react";
import { RankingCard } from "./ranking-card";
import { ScheduleList } from "./schedule-list";
import { TeamList } from "./team-list";
import { MatchModal } from "./match-modal";
import { PointInfo } from "./point-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Trophy, Shirt } from "lucide-react";
import type { Match } from "@/lib/sports-data";

interface GradePageProps {
  grade: number;
}

export function GradePage({ grade }: GradePageProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="ranking" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="ranking" className="flex items-center gap-1.5 text-sm">
            <Trophy className="w-4 h-4" />
            순위
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1.5 text-sm">
            <CalendarDays className="w-4 h-4" />
            일정
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-1.5 text-sm">
            <Shirt className="w-4 h-4" />
            반티
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ranking" className="mt-4 space-y-4">
          <RankingCard grade={grade} />
          <PointInfo />
        </TabsContent>

        <TabsContent value="schedule" className="mt-4">
          <ScheduleList grade={grade} onMatchSelect={handleMatchSelect} />
        </TabsContent>

        <TabsContent value="teams" className="mt-4">
          <TeamList grade={grade} />
        </TabsContent>
      </Tabs>

      <MatchModal
        match={selectedMatch}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
