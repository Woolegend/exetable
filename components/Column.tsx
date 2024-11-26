import { Day, Exercise } from "@/pages";
import styles from "./Column.module.css";

export default function Column({ day, data }: { day: Day; data: Exercise[] }) {
  console.log(data);
  return (
    <div className={styles[day]}>
      <h2>{day}</h2>
      <button className={styles.buttonAdd}>+</button>
    </div>
  );
}
