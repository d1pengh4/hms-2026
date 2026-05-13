"use client";

import { useState } from "react";
import { useSportsStore } from "@/lib/sports-store";
import { teams, calculateTeamScores, getEventTypeColor, getStatusColor, getStatusText } from "@/lib/sports-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const GRADES = [1, 2, 3] as const;

const medalColors: Record<number, string> = {
  1: "text-yellow-500 font-bold",
  2: "text-gray-400 font-bold",
  3: "text-amber-600 font-bold",
};

export default function Page() {
  const { events } = useSportsStore();
  const [activeTab, setActiveTab] = useState("1");

  const prelimEvents = (grade: number) =>
    events.filter((e) => e.grade === grade && e.round === "예선");

  const finalEvents = events.filter((e) => e.round === "결승");

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">🏅 HMS 2026 체육대회</h1>
          <p className="text-muted-foreground text-sm">학년별 일정 및 점수 현황</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="1">1학년</TabsTrigger>
            <TabsTrigger value="2">2학년</TabsTrigger>
            <TabsTrigger value="3">3학년</TabsTrigger>
            <TabsTrigger value="final">결승</TabsTrigger>
          </TabsList>

          {GRADES.map((grade) => (
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
                        <TableHead className="w-12">순위</TableHead>
                        <TableHead>반</TableHead>
                        <TableHead>팀명</TableHead>
                        <TableHead className="text-right">총점</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {calculateTeamScores(events, grade).map((score, idx) => (
                        <TableRow key={score.teamId}>
                          <TableCell className={medalColors[idx + 1] ?? "text-muted-foreground"}>
                            {idx + 1}위
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {teams[score.teamId]?.className}
                          </TableCell>
                          <TableCell
                            className="font-medium"
                            style={{ color: teams[score.teamId]?.color }}
                          >
                            {teams[score.teamId]?.name}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {score.totalPoints}점
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* 예선 일정 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">📅 {grade}학년 예선 일정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {prelimEvents(grade).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between rounded-lg border px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-12">{event.time}</span>
                        <span className="font-medium">{event.name}</span>
                        <Badge variant="outline" className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(event.status)}>
                          {getStatusText(event.status)}
                        </Badge>
                        {event.status === "completed" && event.results && (
                          <span className="text-sm text-muted-foreground">
                            1위:{" "}
                            <span
                              className="font-semibold"
                              style={{ color: teams[event.results.find((r) => r.rank === 1)?.teamId ?? ""]?.color }}
                            >
                              {teams[event.results.find((r) => r.rank === 1)?.teamId ?? ""]?.name ?? "-"}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
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
                {finalEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border px-4 py-3 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-12">{event.time}</span>
                        <span className="font-medium">{event.name}</span>
                        <Badge variant="outline" className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{event.location}</span>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusText(event.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 pl-16">
                      {event.participants.length === 0 ? (
                        <span className="text-sm text-muted-foreground italic">예선 진행 후 자동 배정</span>
                      ) : (
                        event.participants.map((teamId) => (
                          <Badge
                            key={teamId}
                            variant="secondary"
                            style={{ borderColor: teams[teamId]?.color, color: teams[teamId]?.color }}
                            className="border"
                          >
                            {teams[teamId]?.className} {teams[teamId]?.name}
                          </Badge>
                        ))
                      )}
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
