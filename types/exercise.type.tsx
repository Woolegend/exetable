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

const DEFAULT_SCHEDULE: Schedule = {
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
};

export { DEFAULT_SCHEDULE };
export type { Day, Exercise, Schedule };
