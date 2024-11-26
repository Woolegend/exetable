import { Exercise } from "@/pages";

export default function Column({ exercises }: { exercises: Exercise[] }) {
  return (
    <div>
      <div>
        {exercises.map((exercise) => (
          <div key={exercise.id}>
            <div>{exercise.name}</div>
            <div>{exercise.weight}</div>
            <div>{exercise.repeat}</div>
            <div>{exercise.set}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
