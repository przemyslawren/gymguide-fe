import React from 'react'
import {SimpleExerciseType} from "../../types/types.ts";

interface SimpleExerciseProps {
    exercises: SimpleExerciseType[];
}

const Exercise: React.FC<SimpleExerciseProps> = ({exercises}) => {
    return (
        <div className="exercises-container">
            {exercises.map((exercise) => (
                <div key={exercise.id} className="exercise-item">
                    <h2>{exercise.name}</h2>
                    <p>{exercise.primaryMuscles}</p>
                    <img src={exercise.imagesURL[0]} alt={`${exercise.name} Image`} style={{height: 283, width: 425}}/>
                </div>
            ))}
        </div>
    )
}
export default Exercise
