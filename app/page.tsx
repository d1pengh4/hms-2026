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

export default function Page() {
  const { events } = useSportsStore();
  const [tab, setTab] = useState("1");

  const prelims = (grade: number) =>
    events.filter((e) => !e.isFinal && e.grade === grade);

  const finals = events.filter((e) => e.isFinal);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">🏅 HMS 2026 체육대회</h1>
          <p className="text-muted-foreground text-sm">학년별 일정 및 점수 현황</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1">1학년</TabsTrigger>
            <TabsTrigger value="2">2학년</TabsTrigger>
            <TabsTrigger value="3">3학년</TabsTrigger>
            <TabsTrigger value="final">결승</TabsTrigger>
          </TabsList>

          {GRADES.map((grade) => (
            <TabsContent key={grade} value={String(grade)} className="space-y-4">
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

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">📅 {grade}학년 예선 일정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {prelims(grade).map((event) => {
                    const winner = event.results?.find((r) => r.rank === 1);
                    return (
                      <div key={event.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground w-12 shrink-0">{event.time}</span>
                          <span className="font-medium">{event.name}</span>
                          <Badge variant="outline" className={getEventTypeColor(event.type)}>{event.type}</Badge>
                          <span className="text-sm text-muted-foreground">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(event.status)}>{getStatusText(event.status)}</Badge>
                          {winner && (
                            <span className="text-sm">
                              1위:{" "}
                              <span className="font-semibold" style={{ color: teams[winner.teamId]?.color }}>
                                {teams[winner.teamId]?.name}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          ))}

          <TabsContent value="final" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">🏆 결승 일정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {finals.map((event) => (
                  <div key={event.id} className="rounded-lg border px-4 py-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-12 shrink-0">{event.time}</span>
                        <span className="font-medium">{event.name}</span>
                        <Badge variant="outline" className={getEventTypeColor(event.type)}>{event.type}</Badge>
                        <span className="text-sm text-muted-foreground">{event.location}</span>
                      </div>
                      <Badge className={getStatusColor(event.status)}>{getStatusText(event.status)}</Badge>
                    </div>

                    {/* 참가팀 슬롯 — 예선 미완료 시 ? 표시 */}
                    <div className="flex items-center gap-2 pl-16 flex-wrap">
                      {[0, 1, 2].map((i) => {
                        const teamId = event.participants[i];
                        return teamId ? (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="border text-xs"
                            style={{ borderColor: teams[teamId]?.color, color: teams[teamId]?.color }}
                          >
                            {teams[teamId]?.className} {teams[teamId]?.name}
                          </Badge>
                        ) : (
                          <span
                            key={i}
                            className="inline-flex items-center justify-center w-8 h-6 rounded border border-dashed border-muted-foreground text-muted-foreground text-sm font-bold"
                          >
                            ?
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
