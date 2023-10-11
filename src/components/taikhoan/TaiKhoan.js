import React, { useState } from "react";
import "./taikhoan.scss";
import { NavLink } from "react-router-dom";
import Footer from "../dungchung/Footer.js";

const TaiKhoan = () => {
    const [dangKy, setDangKy] = useState(false);
    const [user, setUser] = useState({
        tenNguoiDung: "",
        soDt: "",
        diaChi: "",
    });
    const [alert, setAlert] = useState({
        tenNguoiDung: "",
        soDt: "",
        diaChi: "",
    });
    const handleShowDangKy = () => {
        setDangKy(!dangKy);
    };

    const handleChangeInput = (event) => {
        const { id, value } = event.target;
        // Validate the input as it's being changed
        if (id === 'tenNguoiDung') {
            // Check for special characters
            const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
            if (specialChars.test(value)) {
                setAlert((prevState) => ({
                    ...prevState,
                    tenNguoiDung: 'Không được chứa ký tự đặc biệt'
                }));
            } else {
                setAlert((prevState) => ({
                    ...prevState,
                    tenNguoiDung: ''
                }));
            }
        } else if (id === 'soDt') {
            // Check for non-digit characters
            const phonePattern = /^\d+$/;
            if (!phonePattern.test(value)) {
                setAlert((prevState) => ({
                    ...prevState,
                    soDt: 'Số điện thoại chỉ được nhập số'
                }));
            } else {
                if (value.length < 10) {
                    setAlert((prevState) => ({
                        ...prevState,
                        soDt: 'Số điện thoại chưa hợp lệ'
                    }));

                } else {
                    setAlert((prevState) => ({
                        ...prevState,
                        soDt: ''
                    }));
                }
            }
        } else if (id === 'diaChi') {
            if (value === '') {
                setAlert((prevState) => ({
                    ...prevState,
                    diaChi: 'Vui lòng nhập đầy đủ'
                }));

            } else {
                setAlert((prevState) => ({
                    ...prevState,
                    diaChi: ''
                }));

            }
        }

        setUser((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleDangKy = () => {
        let isValid = true;

        // Check if any of the fields are empty
        for (const key in user) {
            if (!user[key]) {
                setAlert((prevState) => ({
                    ...prevState,
                    [key]: "Vui lòng nhập đầy đủ",
                }));
                isValid = false;
            }
        }

        // If any field is empty, prevent further validation
        if (!isValid) {
            return;
        }

        // Perform additional validation (e.g., special characters in tenNguoiDung and digits in soDt)
        const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialChars.test(user.tenNguoiDung)) {
            setAlert((prevState) => ({
                ...prevState,
                tenNguoiDung: "Tên người dùng không được chứa ký tự đặc biệt",
            }));
            isValid = false;
        }

        const phonePattern = /^\d+$/;
        if (!phonePattern.test(user.soDt)) {
            setAlert((prevState) => ({
                ...prevState,
                soDt: "Số điện thoại chỉ được nhập số",
            }));
            isValid = false;
        }

        if (isValid) {
            // All validation passed; you can now proceed with registration
            console.log("first")
        }
    };

    return (
        <div id="taiKhoan">
            <div id="header">
                <div className="container">
                    <div className="content">
                        <NavLink to="/">
                            <i className="fa-solid fa-angle-left"></i>
                        </NavLink>
                        <p>Tài khoản</p>
                    </div>
                </div>
            </div>
            <div id="main">
                <div className="container">
                    <div className="content">
                        {dangKy ? (
                            <>
                                <h3>Đăng ký tài khoản</h3>
                                <div className="myForm">
                                    <form action="">
                                        <div className="inputItem">
                                            <input
                                                id="tenNguoiDung"
                                                name="tenNguoiDung"
                                                value={user.tenNguoiDung}
                                                onChange={handleChangeInput}
                                                type="text"
                                                placeholder="Tên người dùng"
                                            />
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                        {
                                            alert.tenNguoiDung !== "" ? (<p className="alert">{alert.tenNguoiDung}</p>) : null
                                        }
                                        <div className="inputItem">
                                            <input
                                                id="soDt"
                                                name="soDt"
                                                value={user.soDt}
                                                onChange={handleChangeInput}
                                                type="text"
                                                placeholder="Số điện thoại"
                                            />
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        {
                                            alert.soDt !== "" ? (<p className="alert">{alert.soDt}</p>) : null
                                        }

                                        <div className="inputItem">
                                            <input
                                                id="diaChi"
                                                name="diaChi"
                                                value={user.diaChi}
                                                onChange={handleChangeInput}
                                                type="text"
                                                placeholder="Địa chỉ"
                                            />
                                            <i className="fa-solid fa-location-dot"></i>
                                        </div>
                                        {
                                            alert.diaChi !== "" ? (<p className="alert">{alert.diaChi}</p>) : null
                                        }

                                        <div className="myBtn">
                                            <button type="button" onClick={handleDangKy}>
                                                {" "}
                                                Đăng ký
                                            </button>
                                        </div>
                                        <p onClick={handleShowDangKy}>Quay về trang đăng nhập</p>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>Đăng nhập</h3>
                                <div className="myForm">
                                    <div className="inputItem">
                                        <input type="text" placeholder="Số điện thoại" />
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <div className="myBtn">
                                        <button type="button"> Đăng nhập</button>
                                    </div>
                                    <p onClick={handleShowDangKy}>
                                        Chưa có tài khoản, đăng ký ngay
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TaiKhoan;
