import { Exercise, Group } from "@/types/exercise.type";
import styles from "./Column.module.css";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { EXERCISE_DATAS } from "@/mock/mock_exercise";

export default function Column({
  exercises,
  onChange,
  onDelete,
}: {
  exercises: Exercise[];
  onChange: (id: string, group: Group) => void;
  onDelete: (id: string) => void;
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
          onChange={onChange}
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
  onChange,
  onDelete,
}: {
  exercise: Exercise;
  isSelected: boolean;
  onClick: (id: string | null) => void;
  onChange: (exerciseId: string, group: Group) => void;
  onDelete: (exerciseId: string) => void;
}) {
  const [group, setGroup] = useState({});
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setGroup((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const copy = { ...group, id: Date.now().toString() };
    onChange(exercise.id, copy as Group);
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
      {exercise.groups.map((e) => (
        <div key={e.id} className={styles.group}>
          <span>{e.weight}kg</span>
          <span>{e.repeat}회</span>
          <span>{e.set}세트</span>
        </div>
      ))}
      <form className={styles.groupForm} onSubmit={handleSubmit}>
        <fieldset className={styles.groupField}>
          <input
            className={styles.groupInput}
            name="weight"
            type="number"
            placeholder="무게 kg"
            onChange={handleChange}
            required
          />
          <input
            className={styles.groupInput}
            name="repeat"
            type="number"
            placeholder="반복 횟수"
            onChange={handleChange}
            required
          />
          <input
            className={styles.groupInput}
            name="set"
            type="number"
            placeholder="세트 수"
            onChange={handleChange}
            required
          />
        </fieldset>
        <button className={styles.groupSubmit} type="submit">
          추가
        </button>
      </form>
    </div>
  );
}
