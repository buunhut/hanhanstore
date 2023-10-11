import React, { useState } from 'react'
import './taikhoan.scss'
import { NavLink } from 'react-router-dom'

const TaiKhoan = () => {
    const [dangKy, setDangKy] = useState(false)
    const handleShowDangKy = () => {

        setDangKy(!dangKy)
    }

    return (
        <div id='taiKhoan'>
            <header>
                <div className="container">
                    <div className="content">
                        <NavLink to="/">
                            <i className="fa-solid fa-angle-left"></i>
                        </NavLink>

                        <p>Tài khoản</p>

                    </div>
                </div>

            </header>
            <div className="container">
                <div className="content">
                    {
                        dangKy ? (
                            <>
                                <h3>Đăng ký tài khoản</h3>
                                <div className="myForm">
                                    <form action="">
                                        <div className="inputItem">
                                            <input type="text" placeholder='Tên người dùng' />
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                        <div className="inputItem">
                                            <input type="text" placeholder='Số điện thoại' />
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        <div className="inputItem">
                                            <input type="text" placeholder='Địa chỉ' />
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div className="myBtn">
                                            <button type='button'> Đăng ký</button>
                                        </div>
                                        <p onClick={handleShowDangKy}>
                                            Quay về trang đăng nhập
                                        </p>

                                    </form>

                                </div>

                            </>
                        ) : (
                            <>
                                <h3>Đăng nhập</h3>
                                <div className="myForm">
                                    <div className="inputItem">
                                        <input type="text" placeholder='Số điện thoại' />
                                        <i className="fa-solid fa-phone"></i>


                                    </div>
                                    <div className="myBtn">
                                        <button type='button'> Đăng nhập</button>
                                    </div>
                                    <p onClick={handleShowDangKy}>
                                        Chưa có tài khoản, đăng ký ngay
                                    </p>

                                </div>
                            </>
                        )

                    }


                </div>
            </div>
        </div>
    )
}

export default TaiKhoan