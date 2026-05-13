"use client";

import { teams } from "@/lib/sports-data";
import { useSportsStore } from "@/lib/sports-store";
import { Trophy, Medal } from "lucide-react";

interface RankingCardProps {
  grade: number;
}

export function RankingCard({ grade }: RankingCardProps) {
  const getTeamScores = useSportsStore((state) => state.getTeamScores);
  const rankings = getTeamScores(grade);
  const gradeTeams = teams[grade] || [];

  const getRankStyle = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200";
      case 1:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
      case 2:
        return "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200";
      default:
        return "bg-card border-border";
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-orange-400" />;
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-muted-foreground">
            {index + 1}
          </span>
        );
    }
  };

  const getTeamInfo = (teamId: string) => {
    return gradeTeams.find((t) => t.id === teamId);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <Trophy className="w-5 h-5 text-primary" />
        {grade}학년 순위
      </h2>
      
      {rankings.every(r => r.totalPoints === 0) ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>아직 입력된 결과가 없습니다</p>
          <p className="text-sm mt-1">경기 결과를 입력하면 순위가 표시됩니다</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rankings.map((ranking, index) => {
            const team = getTeamInfo(ranking.teamId);
            if (!team) return null;

            return (
              <div
                key={ranking.teamId}
                className={`flex items-center gap-3 p-3 rounded-xl border ${getRankStyle(index)} transition-all`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background shadow-sm">
                  {getRankIcon(index)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">
                    {team.className}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {team.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    {ranking.totalPoints}
                  </p>
                  <p className="text-xs text-muted-foreground">점</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <p className="text-xs text-muted-foreground text-center">
        동점시: 이어달리기 &gt; 줄다리기 &gt; 배드민턴 순
      </p>
    </div>
  );
}
