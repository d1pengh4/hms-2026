"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  teams,
  pointSystem,
  scoreBasedEvents,
  getTeamClassName,
  getTeamName,
  type Match,
  type EventType,
} from "@/lib/sports-data";
import { useSportsStore } from "@/lib/sports-store";
import { Clock, MapPin, Trophy, Check, X } from "lucide-react";

interface MatchModalProps {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatchModal({ match, open, onOpenChange }: MatchModalProps) {
  const { results, setResult, clearResult, finalTeams } = useSportsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [score1, setScore1] = useState<string>("");
  const [score2, setScore2] = useState<string>("");
  const [relayRanking, setRelayRanking] = useState<string[]>([]);

  useEffect(() => {
    if (match && open) {
      const result = results[match.id];
      if (result) {
        setWinner(result.winner || null);
        setScore1(result.score1?.toString() || "");
        setScore2(result.score2?.toString() || "");
        setRelayRanking(result.ranking || []);
      } else {
        setWinner(null);
        setScore1("");
        setScore2("");
        setRelayRanking([]);
      }
      setIsEditing(false);
    }
  }, [match, open, results]);

  if (!match) return null;

  const points = pointSystem[match.event as EventType];
  const isScoreBased = scoreBasedEvents.includes(match.event as EventType);
  const isRelay = match.event === "이어달리기";
  const currentResult = results[match.id];
  const gradeTeams = teams[match.grade] || [];

  const t1 = match.team1 === "?" && finalTeams[match.id]?.team1 ? finalTeams[match.id].team1 : match.team1;
  const t2 = match.team2 === "?" && finalTeams[match.id]?.team2 ? finalTeams[match.id].team2 : match.team2;

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleRelayRankSelect = (teamId: string) => {
    if (relayRanking.includes(teamId)) {
      setRelayRanking(relayRanking.filter((id) => id !== teamId));
    } else if (relayRanking.length < 4) {
      setRelayRanking([...relayRanking, teamId]);
    }
  };

  const handleSave = () => {
    if (isRelay) {
      if (relayRanking.length === 4) {
        setResult(match.id, {
          matchId: match.id,
          ranking: relayRanking,
        });
      }
    } else if (winner) {
      const loser = t1 === winner ? t2 : t1;
      setResult(match.id, {
        matchId: match.id,
        winner,
        loser,
        score1: isScoreBased ? parseInt(score1) || 0 : undefined,
        score2: isScoreBased ? parseInt(score2) || 0 : undefined,
      });
    }
    setIsEditing(false);
    onOpenChange(false);
  };

