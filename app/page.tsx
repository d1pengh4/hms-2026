"use client";

import { useState } from "react";
import { useSportsStore } from "@/lib/sports-store";
import { teams, calculateTeamScores, getEventTypeColor, getStatusColor, getStatusText } from "@/lib/sports-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const GRADES = [1, 2, 3] as const;

const medalColor: Record<number, string> = {
  1: "text-yellow-500 font-bold",
  2: "text-slate-400 font-bold",
  3: "text-amber-600 font-bold",
};

function TeamSlot({ teamId }: { teamId?: string }) {
  if (!teamId) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-6 rounded border border-dashed border-muted-foreground/50 text-muted-foreground text-sm font-bold select-none">
        ?
      </span>
    );
  }
  return (
    <Badge
      variant="secondary"
      className="border text-xs"
      style={{ borderColor: teams[teamId]?.color, color: teams[teamId]?.color }}
    >
      {teams[teamId]?.className}
    </Badge>
  );
}

export default function Page() {
  const { events } = useSportsStore();
  const [tab, setTab] = useState("1");

  // 종목명 목록 (중복 제거, 원래 순서 유지)
  const sportNames = Array.from(
    new Set(events.filter((e) => !e.isFinal).map((e) => e.name))
  );

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">🏅 HMS 2026 체육대회</h1>
          <p className="text-muted-foreground text-sm">학년별 토너먼트 일정</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1">1학년</TabsTrigger>
            <TabsTrigger value="2">2학년</TabsTrigger>
            <TabsTrigger value="3">3학년</TabsTrigger>
          </TabsList>

          {GRADES.map((grade) => {
            const gradeEvents = events.filter((e) => e.grade === grade);

            return (
              <TabsContent key={grade} value={String(grade)} className="space-y-4">
                {/* 점수 순위 */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">📊 {grade}학년 점수 현황</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-14">순위</TableHead>
                          <TableHead>반</TableHead>
                          <TableHead>팀명</TableHead>
                          <TableHead className="text-right">총점</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {calculateTeamScores(events, grade).map((score, i) => (
                          <TableRow key={score.teamId}>
                            <TableCell className={medalColor[i + 1] ?? "text-muted-foreground"}>
                              {i + 1}위
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm">
                              {teams[score.teamId]?.className}
                            </TableCell>
                            <TableCell className="font-medium" style={{ color: teams[score.teamId]?.color }}>
                              {teams[score.teamId]?.name}
                            </TableCell>
                            <TableCell className="text-right font-bold">{score.totalPoints}점</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* 종목별 토너먼트 브래킷 */}
                {sportNames.map((sportName) => {
                  const prelimA = gradeEvents.find((e) => !e.isFinal && e.name === sportName && e.id.endsWith("-a"));
                  const prelimB = gradeEvents.find((e) => !e.isFinal && e.name === sportName && e.id.endsWith("-b"));
                  const final   = gradeEvents.find((e) => e.isFinal && e.name === sportName);
                  if (!prelimA || !prelimB || !final) return null;

                  const winnerA = prelimA.results?.find((r) => r.rank === 1)?.teamId;
                  const winnerB = prelimB.results?.find((r) => r.rank === 1)?.teamId;

                  return (
                    <Card key={sportName}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{sportName}</CardTitle>
                          <Badge variant="outline" className={getEventTypeColor(prelimA.type)}>
                            {prelimA.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          {/* 예선 */}
                          <div className="flex-1 space-y-3">
                            <p className="text-xs text-muted-foreground font-medium mb-1">예선 {prelimA.time} · {prelimA.location}</p>
                            {/* 예선 A */}
                            <div className="rounded-lg border px-3 py-2 space-y-1">
                              {prelimA.participants.map((tid) => (
                                <div key={tid} className="flex items-center justify-between">
                                  <span
                                    className="text-sm font-medium"
                                    style={{ color: teams[tid]?.color }}
                                  >
                                    {teams[tid]?.className}
                                  </span>
                                  <Badge className={`text-xs ${getStatusColor(prelimA.status)}`}>
                                    {getStatusText(prelimA.status)}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                            {/* 예선 B */}
                            <div className="rounded-lg border px-3 py-2 space-y-1">
                              {prelimB.participants.map((tid) => (
                                <div key={tid} className="flex items-center justify-between">
                                  <span
                                    className="text-sm font-medium"
                                    style={{ color: teams[tid]?.color }}
                                  >
                                    {teams[tid]?.className}
                                  </span>
                                  <Badge className={`text-xs ${getStatusColor(prelimB.status)}`}>
                                    {getStatusText(prelimB.status)}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 화살표 */}
                          <div className="text-muted-foreground text-lg">→</div>

                          {/* 결승 */}
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground font-medium mb-1">결승 {final.time} · {final.location}</p>
                            <div className="rounded-lg border px-3 py-2 space-y-1">
                              <div className="flex items-center justify-between">
                                <TeamSlot teamId={winnerA} />
                                <Badge className={`text-xs ${getStatusColor(final.status)}`}>
                                  {getStatusText(final.status)}
                                </Badge>
                              </div>
                              <div>
                                <TeamSlot teamId={winnerB} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </main>
  );
}
