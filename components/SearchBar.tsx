import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { EXERCISE_DATAS, ExerciseData } from "@/mock/mock_exercise";
import styles from "./SearchBar.module.css";
import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import { Exercise } from "@/types/exercise.type";

function checkExerciseIdValid(id: number | null): boolean {
  if (id === null) return false;
  if (!EXERCISE_DATAS[id]) return false;
  return true;
}

export default function SearchBar({
  onChange,
}: {
  onChange: (exercise: Exercise) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<ExerciseData[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const { get: isFocus, set: setIsFocus } = useOutsideClick(formRef);

  const handleSelectExercise = (exerciseId: number) => {
    if (!checkExerciseIdValid(exerciseId)) {
      alert("잘못된 입력입니다.");
      return;
    }
    const exercise: Exercise = {
      id: Date.now().toString(),
      exerciseId: exerciseId,
      groups: [],
    };
    onChange(exercise);
    setSearchTerm("");
    setIsFocus(false);
  };

  const handleClickSuggestion = (event: MouseEvent<HTMLUListElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    const li = event.target.closest("li");
    if (!li?.dataset) return;
    handleSelectExercise(Number(li.dataset.id));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (suggestions.length > 0) {
      handleSelectExercise(Number(suggestions[0].id));
    }
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsFocus(true);
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions: ExerciseData[] = EXERCISE_DATAS.filter(
        (exercise) =>
          exercise.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.ko.includes(searchTerm)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
      <fieldset className={styles.fieldset}>
        <label htmlFor="input" className={styles.label}>
          <Image fill src="/images/ic_search.svg" alt="검색" />
        </label>
        <input
          className={styles.input}
          id="input"
          type="text"
          value={searchTerm}
          onChange={handleChangeInput}
          placeholder="운동을 추가하세요"
        />
      </fieldset>
      {suggestions.length > 0 && isFocus && (
        <div className={styles.suggestionWrap}>
          <ul className={styles.suggestionList} onClick={handleClickSuggestion}>
            {suggestions.map((exercise) => (
              <li
                key={exercise.id}
                className={styles.suggestion}
                data-id={exercise.id}
              >
                <span className={styles.ko}>{exercise.ko} </span>
                <span className={styles.en}>{exercise.en}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
