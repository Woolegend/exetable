import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { EXERCISE_DATAS, ExerciseData } from "@/mock/mock_exercise";
import styles from "./SearchBar.module.css";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function SearchBar({
  onChange,
}: {
  onChange: (id: number | null) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<ExerciseData[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const { get: isFocus, set: setIsFocus } = useOutsideClick(divRef);

  const handleSelectExercise = ({ id, ko, en }: ExerciseData) => {
    onChange(Number(id));
    if (ko) setSearchTerm(ko);
    else if (en) setSearchTerm(en);
    setIsFocus(false);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsFocus(true);
  };

  const handleClickSuggestion = (event: React.MouseEvent<HTMLUListElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    const li = event.target.closest("li");
    if (!li?.dataset) return;
    const { id, ko, en } = li.dataset;
    handleSelectExercise(Object({ id, ko, en }));
  };

  const handleKeydownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.code !== "Enter") return;
    if (suggestions.length > 0) {
      handleSelectExercise(suggestions[0]);
    }
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
    <div className={styles.form} ref={divRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChangeInput}
        onKeyDown={handleKeydownEnter}
        placeholder="운동을 검색하세요"
      />
      {suggestions.length > 0 && isFocus && (
        <ul className={styles.suggestionList} onClick={handleClickSuggestion}>
          {suggestions.map((exercise) => (
            <li
              key={exercise.id}
              className={styles.suggestion}
              data-id={exercise.id}
              data-ko={exercise.ko}
              data-en={exercise.en}
            >
              <span className={styles.ko}>{exercise.ko}</span>
              <span className={styles.en}>{exercise.en}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
