"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MatchResult, EventType } from "./sports-data";
import { scheduleByGrade, pointSystem } from "./sports-data";

interface SportsStore {
  results: Record<string, MatchResult>;
  // 결승 참가팀 오버라이드: 예선 승자가 자동으로 채워짐 (matchId → { team1, team2 })
  finalTeams: Record<string, { team1: string; team2: string }>;
  setResult: (matchId: string, result: MatchResult) => void;
  clearResult: (matchId: string) => void;
  getTeamScores: (grade: number) => { teamId: string; totalPoints: number; eventPoints: Record<EventType, number> }[];
}

// 예선 결과로 결승 참가팀 계산
function computeFinalTeams(
  results: Record<string, MatchResult>
): Record<string, { team1: string; team2: string }> {
  const overrides: Record<string, { team1: string; team2: string }> = {};

  for (const gradeMatches of Object.values(scheduleByGrade)) {
    // 결승 중 team1 또는 team2가 "?"인 것만 대상
    const finals = gradeMatches.filter(
      (m) => m.isFinal && (m.team1 === "?" || m.team2 === "?")
    );

    for (const final of finals) {
      // 같은 종목의 예선 경기들 (순서 유지)
      const prelims = gradeMatches.filter(
        (m) => !m.isFinal && m.event === final.event && m.grade === final.grade
      );

      const winners = prelims
        .map((p) => results[p.id]?.winner)
        .filter((w): w is string => !!w);

      if (winners.length >= 1 || winners.length >= 2) {
        overrides[final.id] = {
          team1: winners[0] ?? "?",
          team2: winners[1] ?? "?",
        };
      }
    }
  }

  return overrides;
}

export const useSportsStore = create<SportsStore>()(
  persist(
    (set, get) => ({
      results: {},
      finalTeams: {},

      setResult: (matchId: string, result: MatchResult) => {
        set((state) => {
          const newResults = { ...state.results, [matchId]: result };
          return {
            results: newResults,
            finalTeams: computeFinalTeams(newResults),
          };
        });
      },

      clearResult: (matchId: string) => {
        set((state) => {
          const newResults = { ...state.results };
          delete newResults[matchId];
          return {
            results: newResults,
            finalTeams: computeFinalTeams(newResults),
          };
        });
      },
      
      getTeamScores: (grade: number) => {
        const { results } = get();
        const matches = scheduleByGrade[grade] || [];
        
        // 팀별 점수 초기화
        const teamScores: Record<string, { totalPoints: number; eventPoints: Record<EventType, number> }> = {};
        
        for (let i = 1; i <= 4; i++) {
          const teamId = `${grade}-${i}`;
          teamScores[teamId] = {
            totalPoints: 0,
            eventPoints: {
              축구: 0, 농구: 0, 발야구: 0, 피구: 0,
              배드민턴: 0, 줄다리기: 0, 씨름: 0, 이어달리기: 0,
            },
          };
        }
        
        // 결과 기반 점수 계산
        matches.forEach((match) => {
          const result = results[match.id];
          if (!result) return;
          
          // 이어달리기는 별도 처리
          if (match.event === "이어달리기" && result.ranking) {
            result.ranking.forEach((teamId, index) => {
              const rank = index + 1;
              const points = pointSystem["이어달리기"];
              let earnedPoints = 0;
              if (rank === 1) earnedPoints = points.first;
              else if (rank === 2) earnedPoints = points.second;
              else if (rank === 3) earnedPoints = points.third;
              else if (rank === 4) earnedPoints = points.fourth || 0;
              
              if (teamScores[teamId]) {
                teamScores[teamId].eventPoints["이어달리기"] = earnedPoints;
                teamScores[teamId].totalPoints += earnedPoints;
              }
            });
            return;
          }
          
          // 결승전만 점수 반영
          if (match.isFinal && result.winner && result.loser) {
            const points = pointSystem[match.event];
            
            // 승자 = 1위, 패자 = 2위
            if (teamScores[result.winner]) {
              teamScores[result.winner].eventPoints[match.event] = points.first;
              teamScores[result.winner].totalPoints += points.first;
            }
            if (teamScores[result.loser]) {
              teamScores[result.loser].eventPoints[match.event] = points.second;
              teamScores[result.loser].totalPoints += points.second;
            }
          }
        });
        
        // 정렬: 총점 > 이어달리기 > 줄다리기 > 배드민턴
        return Object.entries(teamScores)
          .map(([teamId, data]) => ({
            teamId,
            totalPoints: data.totalPoints,
            eventPoints: data.eventPoints,
          }))
          .sort((a, b) => {
            if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
            if (b.eventPoints["이어달리기"] !== a.eventPoints["이어달리기"]) 
              return b.eventPoints["이어달리기"] - a.eventPoints["이어달리기"];
            if (b.eventPoints["줄다리기"] !== a.eventPoints["줄다리기"]) 
              return b.eventPoints["줄다리기"] - a.eventPoints["줄다리기"];
            return b.eventPoints["배드민턴"] - a.eventPoints["배드민턴"];
          });
      },
    }),
    {
      name: "sports-day-2026",
    }
  )
);
