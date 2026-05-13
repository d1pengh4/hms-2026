// 팀 정보 (반티)
export const teams: Record<string, { name: string; className: string; color: string }> = {
  "1-1": { name: "포카리 스웨트", className: "1학년 1반", color: "#3B82F6" },
  "1-2": { name: "조은철 선생님", className: "1학년 2반", color: "#EF4444" },
  "1-3": { name: "공주에게 말대꾸 하지 말것", className: "1학년 3반", color: "#F59E0B" },
  "1-4": { name: "언더스탠 몰라스탠", className: "1학년 4반", color: "#10B981" },
  "2-1": { name: "AC 밀란", className: "2학년 1반", color: "#DC2626" },
  "2-2": { name: "아르헨티나", className: "2학년 2반", color: "#60A5FA" },
  "2-3": { name: "잉글랜드", className: "2학년 3반", color: "#F8FAFC" },
  "2-4": { name: "바르셀로나", className: "2학년 4반", color: "#7C3AED" },
  "3-1": { name: "슬램덩크", className: "3학년 1반", color: "#F97316" },
  "3-2": { name: "맨체스터 유나이티드", className: "3학년 2반", color: "#B91C1C" },
  "3-3": { name: "레알 마드리드", className: "3학년 3반", color: "#FBBF24" },
  "3-4": { name: "LA 레이커스", className: "3학년 4반", color: "#7C3AED" },
};

// 종목별 배점
export const pointSystem: Record<string, { first: number; second: number; third: number; fourth?: number }> = {
  "축구": { first: 100, second: 70, third: 40 },
  "농구": { first: 100, second: 70, third: 40 },
  "발야구": { first: 100, second: 70, third: 40 },
  "피구": { first: 100, second: 70, third: 40 },
  "배드민턴": { first: 150, second: 100, third: 60 },
  "줄다리기": { first: 150, second: 100, third: 60 },
  "씨름": { first: 100, second: 70, third: 40 },
  "이어달리기": { first: 150, second: 100, third: 60, fourth: 30 },
};

// 종목 정보
export interface Event {
  id: string;
  name: string;
  type: "남" | "여" | "혼성";
  grade?: 1 | 2 | 3;
  round?: "예선" | "결승";
  time: string;
  location: string;
  participants: string[];
  results?: { teamId: string; rank: number }[];
  status: "upcoming" | "ongoing" | "completed";
}

