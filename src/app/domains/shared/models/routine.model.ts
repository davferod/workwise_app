

export interface Routine {
  _id: string;
  name: string;
  description: string;
  exercises: ExerciseDTO[]
}

interface ExerciseDTO {
  name: string;
  sets: number;
  repetitions: number;
  restBetweenSets: number;
  loadPercent: number;
}
