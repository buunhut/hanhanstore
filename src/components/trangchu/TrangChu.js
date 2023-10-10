import React from 'react'
import './trangchu.scss'
import Header from '../dungchung/Header.js'
import Footer from '../dungchung/Footer.js'
import { Outlet } from 'react-router-dom'

const TrangChu = () => {
    return (
        <div id='trangChu'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default TrangChu