// 일정 데이터
export const events: Event[] = [
  // 1학년 종목
  {
    id: "1-soccer",
    name: "축구",
    type: "남",
    grade: 1,
    round: "예선",
    time: "09:00",
    location: "운동장",
    participants: ["1-1", "1-2", "1-3", "1-4"],
    status: "upcoming",
  },
  {
    id: "1-basketball",
    name: "농구",
    type: "남",
    grade: 1,
    round: "예선",
    time: "10:30",
    location: "체육관",
    participants: ["1-1", "1-2", "1-3", "1-4"],
    status: "upcoming",
  },
  {
    id: "1-kickball",
    name: "발야구",
    type: "여",
    grade: 1,
    round: "예선",
    time: "11:30",
    location: "운동장",
    participants: ["1-1", "1-2", "1-3", "1-4"],
    status: "upcoming",
  },
  {
    id: "1-dodgeball",
    name: "피구",
    type: "여",
    grade: 1,
    round: "예선",
    time: "13:00",
    location: "체육관",
    participants: ["1-1", "1-2", "1-3", "1-4"],
    status: "upcoming",
  },
  {
    id: "1-badminton",
    name: "배드민턴",
    type: "혼성",
    grade: 1,
    round: "예선",
    time: "14:00",
    location: "체육관",
    participants: ["1-1", "1-2", "1-3", "1-4"],
    status: "upcoming",
  },
  {
    id: "1-tugofwar",
    name: "줄다리기",
    type: "혼성",
    grade: 1,
    round: "예선",
    time: "15:00",
    location: "운동장",
    participants: ["1-1", "1-2", "1-3", "1-4"],
    status: "upcoming",
  },
  {
    id: "1-wrestling",
    name: "씨름",
    type: "남",
    grade: 1,
    round: "예선",
    time: "15:30",
    location: "체육관",
    participants: ["1-1", "1-2", "1-3", "1-4"],
    status: "upcoming",
  },
  {
    id: "1-relay",
    name: "이어달리기",
    type: "혼성",
    grade: 1,
    round: "예선",
    time: "16:30",
    location: "운동장",
    participants: ["1-1", "1-2", "1-3", "1-4"],
    status: "upcoming",
  },
  // 2학년 종목
  {
    id: "2-soccer",
    name: "축구",
    type: "남",
    grade: 2,
    round: "예선",
    time: "09:00",
    location: "운동장",
    participants: ["2-1", "2-2", "2-3", "2-4"],
    status: "upcoming",
  },
  {
    id: "2-basketball",
    name: "농구",
    type: "남",
    grade: 2,
    round: "예선",
    time: "10:30",
    location: "체육관",
    participants: ["2-1", "2-2", "2-3", "2-4"],
    status: "upcoming",
  },
  {
    id: "2-kickball",
    name: "발야구",
    type: "여",
    grade: 2,
    round: "예선",
    time: "11:30",
    location: "운동장",
    participants: ["2-1", "2-2", "2-3", "2-4"],
    status: "upcoming",
  },
  {
    id: "2-dodgeball",
    name: "피구",
    type: "여",
    grade: 2,
    round: "예선",
    time: "13:00",
    location: "체육관",
    participants: ["2-1", "2-2", "2-3", "2-4"],
    status: "upcoming",
  },
  {
    id: "2-badminton",
    name: "배드민턴",
    type: "혼성",
    grade: 2,
    round: "예선",
    time: "14:00",
    location: "체육관",
    participants: ["2-1", "2-2", "2-3", "2-4"],
    status: "upcoming",
  },
  {
    id: "2-tugofwar",
    name: "줄다리기",
    type: "혼성",
    grade: 2,
    round: "예선",
    time: "15:00",
    location: "운동장",
    participants: ["2-1", "2-2", "2-3", "2-4"],
    status: "upcoming",
  },
  {
    id: "2-wrestling",
    name: "씨름",
    type: "남",
    grade: 2,
    round: "예선",
    time: "15:30",
    location: "체육관",
    participants: ["2-1", "2-2", "2-3", "2-4"],
    status: "upcoming",
  },
  {
    id: "2-relay",
    name: "이어달리기",
    type: "혼성",
    grade: 2,
    round: "예선",
    time: "16:30",
    location: "운동장",
    participants: ["2-1", "2-2", "2-3", "2-4"],
    status: "upcoming",
  },
  // 3학년 종목
  {
    id: "3-soccer",
    name: "축구",
    type: "남",
    grade: 3,
    round: "예선",
    time: "09:00",
    location: "운동장",
    participants: ["3-1", "3-2", "3-3", "3-4"],
    status: "upcoming",
  },
  {
    id: "3-basketball",
    name: "농구",
    type: "남",
    grade: 3,
    round: "예선",
    time: "10:30",
    location: "체육관",
    participants: ["3-1", "3-2", "3-3", "3-4"],
    status: "upcoming",
  },
  {
    id: "3-kickball",
    name: "발야구",
    type: "여",
    grade: 3,
    round: "예선",
    time: "11:30",
    location: "운동장",
    participants: ["3-1", "3-2", "3-3", "3-4"],
    status: "upcoming",
  },
  {
    id: "3-dodgeball",
    name: "피구",
    type: "여",
    grade: 3,
    round: "예선",
    time: "13:00",
    location: "체육관",
    participants: ["3-1", "3-2", "3-3", "3-4"],
    status: "upcoming",
  },
  {
    id: "3-badminton",
    name: "배드민턴",
    type: "혼성",
    grade: 3,
    round: "예선",
    time: "14:00",
    location: "체육관",
    participants: ["3-1", "3-2", "3-3", "3-4"],
    status: "upcoming",
  },
  {
    id: "3-tugofwar",
    name: "줄다리기",
    type: "혼성",
    grade: 3,
    round: "예선",
    time: "15:00",
    location: "운동장",
    participants: ["3-1", "3-2", "3-3", "3-4"],
    status: "upcoming",
  },
  {
    id: "3-wrestling",
    name: "씨름",
    type: "남",
    grade: 3,
    round: "예선",
    time: "15:30",
    location: "체육관",
    participants: ["3-1", "3-2", "3-3", "3-4"],
    status: "upcoming",
  },
  {
    id: "3-relay",
    name: "이어달리기",
    type: "혼성",
    grade: 3,
    round: "예선",
    time: "16:30",
    location: "운동장",
    participants: ["3-1", "3-2", "3-3", "3-4"],
    status: "upcoming",
  },
  // 결승 종목 (각 학년 예선 1위 자동 배정)
  {
    id: "final-soccer",
    name: "축구",
    type: "남",
    round: "결승",
    time: "17:00",
    location: "운동장",
    participants: [],
    status: "upcoming",
  },
  {
    id: "final-basketball",
    name: "농구",
    type: "남",
    round: "결승",
    time: "17:00",
    location: "체육관",
    participants: [],
    status: "upcoming",
  },
  {
    id: "final-kickball",
    name: "발야구",
    type: "여",
    round: "결승",
    time: "17:30",
    location: "운동장",
    participants: [],
    status: "upcoming",
  },
  {
    id: "final-dodgeball",
    name: "피구",
    type: "여",
    round: "결승",
    time: "17:30",
    location: "체육관",
    participants: [],
    status: "upcoming",
  },
  {
    id: "final-badminton",
    name: "배드민턴",
    type: "혼성",
    round: "결승",
    time: "18:00",
    location: "체육관",
    participants: [],
    status: "upcoming",
  },
  {
    id: "final-tugofwar",
    name: "줄다리기",
    type: "혼성",
    round: "결승",
    time: "18:00",
    location: "운동장",
    participants: [],
    status: "upcoming",
  },
  {
    id: "final-wrestling",
    name: "씨름",
    type: "남",
    round: "결승",
    time: "18:30",
    location: "체육관",
    participants: [],
    status: "upcoming",
  },
  {
    id: "final-relay",
    name: "이어달리기",
    type: "혼성",
    round: "결승",
    time: "18:30",
    location: "운동장",
    participants: [],
    status: "upcoming",
  },
];

