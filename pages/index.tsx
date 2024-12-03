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
    <>
      <div className={styles.container}>
        <TabList tab={tab} setTab={setTab} />
        <div className={styles.wrap}>
          <SearchBar onChange={handleChangeSchedule} />
          <UtilList />
          <Column exercises={schedule[tab]} />
        </div>
      </div>
    </>
  );
}
