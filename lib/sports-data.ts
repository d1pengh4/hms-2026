// 팀 정보 (반티)
export const teams: Record<number, { id: string; name: string; className: string; image: string; color: string }[]> = {
  1: [
    { id: "1-1", name: "포카리 스웨트", className: "1반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6d57cbbc-09c8-48fa-a202-81c692c6f098.jpeg", color: "#0066CC" },
    { id: "1-2", name: "조은철 선생님", className: "2반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/906593e6-603c-41cf-9bcd-1853ff753f52.jpeg", color: "#FFFFFF" },
    { id: "1-3", name: "공주에게 말대꾸 하지 말것", className: "3반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bc7b50bd-bdd1-48d7-8c18-7e8741b5cd4c.jpeg", color: "#FF9EC4" },
    { id: "1-4", name: "언더스탠 몰라스탠", className: "4반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/084025ac-fd46-451b-89ac-aa7e8ded62e5.jpeg", color: "#FFFFFF" },
  ],
  2: [
    { id: "2-1", name: "AC 밀란", className: "1반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fe33a869-62c9-4736-9f05-8bb3a6a98b8a.jpeg", color: "#AC1A2F" },
    { id: "2-2", name: "아르헨티나", className: "2반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c0a5cf7b-5763-40c1-a8b7-0b7403e0d353.jpeg", color: "#75AADB" },
    { id: "2-3", name: "잉글랜드", className: "3반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7ae7cc39-3410-4460-b94f-a38b2878a316.jpeg", color: "#FFFFFF" },
    { id: "2-4", name: "바르셀로나", className: "4반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5f4cd920-1651-48d5-ac71-d1b95105677b.jpeg", color: "#004D98" },
  ],
  3: [
    { id: "3-1", name: "슬램덩크", className: "1반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a9564195-8a44-42c9-9d15-9edc1ba068f3.jpeg", color: "#C8102E" },
    { id: "3-2", name: "맨체스터 유나이티드", className: "2반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/eb2896e0-f90d-4b84-8a9f-d81ee76cbc74.jpeg", color: "#DA291C" },
    { id: "3-3", name: "레알 마드리드", className: "3반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4f8ad639-c8cf-459a-8e9e-52fba643e74e.jpeg", color: "#FFFFFF" },
    { id: "3-4", name: "LA 레이커스", className: "4반", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9701b26f-1c6f-4a7c-b310-cbe429a9b791.jpeg", color: "#FDB927" },
  ],
};

// 종목 타입
export type EventType = "축구" | "농구" | "발야구" | "피구" | "배드민턴" | "줄다리기" | "씨름" | "이어달리기";

// 점수 입력이 필요한 종목 (승/패가 아닌 실제 점수)
export const scoreBasedEvents: EventType[] = ["축구", "농구", "발야구", "피구"];

// 종목별 배점
export const pointSystem: Record<EventType, { first: number; second: number; third: number; fourth?: number }> = {
  축구: { first: 100, second: 70, third: 40 },
  농구: { first: 100, second: 70, third: 40 },
  발야구: { first: 100, second: 70, third: 40 },
  피구: { first: 100, second: 70, third: 40 },
  배드민턴: { first: 150, second: 100, third: 60 },
  줄다리기: { first: 150, second: 100, third: 60 },
  씨름: { first: 100, second: 70, third: 40 },
  이어달리기: { first: 150, second: 100, third: 60, fourth: 30 },
};

// 장소
export const locations: Record<EventType, string> = {
  축구: "축구장",
  농구: "농구장",
  발야구: "운동장",
  피구: "풋살장",
  배드민턴: "체육관",
  줄다리기: "운동장",
  씨름: "강당",
  이어달리기: "운동장",
};

// 경기 상태
export type MatchStatus = "upcoming" | "live" | "finished";

// 경기 인터페이스
export interface Match {
  id: string;
  day: 1 | 2;
  time: string;
  event: EventType;
  grade: number;
  team1: string;
  team2: string;
  location: string;
  isFinal?: boolean;
  note?: string;
}

// 1학년 경기 일정
export const grade1Matches: Match[] = [
  // 1일차 (5/14)
  { id: "1-1-1", day: 1, time: "09:20~09:50", event: "농구", grade: 1, team1: "1-4", team2: "1-2", location: "농구장" },
  { id: "1-1-2", day: 1, time: "09:50~10:20", event: "축구", grade: 1, team1: "1-4", team2: "1-2", location: "축구장" },
  { id: "1-1-3", day: 1, time: "10:20~10:50", event: "농구", grade: 1, team1: "1-3", team2: "1-1", location: "농구장" },
  { id: "1-1-4", day: 1, time: "10:50~11:20", event: "피구", grade: 1, team1: "1-3", team2: "1-1", location: "풋살장" },
  { id: "1-1-5", day: 1, time: "11:20~11:50", event: "발야구", grade: 1, team1: "1-2", team2: "1-1", location: "운동장 동쪽", note: "동쪽" },
  { id: "1-1-6", day: 1, time: "11:20~11:50", event: "발야구", grade: 1, team1: "1-3", team2: "1-4", location: "운동장 서쪽", note: "서쪽" },
  { id: "1-1-7", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 1, team1: "1-3", team2: "1-2", location: "운동장", note: "예선" },
  { id: "1-1-8", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 1, team1: "1-4", team2: "1-1", location: "운동장", note: "예선" },
  { id: "1-1-9", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 1, team1: "?", team2: "?", location: "운동장", note: "결승", isFinal: true },
  { id: "1-1-10", day: 1, time: "14:00~14:30", event: "피구", grade: 1, team1: "1-2", team2: "1-4", location: "풋살장" },
  { id: "1-1-11", day: 1, time: "14:30~15:00", event: "축구", grade: 1, team1: "1-1", team2: "1-3", location: "축구장" },
  { id: "1-1-12", day: 1, time: "15:00~15:30", event: "농구", grade: 1, team1: "?", team2: "?", location: "농구장", isFinal: true, note: "결승" },
  { id: "1-1-13", day: 1, time: "16:00~16:30", event: "발야구", grade: 1, team1: "?", team2: "?", location: "운동장 서쪽", isFinal: true, note: "결승" },
  // 2일차 (5/15)
  { id: "1-2-1", day: 2, time: "08:50~09:20", event: "배드민턴", grade: 1, team1: "1-1", team2: "1-4", location: "체육관", isFinal: true, note: "결승" },
  { id: "1-2-2", day: 2, time: "10:40~11:10", event: "피구", grade: 1, team1: "?", team2: "?", location: "풋살장", isFinal: true, note: "결승" },
  { id: "1-2-3", day: 2, time: "10:40~11:10", event: "축구", grade: 1, team1: "?", team2: "?", location: "축구장", isFinal: true, note: "결승" },
  { id: "1-2-4", day: 2, time: "12:40~13:40", event: "씨름", grade: 1, team1: "1-1", team2: "1-4", location: "강당", note: "예선" },
  { id: "1-2-5", day: 2, time: "12:40~13:40", event: "씨름", grade: 1, team1: "1-2", team2: "1-3", location: "강당", note: "예선" },
  { id: "1-2-6", day: 2, time: "12:40~13:40", event: "씨름", grade: 1, team1: "?", team2: "?", location: "강당", isFinal: true, note: "결승" },
  { id: "1-2-7", day: 2, time: "13:40~14:10", event: "이어달리기", grade: 1, team1: "전체", team2: "", location: "운동장", note: "1학년" },
];

// 2학년 경기 일정
export const grade2Matches: Match[] = [
  // 1일차 (5/14)
  { id: "2-1-1", day: 1, time: "09:20~09:50", event: "발야구", grade: 2, team1: "2-1", team2: "2-2", location: "운동장 동쪽", note: "동쪽" },
  { id: "2-1-2", day: 1, time: "09:20~09:50", event: "발야구", grade: 2, team1: "2-4", team2: "2-3", location: "운동장 서쪽", note: "서쪽" },
  { id: "2-1-3", day: 1, time: "09:50~10:20", event: "피구", grade: 2, team1: "2-1", team2: "2-3", location: "풋살장" },
  { id: "2-1-4", day: 1, time: "10:20~10:50", event: "피구", grade: 2, team1: "2-4", team2: "2-2", location: "풋살장" },
  { id: "2-1-5", day: 1, time: "10:50~11:20", event: "축구", grade: 2, team1: "2-3", team2: "2-2", location: "축구장" },
  { id: "2-1-6", day: 1, time: "11:20~11:50", event: "농구", grade: 2, team1: "2-1", team2: "2-3", location: "농구장" },
  { id: "2-1-7", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 2, team1: "2-1", team2: "2-3", location: "운동장", note: "예선" },
  { id: "2-1-8", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 2, team1: "2-2", team2: "2-4", location: "운동장", note: "예선" },
  { id: "2-1-9", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 2, team1: "?", team2: "?", location: "운동장", note: "결승", isFinal: true },
  { id: "2-1-10", day: 1, time: "14:00~14:30", event: "농구", grade: 2, team1: "2-2", team2: "2-4", location: "농구장" },
  { id: "2-1-11", day: 1, time: "15:00~15:30", event: "축구", grade: 2, team1: "2-1", team2: "2-4", location: "축구장" },
  { id: "2-1-12", day: 1, time: "15:30~16:00", event: "농구", grade: 2, team1: "?", team2: "?", location: "농구장", isFinal: true, note: "결승" },
  { id: "2-1-13", day: 1, time: "16:00~16:30", event: "발야구", grade: 2, team1: "?", team2: "?", location: "운동장 동쪽", isFinal: true, note: "결승" },
  // 2일차 (5/15)
  { id: "2-2-1", day: 2, time: "08:50~09:20", event: "배드민턴", grade: 2, team1: "2-1", team2: "2-4", location: "체육관", isFinal: true, note: "결승" },
  { id: "2-2-2", day: 2, time: "09:20~10:00", event: "피구", grade: 2, team1: "?", team2: "?", location: "풋살장", isFinal: true, note: "결승" },
  { id: "2-2-3", day: 2, time: "10:00~10:40", event: "축구", grade: 2, team1: "?", team2: "?", location: "축구장", isFinal: true, note: "결승" },
  { id: "2-2-4", day: 2, time: "12:40~13:40", event: "씨름", grade: 2, team1: "2-1", team2: "2-3", location: "강당", note: "예선" },
  { id: "2-2-5", day: 2, time: "12:40~13:40", event: "씨름", grade: 2, team1: "2-2", team2: "2-4", location: "강당", note: "예선" },
  { id: "2-2-6", day: 2, time: "12:40~13:40", event: "씨름", grade: 2, team1: "?", team2: "?", location: "강당", isFinal: true, note: "결승" },
  { id: "2-2-7", day: 2, time: "13:40~14:10", event: "이어달리기", grade: 2, team1: "전체", team2: "", location: "운동장", note: "2학년" },
];

// 3학년 경기 일정
export const grade3Matches: Match[] = [
  // 1일차 (5/14)
  { id: "3-1-1", day: 1, time: "09:20~09:50", event: "피구", grade: 3, team1: "3-4", team2: "3-1", location: "풋살장" },
  { id: "3-1-2", day: 1, time: "09:50~10:20", event: "농구", grade: 3, team1: "3-4", team2: "3-1", location: "농구장" },
  { id: "3-1-3", day: 1, time: "10:20~10:50", event: "축구", grade: 3, team1: "3-4", team2: "3-3", location: "축구장" },
  { id: "3-1-4", day: 1, time: "10:50~11:20", event: "농구", grade: 3, team1: "3-3", team2: "3-2", location: "농구장" },
  { id: "3-1-5", day: 1, time: "11:20~11:50", event: "피구", grade: 3, team1: "3-2", team2: "3-3", location: "풋살장" },
  { id: "3-1-6", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 3, team1: "3-3", team2: "3-2", location: "운동장", note: "예선" },
  { id: "3-1-7", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 3, team1: "3-1", team2: "3-4", location: "운동장", note: "예선" },
  { id: "3-1-8", day: 1, time: "13:00~14:00", event: "줄다리기", grade: 3, team1: "?", team2: "?", location: "운동장", note: "결승", isFinal: true },
  { id: "3-1-9", day: 1, time: "14:00~14:30", event: "발야구", grade: 3, team1: "3-3", team2: "3-1", location: "운동장 동쪽", note: "동쪽" },
  { id: "3-1-10", day: 1, time: "14:00~14:30", event: "발야구", grade: 3, team1: "3-4", team2: "3-2", location: "운동장 서쪽", note: "서쪽" },
  { id: "3-1-11", day: 1, time: "14:30~15:00", event: "농구", grade: 3, team1: "?", team2: "?", location: "농구장", isFinal: true, note: "결승" },
  { id: "3-1-12", day: 1, time: "15:30~16:00", event: "축구", grade: 3, team1: "3-1", team2: "3-2", location: "축구장" },
  // 2일차 (5/15)
  { id: "3-2-1", day: 2, time: "08:50~09:20", event: "배드민턴", grade: 3, team1: "3-1", team2: "3-4", location: "체육관", isFinal: true, note: "결승" },
  { id: "3-2-2", day: 2, time: "09:20~10:00", event: "축구", grade: 3, team1: "?", team2: "?", location: "축구장", isFinal: true, note: "결승" },
  { id: "3-2-3", day: 2, time: "10:00~10:40", event: "피구", grade: 3, team1: "?", team2: "?", location: "풋살장", isFinal: true, note: "결승" },
  { id: "3-2-4", day: 2, time: "11:10~12:00", event: "발야구", grade: 3, team1: "?", team2: "?", location: "운동장 중앙", isFinal: true, note: "결승" },
  { id: "3-2-5", day: 2, time: "12:40~13:40", event: "씨름", grade: 3, team1: "3-3", team2: "3-2", location: "강당", note: "예선" },
  { id: "3-2-6", day: 2, time: "12:40~13:40", event: "씨름", grade: 3, team1: "3-4", team2: "3-1", location: "강당", note: "예선" },
  { id: "3-2-7", day: 2, time: "12:40~13:40", event: "씨름", grade: 3, team1: "?", team2: "?", location: "강당", isFinal: true, note: "결승" },
  { id: "3-2-8", day: 2, time: "13:40~14:10", event: "이어달리기", grade: 3, team1: "전체", team2: "", location: "운동장", note: "3학년" },
];

// 전체 일정 (학년별)
export const scheduleByGrade: Record<number, Match[]> = {
  1: grade1Matches,
  2: grade2Matches,
  3: grade3Matches,
};

// 공통 일정
export interface CommonEvent {
  id: string;
  day: 1 | 2;
  time: string;
  title: string;
  isBreak?: boolean;
}

export const commonSchedule: CommonEvent[] = [
  { id: "c1", day: 1, time: "09:00~09:20", title: "개회식 / 준비운동" },
  { id: "c2", day: 1, time: "11:50~12:50", title: "점심식사", isBreak: true },
  { id: "c4", day: 2, time: "08:30~08:50", title: "준비운동 및 경기안내" },
  { id: "c5", day: 2, time: "12:00~12:40", title: "점심식사", isBreak: true },
  { id: "c6", day: 2, time: "14:10~", title: "정리 정돈 및 종례" },
  { id: "c7", day: 2, time: "15:00", title: "귀가버스" },
];

// 경기 결과 타입
export interface MatchResult {
  matchId: string;
  winner?: string;
  loser?: string;
  score1?: number;
  score2?: number;
  ranking?: string[]; // 이어달리기용
}

// 현재 시간 기준 경기 상태 확인
export function getMatchStatus(match: Match): MatchStatus {
  const now = new Date();
  const month = now.getMonth() + 1; // 0-indexed
  const today = now.getDate();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // 5월이 아니면 모두 upcoming
  if (month !== 5) {
    return "upcoming";
  }
  
  // 5월 14일 = day 1, 5월 15일 = day 2
  const matchDay = match.day === 1 ? 14 : 15;
  
  if (today < matchDay) {
    return "upcoming";
  }
  
  if (today > matchDay) {
    return "finished";
  }
  
  // 같은 날인 경우 시간 비교
  const timeParts = match.time.split("~");
  const startTime = timeParts[0];
  const endTime = timeParts[1] || timeParts[0];
  
  const [startHour, startMin] = startTime.split(":").map(Number);
  const endParts = endTime.split(":");
  const endHour = parseInt(endParts[0]) || startHour + 1;
  const endMin = parseInt(endParts[1]) || 0;
  
  const currentTotalMin = currentHour * 60 + currentMinute;
  const startTotalMin = startHour * 60 + startMin;
  const endTotalMin = endHour * 60 + endMin;
  
  if (currentTotalMin < startTotalMin) return "upcoming";
  if (currentTotalMin >= endTotalMin) return "finished";
  return "live";
}

// 점수 계산 함수
export function calculatePoints(eventName: EventType, rank: number): number {
  const points = pointSystem[eventName];
  if (!points) return 0;
  
  switch (rank) {
    case 1: return points.first;
    case 2: return points.second;
    case 3: return points.third;
    case 4: return points.fourth || 0;
    default: return 0;
  }
}

// 팀 이름 가져오기
export function getTeamName(teamId: string): string {
  const grade = parseInt(teamId.split("-")[0]);
  const team = teams[grade]?.find(t => t.id === teamId);
  return team?.name || teamId;
}

export function getTeamClassName(teamId: string): string {
  const grade = parseInt(teamId.split("-")[0]);
  const team = teams[grade]?.find(t => t.id === teamId);
  return team?.className || teamId;
}
