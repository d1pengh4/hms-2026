"use client";

import { teams } from "@/lib/sports-data";
import { Shirt } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface TeamListProps {
  grade: number;
}

export function TeamList({ grade }: TeamListProps) {
  const gradeTeams = teams[grade] || [];
  const [selectedTeam, setSelectedTeam] = useState<typeof gradeTeams[0] | null>(null);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Shirt className="w-5 h-5 text-primary" />
        {grade}학년 반티
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {gradeTeams.map((team) => (
          <button
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className="bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-muted/50 transition-colors active:scale-[0.98]"
          >
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted relative">
              <Image
                src={team.image}
                alt={team.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-foreground text-sm">{team.className}</p>
              <p className="text-xs text-muted-foreground truncate max-w-full">{team.name}</p>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="max-w-sm mx-auto p-0 overflow-hidden">
          <DialogTitle className="sr-only">{selectedTeam?.name} 반티</DialogTitle>
          {selectedTeam && (
            <div className="flex flex-col">
              <div className="relative w-full aspect-square">
                <Image
                  src={selectedTeam.image}
                  alt={selectedTeam.name}
                  fill
                  className="object-contain bg-muted"
                  sizes="100vw"
                />
              </div>
              <div className="p-4 text-center">
                <p className="font-bold text-lg">{selectedTeam.className}</p>
                <p className="text-muted-foreground">{selectedTeam.name}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
