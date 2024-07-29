import React from 'react'
import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
import ExerciseDatabase from "../exercisesDatabase/ExerciseDatabase.tsx";

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            {children}
            <ExerciseDatabase/>
            <Footer/>
        </>
    )
}
export default Layout
