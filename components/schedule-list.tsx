"use client";

import { scheduleByGrade, commonSchedule, getMatchStatus, getTeamClassName, type Match } from "@/lib/sports-data";
import { useSportsStore } from "@/lib/sports-store";
import { Clock, MapPin, Trophy } from "lucide-react";

interface ScheduleListProps {
  grade: number;
  onMatchSelect: (match: Match) => void;
}

export function ScheduleList({ grade, onMatchSelect }: ScheduleListProps) {
  const matches = scheduleByGrade[grade] || [];
  const results = useSportsStore((state) => state.results);
  const finalTeams = useSportsStore((state) => state.finalTeams);

  // 1일차와 2일차로 분리
  const day1Matches = matches.filter((m) => m.day === 1);
  const day2Matches = matches.filter((m) => m.day === 2);
  const day1Common = commonSchedule.filter((c) => c.day === 1);
  const day2Common = commonSchedule.filter((c) => c.day === 2);

  const getStatusBadge = (match: Match) => {
    const result = results[match.id];
    if (result?.winner || result?.ranking) {
      return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">완료</span>;
    }
    
    const status = getMatchStatus(match);
    switch (status) {
      case "live":
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 animate-pulse">진행중</span>;
      case "finished":
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">종료</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">예정</span>;
    }
  };

  const renderMatch = (match: Match) => {
    const result = results[match.id];
    const hasResult = result?.winner || result?.ranking;

    return (
      <button
        key={match.id}
        onClick={() => onMatchSelect(match)}
        className="w-full text-left bg-card border border-border rounded-xl p-3 hover:border-foreground/20 active:scale-[0.99] transition-all"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-foreground">{match.event}</span>
              {match.isFinal && (
                <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-amber-100 text-amber-700">
                  <Trophy className="w-3 h-3 inline mr-0.5" />
                  결승
                </span>
              )}
              {match.note && !match.isFinal && (
                <span className="text-xs text-muted-foreground">({match.note})</span>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {match.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {match.location}
              </span>
            </div>

            {match.team1 !== "전체" && match.team2 && (
              <div className="flex items-center gap-2 text-sm">
                {(() => {
                  const t1 = match.team1 === "?" && finalTeams[match.id]?.team1 ? finalTeams[match.id].team1 : match.team1;
                  const t2 = match.team2 === "?" && finalTeams[match.id]?.team2 ? finalTeams[match.id].team2 : match.team2;
                  return (
                    <>
                      <span className={`font-medium ${hasResult && result?.winner === t1 ? "text-primary" : ""}`}>
                        {t1 === "?" ? "?" : getTeamClassName(t1)}
                      </span>
                      <span className="text-muted-foreground">vs</span>
                      <span className={`font-medium ${hasResult && result?.winner === t2 ? "text-primary" : ""}`}>
                        {t2 === "?" ? "?" : getTeamClassName(t2)}
                      </span>
                    </>
                  );
                })()}
              </div>
            )}
            {match.team1 === "전체" && (
              <div className="text-sm text-muted-foreground">전체 참가</div>
            )}
          </div>

          <div className="shrink-0">
            {getStatusBadge(match)}
          </div>
        </div>

        {hasResult && result?.score1 !== undefined && result?.score2 !== undefined && (
          <div className="mt-2 pt-2 border-t border-border text-sm">
            <span className="font-bold text-primary">{result.score1}</span>
            <span className="text-muted-foreground mx-2">:</span>
            <span className="font-bold text-primary">{result.score2}</span>
          </div>
        )}
      </button>
    );
  };

  const renderCommonEvent = (event: typeof commonSchedule[0]) => (
    <div
      key={event.id}
      className={`p-3 rounded-xl text-sm ${
        event.isBreak 
          ? "bg-amber-50 border border-amber-200 text-amber-800" 
          : "bg-muted text-muted-foreground"
      }`}
    >
      <div className="flex items-center gap-2">
        <Clock className="w-3 h-3" />
        <span className="font-medium">{event.time}</span>
        <span>{event.title}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 1일차 */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">1</span>
          1일차 (5/14 목)
        </h3>
        <div className="space-y-2">
          {day1Common.filter(c => c.time.startsWith("09:00")).map(renderCommonEvent)}
          {day1Matches.map(renderMatch)}
          {day1Common.filter(c => c.time.startsWith("11:50") || c.time.startsWith("16")).map(renderCommonEvent)}
        </div>
      </div>

      {/* 2일차 */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">2</span>
          2일차 (5/15 금)
        </h3>
        <div className="space-y-2">
          {day2Common.filter(c => c.time.startsWith("08:")).map(renderCommonEvent)}
          {day2Matches.map(renderMatch)}
          {day2Common.filter(c => !c.time.startsWith("08:")).map(renderCommonEvent)}
        </div>
      </div>
    </div>
  );
}