// 점수 계산 함수
export function calculatePoints(eventName: string, rank: number): number {
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

// 팀별 총점 계산
export function calculateTeamScores(eventsData: Event[], grade: number): { teamId: string; totalPoints: number; relayPoints: number; tugofwarPoints: number; badmintonPoints: number }[] {
  const gradePrefix = `${grade}-`;
  const teamIds = [`${grade}-1`, `${grade}-2`, `${grade}-3`, `${grade}-4`];

  const scores = teamIds.map(teamId => {
    let totalPoints = 0;
    let relayPoints = 0;
    let tugofwarPoints = 0;
    let badmintonPoints = 0;

    eventsData
      .filter(e => e.grade === grade && e.results)
      .forEach(event => {
        const teamResult = event.results?.find(r => r.teamId === teamId);
        if (teamResult) {
          const points = calculatePoints(event.name, teamResult.rank);
          totalPoints += points;

          if (event.name === "이어달리기") relayPoints = points;
          if (event.name === "줄다리기") tugofwarPoints = points;
          if (event.name === "배드민턴") badmintonPoints = points;
        }
      });

    return { teamId, totalPoints, relayPoints, tugofwarPoints, badmintonPoints };
  });

  // 정렬: 총점 > 이어달리기 > 줄다리기 > 배드민턴
  return scores.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.relayPoints !== a.relayPoints) return b.relayPoints - a.relayPoints;
    if (b.tugofwarPoints !== a.tugofwarPoints) return b.tugofwarPoints - a.tugofwarPoints;
    return b.badmintonPoints - a.badmintonPoints;
  });
}

// 종목 타입 색상
export function getEventTypeColor(type: "남" | "여" | "혼성"): string {
  switch (type) {
    case "남": return "bg-blue-100 text-blue-700";
    case "여": return "bg-pink-100 text-pink-700";
    case "혼성": return "bg-green-100 text-green-700";
  }
}

// 상태 색상
export function getStatusColor(status: "upcoming" | "ongoing" | "completed"): string {
  switch (status) {
    case "upcoming": return "bg-gray-100 text-gray-600";
    case "ongoing": return "bg-yellow-100 text-yellow-700";
    case "completed": return "bg-green-100 text-green-700";
  }
}

export function getStatusText(status: "upcoming" | "ongoing" | "completed"): string {
  switch (status) {
    case "upcoming": return "예정";
    case "ongoing": return "진행중";
    case "completed": return "완료";
  }
}
