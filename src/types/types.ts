export interface ExerciseType {
    id: string;
    name: string;
    force: string;
    level: string;
    mechanic: string;
    equipment: string;
    primaryMuscles: Set<string>;
    secondaryMuscles: Set<string>;
    instructions: string[];
    category: string;
    images: string[];
}

export interface SimpleExerciseType {
    id: string;
    name: string;
    primaryMuscles: Set<string>;
    imagesURL: string[];
}
