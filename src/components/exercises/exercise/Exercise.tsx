import React, {useState} from 'react'
import {SimpleExerciseType} from "../../../types/types.ts";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import {
    ArrowBackIosNewRounded,
    ArrowForwardIosRounded
} from "@mui/icons-material";

interface SimpleExerciseProps {
    exercise: SimpleExerciseType;
}

const Exercise: React.FC<SimpleExerciseProps> = ({exercise}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? exercise.imagesURL.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === exercise.imagesURL.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Box sx={{width: '100%', height: '100%', position: 'relative', borderRadius: '8px'}}>
            <Box
                component="img"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                }}
                src={exercise.imagesURL[currentImageIndex]}
                alt={`${exercise.name} Image`}
            />
            <IconButton
                onClick={handlePrevImage}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    color: 'white',

                }}
            >
                <ArrowBackIosNewRounded/>
            </IconButton>
            <IconButton
                onClick={handleNextImage}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    color: 'white',
                }}
            >
                <ArrowForwardIosRounded/>
            </IconButton>
            <Typography variant="h6">{exercise.name}</Typography>
        </Box>
    )
}
export default Exercise
