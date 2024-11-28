interface ExerciseData {
  id: string | number;
  en: string;
  ko: string;
}

const EXERCISE_DATAS: ExerciseData[] = [
  { id: 0, en: "Squat", ko: "스쿼트" },
  { id: 1, en: "Leg Press", ko: "레그 프레스" },
  { id: 2, en: "Leg Curl", ko: "레그 컬" },
  { id: 3, en: "Leg Extension", ko: "레그 익스텐션" },
  { id: 4, en: "Lunge", ko: "런지" },
  { id: 5, en: "Hip Thrust", ko: "힙 쓰러스트" },
  { id: 6, en: "Deadlift", ko: "데드리프트" },
  { id: 7, en: "Front Squat", ko: "프론트 스쿼트" },
  { id: 8, en: "Back Squat", ko: "백 스쿼트" },
  { id: 9, en: "Smith Machine Squat", ko: "스미스 머신 스쿼트" },
  { id: 10, en: "Step Up", ko: "스텝 업" },
  { id: 11, en: "Burpee", ko: "버피" },
  { id: 12, en: "Bulgarian Split Squat", ko: "불가리안 스플릿 스쿼트" },
  { id: 13, en: "Walking Lunge", ko: "워킹 런지" },
  { id: 14, en: "Jump Squat", ko: "점프 스쿼트" },
  { id: 15, en: "Smith Machine Lunge", ko: "스미스 머신 런지" },
  { id: 16, en: "Lunge Knee Up", ko: "런지 니 업" },
  { id: 17, en: "Free Squat", ko: "프리 스쿼트" },
  { id: 18, en: "Seated Leg Curl", ko: "시티드 레그컬" },
  { id: 19, en: "Wide Squat", ko: "와이드 스쿼트" },
  { id: 20, en: "Dumbbell Lunge", ko: "덤벨 런지" },
];

export { EXERCISE_DATAS };
export type { ExerciseData };
