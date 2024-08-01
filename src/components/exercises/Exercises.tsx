import React, {useEffect, useState} from 'react'
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import api from "../../config/axios/config.ts";
import {SimpleExerciseType} from "../../types/types.ts";
import Exercise from "./exercise/Exercise.tsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"
import SearchOutlined from "@mui/icons-material/SearchOutlined"
import IconButton from "@mui/material/IconButton"


const Exercises: React.FC = () => {

    const [exercises, setExercises] = useState<SimpleExerciseType[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        api.get(`/exercises?page=${currentPage}`)
            .then((response): void => {
                const {data, total, totalPages} = response.data;
                setExercises(data);
                setTotal(total);
                setTotalPages(totalPages);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                alert(error);
            });
    }, [currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number): void => {
        setCurrentPage(page);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading exercises</div>

    return (
        <>
            <Typography variant="h3">Exercises Database</Typography>


            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    gap: '1rem',

                }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your exercise..."
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchOutlined/>
                            </IconButton>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'primary.main',
                            },
                            '&:hover fieldset': {
                                borderColor: 'primary.dark',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.light',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiIconButton-root': {
                            color: 'white',
                        },
                    }}
                />
                {exercises && exercises.map((exercise) => (

                    <Exercise key={exercise.id} exercise={exercise}/>
                ))}
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem',
                }}>
                <Pagination
                    color="primary"
                    size="large"
                    count={totalPages}
                    variant="outlined"
                    shape="rounded"
                    page={currentPage}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                            {...item}
                            sx={{
                                color: 'white',
                                '& .MuiPaginationItem-ellipsis': {
                                    color: 'white'
                                },
                                '&. Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                },
                            }}
                        />
                    )}
                />
            </Container>
        </>
    )
}
export default Exercises
