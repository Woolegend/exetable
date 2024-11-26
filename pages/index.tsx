import styles from "@/styles/Home.module.css";
import Column from "@/components/Column";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const DAY_LIST: Day[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export interface Exercise {
  id: string;
  name: string;
  weight: number;
  repeat: number;
  set: number;
}

const DEFAULT_EXERCISE = {
  name: "",
  weight: 0,
  repeat: 0,
  set: 0,
};

function getDefaultExercise(): Exercise {
  return { ...DEFAULT_EXERCISE, id: Date.now().toString() };
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

export default function Home() {
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [tab, setTab] = useState<Day>("mon");
  const router = useRouter();
  const { a } = router.query;

  const handleClickTab = (event: MouseEvent<HTMLUListElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    const li = event.target.closest("li");
    if (li?.dataset.day) setTab(li.dataset.day as Day);
  };

  const handleChangeSchedule = (exercise: Exercise) => {
    setSchedule((prev) => {
      const copy = { ...prev, [tab]: [...prev[tab], exercise] };
      const save = btoa(JSON.stringify(copy));
      window.history.pushState({}, "", "?a=" + save);
      return copy;
    });
  };

  useEffect(() => {
    if (!a) return;
    const save = JSON.parse(atob(a as string));
    setSchedule(save);
  }, [a]);

  return (
    <div className={styles.container}>
      <div>메인 페이지</div>
      <div>{tab}</div>
      <ul className={styles.tabList} onClick={handleClickTab}>
        {DAY_LIST.map((day) => {
          const classNames =
            day === tab ? `${styles.item} ${styles.focus}` : styles.item;
          return (
            <li key={day} className={classNames} data-day={day}>
              {day}
            </li>
          );
        })}
      </ul>
      <div className={styles.table}>
        <Column exercises={schedule[tab]} />
      </div>
      <AddExerciseForm onSubmit={handleChangeSchedule} />
    </div>
  );
}

function AddExerciseForm({
  onSubmit,
}: {
  onSubmit: (exercise: Exercise) => void;
}) {
  const [exercise, setExercise] = useState<Exercise>(getDefaultExercise);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const value = event.target.value;
    const _value = typeof value === "string" ? value.trim() : value;
    setExercise((prev) => ({ ...prev, [name]: _value }));
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(exercise);
    setExercise(getDefaultExercise);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        name="name"
        type="text"
        onChange={handleChangeInput}
        placeholder="운동 이름"
        value={exercise.name}
        required
      />
      <input
        name="weight"
        type="text"
        onChange={handleChangeInput}
        placeholder="무게 *kg"
        value={exercise.weight}
      />
      <input
        name="repeat"
        type="text"
        onChange={handleChangeInput}
        placeholder="반복 횟수"
        value={exercise.repeat}
      />
      <input
        name="set"
        type="text"
        onChange={handleChangeInput}
        placeholder="세트 수"
        value={exercise.set}
      />
      <button type="submit">추가</button>
    </form>
  );
}
