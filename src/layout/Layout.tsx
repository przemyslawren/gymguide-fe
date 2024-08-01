import React from 'react'
import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
import Exercises from "../components/exercises/Exercises.tsx";

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            {children}
            <Exercises/>
            <Footer/>
        </>
    )
}
export default Layout
