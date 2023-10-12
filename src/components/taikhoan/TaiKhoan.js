import React, { useEffect, useState } from "react";
import "./taikhoan.scss";
import { NavLink } from "react-router-dom";
import Footer from "../dungchung/Footer.js";
import { message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/dangNhapSlice";

const TaiKhoan = () => {
    const dispath = useDispatch()


    useEffect(() => {
        dispath(login())
    }, [])


    const { isLogin, user } = useSelector((state) => state.dangNhap)

    const [dangKy, setDangKy] = useState(false);
    const [userDangKy, setUserDangKy] = useState({
        soDt: "",
        tenNguoiDung: "",
        diaChi: "",
    });
    const [alertDangKy, setAlertDangKy] = useState({
        tenNguoiDung: "",
        soDt: "",
        diaChi: "",
    });
    const handleShowDangKy = () => {
        setDangKy(!dangKy);
    };
    const handleChangeInputDangKy = (event) => {
        const { id, value } = event.target;
        // Validate the input as it's being changed
        if (id === 'tenNguoiDung') {
            // Check for special characters
            const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
            if (specialChars.test(value)) {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    tenNguoiDung: 'Không được chứa ký tự đặc biệt'
                }));
            } else {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    tenNguoiDung: ''
                }));
            }
        } else if (id === 'soDt') {
            // Check for non-digit characters
            const phonePattern = /^\d+$/;
            if (!phonePattern.test(value)) {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    soDt: 'Số điện thoại chỉ được nhập số'
                }));
            } else {
                if (value.length < 10) {
                    setAlertDangKy((prevState) => ({
                        ...prevState,
                        soDt: 'Số điện thoại chưa hợp lệ'
                    }));

                } else {
                    setAlertDangKy((prevState) => ({
                        ...prevState,
                        soDt: ''
                    }));
                }
            }
        } else if (id === 'diaChi') {
            if (value === '') {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    diaChi: 'Vui lòng nhập đầy đủ'
                }));

            } else {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    diaChi: ''
                }));

            }
        }

        setUserDangKy((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };
    const handleDangKy = () => {
        let isValid = true;
        // Check if any of the fields are empty
        for (const key in userDangKy) {
            if (!userDangKy[key]) {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    [key]: "Vui lòng nhập thông tin đầy đủ",
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
        if (specialChars.test(userDangKy.tenNguoiDung)) {
            setAlertDangKy((prevState) => ({
                ...prevState,
                tenNguoiDung: "Tên người dùng không được chứa ký tự đặc biệt",
            }));
            isValid = false;
        }

        const phonePattern = /^\d+$/;
        if (!phonePattern.test(userDangKy.soDt)) {
            setAlertDangKy((prevState) => ({
                ...prevState,
                soDt: "Số điện thoại chỉ được nhập số",
            }));
            isValid = false;
        } else if (userDangKy.soDt.length < 10) {
            setAlertDangKy((prevState) => ({
                ...prevState,
                soDt: "Số điện thoại chưa hợp lệ",
            }));
            isValid = false;
        }

        if (isValid) {
            // All validation passed; you can now proceed with registration
            setUserDangKy({
                soDt: "",
                tenNguoiDung: "",
                diaChi: "",
            })
            setSoDtDangNhap(userDangKy.soDt)
            handleShowDangKy()
            message.success('Đăng ký thành công!', 3)

        }
    };


    const [soDtDangNhap, setSoDtDangNhap] = useState('')
    const [alertDangNhap, setAlertDangNhap] = useState('')

    const handleChangeInputDangNhap = (event) => {
        const { id, value } = event.target;
        // Validate the input as it's being changed
        // Check for non-digit characters
        const phonePattern = /^\d+$/;
        if (!phonePattern.test(value)) {
            setAlertDangNhap('Số điện thoại chỉ được nhập số');
        } else {
            if (value.length < 10) {
                setAlertDangNhap('Số điện thoại chưa hợp lệ');
            } else {
                setAlertDangNhap('')
            }
        }
        setSoDtDangNhap(value)


    };


    const handleDangNhap = () => {
        let isValid = true;
        const phonePattern = /^\d+$/;
        if (soDtDangNhap === '') {
            setAlertDangNhap('Vui lòng nhập số điện thoại')
            isValid = false
        } else if (!phonePattern.test(soDtDangNhap)) {
            setAlertDangNhap('Số điện thoại chỉ được nhập số');
            isValid = false;
        } else if (soDtDangNhap.length < 10) {
            setAlertDangNhap('Số điện thoại chưa hợp lệ');
            isValid = false;
        }
        // If any field is empty, prevent further validation
        if (!isValid) {
            return;
        } else {
            // All validation passed; you can now proceed with registration
            if (soDtDangNhap === '0919317710') {
                const user = {
                    soDt: "0919317710",
                    tenNguoiDung: "Trương Bửu Lập",
                    diaChi: "Chợ Cầu Số 2, Hoà Bình, Bạc Liêu",
                    token: 'TIGER'
                }

                localStorage.setItem('user', JSON.stringify(user))

                dispath(login())






                message.success('Đăng nhập thành công!', 3)
            } else {




                message.error('Số đt chưa đăng ký!', 3)
            }
        }

    }


    const handleDangXuat = () => {
        dispath(logout())
    }

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
                        {
                            isLogin ? (
                                //đã đăng nhập
                                <div id="thongTinNguoiDung">
                                    <h3>Thông tin người dùng</h3>
                                    <div className="main">
                                        <p className="tenNguoiDung">{user.tenNguoiDung}</p>
                                        <p className="soDt">{user.soDt}</p>
                                        <p className="diaChi">{user.diaChi}</p>
                                    </div>
                                    <div className="myBtn">
                                        <button type="button" onClick={handleDangXuat}>Đăng xuất</button>


                                    </div>


                                </div>
                            ) : (
                                //chưa đăng nhập
                                dangKy ? (
                                    <>
                                        <h3>Đăng ký tài khoản</h3>
                                        <div className="myForm">
                                            <form action="">

                                                <div className="inputItem">
                                                    <input
                                                        id="soDt"
                                                        name="soDt"
                                                        value={userDangKy.soDt}
                                                        onChange={handleChangeInputDangKy}
                                                        type="text"
                                                        placeholder="Số điện thoại"
                                                    />
                                                    <i className="fa-solid fa-phone"></i>
                                                </div>
                                                {
                                                    alert.soDt !== "" ? (<p className="alert">{alertDangKy.soDt}</p>) : null
                                                }
                                                <div className="inputItem">
                                                    <input
                                                        id="tenNguoiDung"
                                                        name="tenNguoiDung"
                                                        value={userDangKy.tenNguoiDung}
                                                        onChange={handleChangeInputDangKy}
                                                        type="text"
                                                        placeholder="Tên người dùng"
                                                    />
                                                    <i className="fa-solid fa-user"></i>
                                                </div>
                                                {
                                                    alert.tenNguoiDung !== "" ? (<p className="alert">{alertDangKy.tenNguoiDung}</p>) : null
                                                }

                                                <div className="inputItem">
                                                    <input
                                                        id="diaChi"
                                                        name="diaChi"
                                                        value={userDangKy.diaChi}
                                                        onChange={handleChangeInputDangKy}
                                                        type="text"
                                                        placeholder="Địa chỉ"
                                                    />
                                                    <i className="fa-solid fa-location-dot"></i>
                                                </div>
                                                {
                                                    alertDangKy.diaChi !== "" ? (<p className="alert">{alertDangKy.diaChi}</p>) : null
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
                                                <input
                                                    id="soDt"
                                                    name="soDt"
                                                    value={soDtDangNhap}
                                                    type="text"
                                                    placeholder="Số điện thoại"
                                                    onChange={handleChangeInputDangNhap} />
                                                <i className="fa-solid fa-phone"></i>
                                            </div>
                                            {
                                                alertDangNhap !== "" ? (<p className="alert">{alertDangNhap}</p>) : null
                                            }

                                            <div className="myBtn">
                                                <button type="button" onClick={handleDangNhap}> Đăng nhập</button>
                                            </div>
                                            <p onClick={handleShowDangKy}>
                                                Chưa có tài khoản, đăng ký ngay
                                            </p>
                                        </div>
                                    </>
                                )




                            )
                        }
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    );
};

export default TaiKhoan;
