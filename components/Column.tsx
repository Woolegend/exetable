import { Exercise } from "@/types/exercise.type";
import styles from "./Column.module.css";
import Image from "next/image";
import { useState } from "react";
import { EXERCISE_DATAS } from "@/mock/mock_exercise";

export default function Column({ exercises }: { exercises: Exercise[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string | null) => {
    setSelected(id);
  };

  return (
    <div>
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          isSelected={exercise.id === selected}
          onClick={handleSelect}
        />
      ))}
    </div>
  );
}

function ExerciseItem({
  exercise,
  isSelected,
  onClick,
}: {
  exercise: Exercise;
  isSelected: boolean;
  onClick: (id: string | null) => void;
}) {
  const { exerciseId, weight, repeat, set } = exercise;
  const exerciseData = EXERCISE_DATAS[exerciseId as number];

  const handleClickFeature = () => {
    onClick(exercise.id);
  };

  const handleClickClose = () => {
    onClick(null);
  };

  console.log(exercise, exerciseData);

  return (
    <div className={styles.ExerciseItem}>
      <div className={styles.wrap}>
        <p className={styles.exercise}>{exerciseData.ko}</p>
        {isSelected ? (
          <div className={styles.feature}>
            <div className={styles.option}>Edit</div>
            <div className={styles.option}>Delete</div>
            <div className={styles.option} onClick={handleClickClose}>
              close
            </div>
          </div>
        ) : (
          <Image
            width={24}
            height={24}
            src="/images/ic_kebab.svg"
            alt="feature"
            style={{
              transform: "rotateZ(90deg)",
            }}
            onClick={handleClickFeature}
          />
        )}
      </div>
      <div className={styles.group}>
        <span>{weight}kg</span>
        <span>{repeat}회</span>
        <span>{set}세트</span>
      </div>
    </div>
  );
}
