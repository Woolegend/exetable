type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

interface Exercise {
  id: string;
  exerciseId: number | null;
  groups: Group[];
}

interface Group {
  weight: number;
  repeat: number;
  set: number;
}

type Schedule = {
  [key in Day]: Exercise[];
};

export type { Day, Exercise, Schedule };
