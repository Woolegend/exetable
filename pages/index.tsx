import styles from "@/styles/Home.module.css";
import Column from "@/components/Column";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Day, Exercise, Schedule } from "@/types/exercise.type";
import SearchBar from "@/components/SearchBar";
import TabList from "@/components/TabList";
import UtilList from "@/components/UtilList";

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

  const handleChangeSchedule = (exercise: Exercise) => {
    setSchedule((prev) => {
      const copy = { ...prev, [tab]: [...prev[tab], exercise] };
      applyScheduleToUrl(copy);
      return copy;
    });
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setSchedule((prev) => {
      const next = prev[tab].filter((e) => e.id !== exerciseId);
      const copy = {
        ...prev,
        [tab]: next,
      };
      applyScheduleToUrl(copy);
      return copy;
    });
  };

  const applyScheduleToUrl = (data: Schedule) => {
    const save = btoa(JSON.stringify(data));
    window.history.pushState({}, "", "?a=" + save);
  };

  useEffect(() => {
    if (!a) return;
    const save = JSON.parse(atob(a as string));
    setSchedule(save);
  }, [a]);

  return (
    <>
      <div className={styles.container}>
        <TabList tab={tab} setTab={setTab} />
        <div className={styles.wrap}>
          <SearchBar onChange={handleChangeSchedule} />
          <UtilList />
          <Column exercises={schedule[tab]} onDelete={handleDeleteExercise} />
        </div>
      </div>
    </>
  );
}
