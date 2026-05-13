"use client";

import { useState, useEffect } from "react";
import { GradePage } from "@/components/grade-page";
import { ChevronLeft, Clock, Zap, RefreshCw } from "lucide-react";
import { scheduleByGrade, getMatchStatus, getTeamClassName, type Match } from "@/lib/sports-data";

// 현재 진행 중이거나 다음 경기 찾기
function getCurrentAndNextMatches(): { live: Match[]; next: Match | null } {
  const allMatches: Match[] = [
    ...scheduleByGrade[1],
    ...scheduleByGrade[2],
    ...scheduleByGrade[3],
  ];
  
  const liveMatches = allMatches.filter(m => getMatchStatus(m) === "live");
  const upcomingMatches = allMatches
    .filter(m => getMatchStatus(m) === "upcoming")
    .sort((a, b) => {
      // 같은 날이면 시간순
      if (a.day !== b.day) return a.day - b.day;
      return a.time.localeCompare(b.time);
    });
  
  return {
    live: liveMatches,
    next: upcomingMatches[0] || null,
  };
}

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [matches, setMatches] = useState<{ live: Match[]; next: Match | null }>({ live: [], next: null });

  // 1분마다 시간 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setMatches(getCurrentAndNextMatches());
    }, 60000);
    
    setMatches(getCurrentAndNextMatches());
    return () => clearInterval(interval);
  }, []);

  if (selectedGrade === null) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-md mx-auto px-4 py-8">
          {/* 타이틀 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-1">
              체육대회 2026
            </h1>
            <p className="text-muted-foreground">
              5월 14일(목) - 15일(금)
            </p>
          </div>

          {/* 실시간 경기 정보 */}
          {(matches.live.length > 0 || matches.next) && (
            <div className="mb-6 space-y-3">
              {/* 진행 중인 경기 */}
              {matches.live.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                    <Zap className="w-4 h-4" />
                    <span>진행 중인 경기</span>
                    <span className="ml-auto text-xs animate-pulse">LIVE</span>
                  </div>
                  <div className="space-y-2">
                    {matches.live.slice(0, 3).map((match) => (
                      <div key={match.id} className="text-sm">
                        <span className="font-bold text-red-800">{match.grade}학년 {match.event}</span>
                        {match.team1 !== "전체" && match.team2 && (
                          <span className="text-red-600 ml-2">
                            {getTeamClassName(match.team1)} vs {getTeamClassName(match.team2)}
                          </span>
                        )}
                      </div>
                    ))}
                    {matches.live.length > 3 && (
                      <p className="text-xs text-red-600">외 {matches.live.length - 3}개 경기</p>
                    )}
                  </div>
                </div>
              )}

              {/* 다음 경기 */}
              {matches.next && matches.live.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
                    <Clock className="w-4 h-4" />
                    <span>다음 경기</span>
                    <span className="ml-auto text-xs">{matches.next.time}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold text-blue-800">{matches.next.grade}학년 {matches.next.event}</span>
                    {matches.next.team1 !== "전체" && matches.next.team2 && (
                      <span className="text-blue-600 ml-2">
                        {getTeamClassName(matches.next.team1)} vs {getTeamClassName(matches.next.team2)}
                      </span>
                    )}
                    <p className="text-blue-600 text-xs mt-1">{matches.next.location}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 학년 선택 버튼 */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center mb-2">학년을 선택하세요</p>
            {[1, 2, 3].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className="w-full py-5 bg-card border border-border rounded-2xl text-xl font-bold text-foreground hover:bg-muted hover:border-foreground/20 active:scale-[0.98] transition-all"
              >
                {grade}학년
              </button>
            ))}
          </div>

          {/* 마지막 업데이트 시간 */}
          <p className="text-xs text-muted-foreground text-center mt-8 flex items-center justify-center gap-1">
            <RefreshCw className="w-3 h-3" />
            마지막 업데이트: {currentTime.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto">
        {/* 헤더 */}
        <header className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSelectedGrade(null)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors -ml-2 p-2"
              aria-label="뒤로가기"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="flex-1 text-center font-bold text-foreground pr-7">
              {selectedGrade}학년
            </h1>
          </div>

          {/* 학년 탭 */}
          <div className="flex mt-2 -mx-4 px-4 gap-2">
            {[1, 2, 3].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                  selectedGrade === grade
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {grade}학년
              </button>
            ))}
          </div>
        </header>

        {/* 콘텐츠 */}
        <GradePage grade={selectedGrade} />
      </div>
    </main>
  );
}
