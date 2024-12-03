import { Exercise } from "@/types/exercise.type";
import styles from "./Column.module.css";
import Image from "next/image";
import { useState } from "react";
import { EXERCISE_DATAS } from "@/mock/mock_exercise";

export default function Column({
  exercises,
  onDelete,
}: {
  exercises: Exercise[];
  onDelete: (exerciseId: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string | null) => {
    setSelected(id);
  };

  if (exercises.length < 1) {
    return (
      <div className={styles.placeholder}>
        <span className={styles.placeholderText}>등록된 운동이 없습니다.</span>
      </div>
    );
  }

  return (
    <div className={styles.table}>
      {exercises.map((exercise) => (
        <ExerciseItem
          key={exercise.id}
          exercise={exercise}
          isSelected={exercise.id === selected}
          onClick={handleSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function ExerciseItem({
  exercise,
  isSelected,
  onClick,
  onDelete,
}: {
  exercise: Exercise;
  isSelected: boolean;
  onClick: (id: string | null) => void;
  onDelete: (exerciseId: string) => void;
}) {
  const { exerciseId } = exercise;
  const exerciseData = EXERCISE_DATAS[exerciseId as number];

  const handleClickFeature = () => {
    onClick(exercise.id);
  };

  const handleClickDelete = () => {
    const flag = confirm(
      `${exerciseData.ko}(${exerciseData.en})을 제거할까요?`
    );
    if (flag) onDelete(exercise.id);
    onClick(null);
  };

  const handleClickClose = () => {
    onClick(null);
  };

  return (
    <div className={styles.ExerciseItem}>
      <div className={styles.wrap}>
        <p className={styles.exercise}>
          <span className={styles.ko}>{exerciseData.ko} </span>
          <span className={styles.en}>{exerciseData.en}</span>
        </p>
        {isSelected ? (
          <div className={styles.feature}>
            <div className={styles.option}>수정</div>
            <div className={styles.option} onClick={handleClickDelete}>
              삭제
            </div>
            <div className={styles.option} onClick={handleClickClose}>
              닫기
            </div>
          </div>
        ) : (
          <Image
            className={styles.feature}
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
        <span>{0}kg</span>
        <span>{0}회</span>
        <span>{0}세트</span>
      </div>
    </div>
  );
}