  const handleClear = () => {
    clearResult(match.id);
    setWinner(null);
    setScore1("");
    setScore2("");
    setRelayRanking([]);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const result = currentResult;
    if (result) {
      setWinner(result.winner || null);
      setScore1(result.score1?.toString() || "");
      setScore2(result.score2?.toString() || "");
      setRelayRanking(result.ranking || []);
    } else {
      setWinner(null);
      setScore1("");
      setScore2("");
      setRelayRanking([]);
    }
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {match.event}
            {match.isFinal && (
              <span className="px-2 py-0.5 text-xs font-medium rounded bg-amber-100 text-amber-700">
                결승
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 기본 정보 */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {match.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {match.location}
            </span>
          </div>

          {/* 배점 정보 */}
          {match.isFinal && (
            <div className="bg-muted rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                결승 배점
              </h4>
              <div className="flex gap-4 text-center text-xs">
                <div>
                  <p className="font-bold text-amber-500">{points?.first || 0}점</p>
                  <p className="text-muted-foreground">승리</p>
                </div>
                <div>
                  <p className="font-bold text-gray-400">{points?.second || 0}점</p>
                  <p className="text-muted-foreground">패배</p>
                </div>
              </div>
            </div>
          )}

          {/* 이어달리기 */}
          {isRelay ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">
                  {isEditing ? "순위 입력 (1위부터 선택)" : "순위"}
                </h4>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={handleStartEdit}>
                    결과 입력
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {gradeTeams.map((team) => {
                  const rankIndex = relayRanking.indexOf(team.id);
                  const savedRankIndex = currentResult?.ranking?.indexOf(team.id) ?? -1;

                  return (
                    <button
                      key={team.id}
                      onClick={() => isEditing && handleRelayRankSelect(team.id)}
                      disabled={!isEditing}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        isEditing
                          ? rankIndex >= 0
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                          : savedRankIndex >= 0
                          ? "border-primary/30 bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isEditing
                            ? rankIndex >= 0
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                            : savedRankIndex >= 0
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isEditing
                          ? rankIndex >= 0
                            ? rankIndex + 1
                            : "-"
                          : savedRankIndex >= 0
                          ? savedRankIndex + 1
                          : "-"}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">{team.className}</p>
                        <p className="text-xs text-muted-foreground">{team.name}</p>
                      </div>
                      {!isEditing && savedRankIndex >= 0 && (
                        <span className="text-xs text-primary font-medium">
                          +{[points?.first, points?.second, points?.third, points?.fourth || 0][savedRankIndex]}점
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 일반 경기 */
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">
                  {isEditing ? (isScoreBased ? "점수 및 승자 선택" : "승자 선택") : "대진"}
                </h4>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={handleStartEdit}>
                    결과 입력
                  </Button>
                )}
              </div>

              {t1 !== "?" && t2 !== "?" ? (
                <div className="space-y-3">
                  {/* 팀 1 */}
                  <button
                    onClick={() => isEditing && setWinner(t1)}
                    disabled={!isEditing}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      isEditing
                        ? winner === t1
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                        : currentResult?.winner === t1
                        ? "border-green-500 bg-green-50"
                        : "border-border"
                    }`}
                  >
                    <div className="flex-1 text-left">
                      <p className="font-medium">{getTeamClassName(t1)}</p>
                      <p className="text-xs text-muted-foreground">{getTeamName(t1)}</p>
                    </div>
                    {isEditing && isScoreBased && (
                      <Input
                        type="number"
                        value={score1}
                        onChange={(e) => setScore1(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-16 text-center"
                        placeholder="점수"
                      />
                    )}
                    {!isEditing && currentResult?.winner === t1 && (
                      <span className="text-green-600 font-bold">승</span>
                    )}
                    {!isEditing && currentResult?.loser === t1 && (
                      <span className="text-muted-foreground">패</span>
                    )}
                  </button>

                  <div className="text-center text-sm text-muted-foreground">VS</div>

                  {/* 팀 2 */}
                  <button
                    onClick={() => isEditing && setWinner(t2)}
                    disabled={!isEditing}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      isEditing
                        ? winner === t2
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                        : currentResult?.winner === t2
                        ? "border-green-500 bg-green-50"
                        : "border-border"
                    }`}
                  >
                    <div className="flex-1 text-left">
                      <p className="font-medium">{getTeamClassName(t2)}</p>
                      <p className="text-xs text-muted-foreground">{getTeamName(t2)}</p>
                    </div>
                    {isEditing && isScoreBased && (
                      <Input
                        type="number"
                        value={score2}
                        onChange={(e) => setScore2(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-16 text-center"
                        placeholder="점수"
                      />
                    )}
                    {!isEditing && currentResult?.winner === t2 && (
                      <span className="text-green-600 font-bold">승</span>
                    )}
                    {!isEditing && currentResult?.loser === t2 && (
                      <span className="text-muted-foreground">패</span>
                    )}
                  </button>

                  {!isEditing && currentResult && isScoreBased && currentResult.score1 !== undefined && (
                    <div className="text-center text-lg font-bold">
                      {currentResult.score1} : {currentResult.score2}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                  예선 결과에 따라 결정됩니다
                </p>
              )}
            </div>
          )}

          {/* 편집 모드 버튼 */}
          {isEditing && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                <X className="w-4 h-4 mr-1" />
                취소
              </Button>
              <Button
                className="flex-1"
                onClick={handleSave}
                disabled={isRelay ? relayRanking.length !== 4 : !winner}
              >
                <Check className="w-4 h-4 mr-1" />
                저장
              </Button>
            </div>
          )}

          {/* 결과 초기화 */}
          {!isEditing && currentResult && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground"
              onClick={handleClear}
            >
              결과 초기화
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
