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
import CircularProgress from "@mui/material/CircularProgress"


const Exercises: React.FC = () => {

    const [exercises, setExercises] = useState<SimpleExerciseType[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setLoading(true);
        const delayRequest = setTimeout(() => {
            api.get(`/exercises?page=${currentPage}&size=30&sort=name&name=${searchValue}`)
                .then((response): void => {
                    const {data, totalPages} = response.data;
                    setExercises(data);
                    setTotalPages(totalPages);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                    alert(error);
                });
        }, 1000)

        return () => clearTimeout(delayRequest);
    }, [currentPage, searchValue]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number): void => {
        setCurrentPage(page - 1);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
    }

    const handleSearchClick = (): void => {
        setSearchValue(searchValue);
    }

    if (error) return <div>Error loading exercises</div>
    return (
        <>
            <Typography variant="h3" mb={3}>Exercises Database</Typography>
            <Container sx={{paddingBottom: '2rem'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search the exercise"
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleSearchClick}>
                                <SearchOutlined/>
                            </IconButton>
                        ),
                    }}
                    sx={{
                        boxShadow: '0px 0px 18px 4px rgba(66, 68, 90, 1)',
                        borderRadius: '4px',
                        borderColor: 'InactiveBorder',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: 'primary.dark',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.dark',
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
            </Container>
            {loading ?
                <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress/>
                </Container> : <Container
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '4rem'
                    }}>
                    {exercises && exercises.map((exercise) => (
                        <Exercise key={exercise.id} exercise={exercise}/>
                    ))}
                </Container>
            }
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5rem',
                }}>
                <Pagination
                    color="primary"
                    size="large"
                    count={totalPages}
                    variant="outlined"
                    shape="rounded"
                    page={currentPage + 1}
                    onChange={handlePageChange}
                    sx={{
                        '& .MuiPaginationItem-ellipsis': {
                            color: 'white'
                        },
                    }}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                            {...item}
                            sx={{
                                color: 'white',
                            }}
                        />
                    )}
                />
            </Container>
        </>
    )
}
export default Exercises
