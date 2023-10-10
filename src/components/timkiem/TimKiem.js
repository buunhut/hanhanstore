import React, { useState } from 'react'
import './timkiem.scss'
import { useDispatch, useSelector } from 'react-redux'
import { nhapNoiDung } from '../../redux/timKiemSlice'

const TimKiem = () => {
    const dispath = useDispatch()
    let { goiY, ketQua } = useSelector((state) => state.timKiem)

    const handleKeyword = (event) => {
        const keyword = event.target.innerText;
        dispath(nhapNoiDung(keyword))

        // console.log(keyword)
    }


    return (
        <div id="timKiem">
            <div className="container">
                <div className="content">
                    {
                        goiY ? (
                            <div className="goiY">
                                <span onClick={handleKeyword}>bia</span>
                                <span onClick={handleKeyword}>sữa tươi</span>
                                <span onClick={handleKeyword}>mi</span>
                                <span onClick={handleKeyword}>nước mắm</span>
                                <span onClick={handleKeyword}>đường cát</span>
                                <span onClick={handleKeyword}>bột ngọt</span>
                                <span onClick={handleKeyword}>nước tương</span>
                            </div>
                        ) : null
                    }

                    {
                        ketQua.length > 0 ? (<div className='ketQua'>
                            <p>Kết quả tìm kiếm: </p>


                        </div>) : null
                    }

                </div>
            </div>
        </div>
    )
}

export default TimKiem