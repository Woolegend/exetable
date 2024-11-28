import styles from "@/styles/Home.module.css";
import Column from "@/components/Column";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Day, Exercise, Schedule } from "@/types/exercise.type";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

const DAY_LIST: Day[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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
          <div className={styles.Table}>
            <Column exercises={schedule[tab]} />
          </div>
        </div>
      </div>
    </>
  );
}

function TabList({ tab, setTab }: { tab: Day; setTab: (day: Day) => void }) {
  const handleClickTab = (event: MouseEvent<HTMLUListElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    const li = event.target.closest("li");
    if (li?.dataset.day) setTab(li.dataset.day as Day);
  };

  return (
    <ul className={styles.TabList} onClick={handleClickTab}>
      {DAY_LIST.map((day) => {
        const classNames =
          day === tab ? `${styles.Tab} ${styles.focus}` : styles.Tab;
        return (
          <li key={day} className={classNames} data-day={day}>
            <span>{day.toUpperCase()}</span>
          </li>
        );
      })}
    </ul>
  );
}

function UtilList() {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleCopyUrl = async () => {
    const urlToCopy = window.location.href;
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 3000);
    } catch (err) {
      console.error("복사할 수 없습니다 : ", err);
    }
  };
  return (
    <>
      <div className={styles.UtilList}>
        <button className={styles.copy} onClick={handleCopyUrl}>
          <Image fill src="/images/ic_copy.svg" alt="공유" />
        </button>
      </div>
      {isToastVisible && (
        <span className={`${styles.toast} caption-medium`}>
          루틴이 복사되었습니다.
        </span>
      )}
    </>
  );
}
