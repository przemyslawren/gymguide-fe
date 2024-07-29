import React, {useEffect, useState} from 'react'
import {Pagination, PaginationItem} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import api from "../config/axios/config.ts";
import {SimpleExerciseType} from "../types/types.ts";
import Exercise from "./exercise/Exercise.tsx";

const ExerciseDatabase: React.FC = () => {

    const [exercises, setExercises] = useState<SimpleExerciseType[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        api.get(`/exercises?page=${currentPage}`)
            .then((response) => {
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

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading exercises</div>

    return (
        <>
            {/*<TextField id="outlined-basic" label="Outlined" variant="outlined"/>*/}
            <Exercise exercises={exercises}/>
            <Pagination
                count={totalPages}
                size="small"
                onChange={handlePageChange}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                        {...item}
                    />
                )}
            />
        </>
    )
}
export default ExerciseDatabase
