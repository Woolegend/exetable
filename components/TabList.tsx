import { Day } from "@/types/exercise.type";
import { MouseEvent } from "react";
import styles from "./TabList.module.css";

const DAY_LIST: Day[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function TabList({
  tab,
  setTab,
}: {
  tab: Day;
  setTab: (day: Day) => void;
}) {
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
