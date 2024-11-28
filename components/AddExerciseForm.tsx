import { Exercise } from "@/types/exercise.type";
import { ChangeEvent, MouseEvent, useState } from "react";
import SearchBar from "./SearchBar";

const DEFAULT_EXERCISE = {
  exerciseId: null,
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

  const handleChangeExerciseById = (id: number | null) => {
    setExercise((prev) => ({ ...prev, exerciseId: id }));
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name: string = event.target.name;
    const value = event.target.value;
    setExercise((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickSubmitButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event);
    onSubmit(exercise);
    setExercise(getDefaultExercise);
  };

  return (
    <div>
      <SearchBar onChange={handleChangeExerciseById} />
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
      <button onClick={handleClickSubmitButton}>추가</button>
    </div>
  );
}
