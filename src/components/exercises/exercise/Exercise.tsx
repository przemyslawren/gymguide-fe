import React from 'react'
import {SimpleExerciseType} from "../../../types/types.ts";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SimpleExerciseProps {
    exercise: SimpleExerciseType;
}

const Exercise: React.FC<SimpleExerciseProps> = ({exercise}) => {
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            borderRadius: '8px',
        }}>
            <Box
                component="img"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                }}
                src={exercise.imagesURL[0]} alt={`${exercise.name} Image`}/>

            <Typography variant="h5">{exercise.name}</Typography>
        </Box>
    )
}
export default Exercise
