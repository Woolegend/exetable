import { Exercise } from "@/types/exercise.type";
import { ChangeEvent, FormEvent, useState } from "react";

const DEFAULT_EXERCISE = {
  name: "",
  weight: 0,
  repeat: 0,
  set: 0,
};

function getDefaultExercise(): Exercise {
  return { ...DEFAULT_EXERCISE, id: Date.now().toString() };
}

export default function AddExerciseForm({
  onSubmit,
}: {
  onSubmit: (exercise: Exercise) => void;
}) {
  const [exercise, setExercise] = useState<Exercise>(getDefaultExercise);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const value = event.target.value;
    setExercise((prev) => ({ ...prev, [name]: value }));
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
        type="number"
        onChange={handleChangeInput}
        placeholder="무게 *kg"
        value={exercise.weight}
      />
      <input
        name="repeat"
        type="number"
        onChange={handleChangeInput}
        placeholder="반복 횟수"
        value={exercise.repeat}
      />
      <input
        name="set"
        type="number"
        onChange={handleChangeInput}
        placeholder="세트 수"
        value={exercise.set}
      />
      <button type="submit">추가</button>
    </form>
  );
}
