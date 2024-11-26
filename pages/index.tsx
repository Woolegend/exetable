import styles from "@/styles/Home.module.css";
import Column from "@/components/Column";
import { useEffect, useState } from "react";

export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface Exercise {
  name: string;
  weight: number;
  unit: "lb" | "kg";
  repeat: number;
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

  useEffect(() => {
    setSchedule(DEFAULT_SCHEDULE);
  }, []);

  return (
    <div className={styles.container}>
      <div>메인 페이지</div>
      <div className={styles.table}>
        <Column day="mon" data={schedule.mon} />
        <Column day="tue" data={schedule.tue} />
        <Column day="wed" data={schedule.wed} />
        <Column day="thu" data={schedule.thu} />
        <Column day="fri" data={schedule.fri} />
        <Column day="sat" data={schedule.sat} />
        <Column day="sun" data={schedule.sun} />
      </div>
    </div>
  );
}
