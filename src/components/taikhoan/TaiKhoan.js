import React, { useEffect, useState } from "react";
import "./taikhoan.scss";
import { NavLink } from "react-router-dom";
import Footer from "../dungchung/Footer.js";
import { Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/dangNhapSlice";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";





const TaiKhoan = () => {
    const dispath = useDispatch();
    useEffect(() => {
        dispath(login());
    }, []);
    const { isLogin, user } = useSelector((state) => state.dangNhap);
    const [dangKy, setDangKy] = useState(false);
    //otp
    const [showXacNhanOtp, setShowXacNhanOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [alertOtp, setAlertOtp] = useState("");
    const [confirmObj, setConfirmObj] = useState("");

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

    const [formDk, SetFormDk] = useState(true)

    // Perform additional validation (e.g., special characters in tenNguoiDung and digits in soDt)
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;

    const handleShowDangKy = () => {
        setDangKy(!dangKy);
    };

    const handleChangeInputDangKy = (event) => {
        const { id, value } = event.target;
        // Validate the input as it's being changed
        if (id === "tenNguoiDung") {
            if (value === "" || undefined) {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    tenNguoiDung: "Vui lòng nhập họ và tên",
                }));
            } else if (specialChars.test(value)) {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    tenNguoiDung: "Họ và tên không được chứa ký tự đặc biệt",
                }));
            } else {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    tenNguoiDung: "",
                }));
            }
        } else if (id === "diaChi") {
            if (value === "") {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    diaChi: "Vui lòng địa chỉ",
                }));
            } else {
                setAlertDangKy((prevState) => ({
                    ...prevState,
                    diaChi: "",
                }));
            }
        }

        setUserDangKy((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleChangeInputSoDt = (value) => {
        setUserDangKy((prev) => ({ ...prev, soDt: value }));

        if (value === "" || value === undefined) {
            setAlertDangKy((prevState) => ({
                ...prevState,
                soDt: "Vui lòng nhập số điện thoại",
            }));
        } else {
            setAlertDangKy((prevState) => ({
                ...prevState,
                soDt: "",
            }));
        }
    };






    const handleDangKy = async () => {
        let isValid = true;
        //check soDt
        if (userDangKy.soDt === "" || userDangKy.soDt === undefined) {
            setAlertDangKy((prevState) => ({
                ...prevState,
                soDt: "Vui lòng nhập số điện thoại",
            }));
            isValid = false;
        }
        //check tenNguoiDung
        if (userDangKy.tenNguoiDung === "") {
            setAlertDangKy((prevState) => ({
                ...prevState,
                tenNguoiDung: "Vui lòng nhập họ và tên",
            }));
            isValid = false;
        } else if (specialChars.test(userDangKy.tenNguoiDung)) {
            setAlertDangKy((prevState) => ({
                ...prevState,
                tenNguoiDung: "Họ và tên không được chứa ký tự đặc biệt",
            }));
            isValid = false;
        }
        //check diaChi
        if (userDangKy.diaChi === "") {
            setAlertDangKy((prevState) => ({
                ...prevState,
                diaChi: "Vui lòng địa chỉ",
            }));
            isValid = false;
        }

        if (!isValid) {
            return;
        }


        if (isValid) {
            const phoneNumber = userDangKy.soDt;
            // const recaptchaVerifier = new RecaptchaVerifier(auth, 'reCaptcha', {

            //     'size': 'normal',
            //     'callback': async () => {
            //         setShowXacNhanOtp(true)
            //         // const response = await signInWithPhoneNumber(
            //         //     auth,
            //         //     number,
            //         //     recaptchaVerifier
            //         // );
            //         // setConfirmObj(response);

            //         console.log("sent otp")
            //     }
            // });

            const appVerifier = new RecaptchaVerifier(auth, 'myRecaptcha', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // onSignInSubmit();
                    console.log("first" + response)
                }
            });

            // recaptchaVerifier.render()

            console.log(appVerifier)

            const response = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                appVerifier
            );

            console.log(response)
            setConfirmObj(response);

            setShowXacNhanOtp(true)



            // console.log(recaptchaVerifier)
            // recaptchaVerifier.render();

            SetFormDk(false)
            setSoDtDangNhap(phoneNumber.replace('+84', '0'))

        }
    };

    const handleXacNhanOtp = async () => {
        if (otp === "") {
            setAlertOtp("Vui lòng nhập mã xác nhận OTP");
        } else {
            setAlertOtp("");
            // console.log("code kiểm tra otp")
            try {
                await confirmObj.confirm(otp);
                //lưu vào csdl 

                message.success("OTP hợp lệ, đăng ký thành công");
                setOtp("");
                setUserDangKy({
                    soDt: "",
                    tenNguoiDung: "",
                    diaChi: "",
                });
                handleShowDangKy();
            } catch (error) {
                message.error("OTP không hợp lệ, đănh ký thất bại");
            }
        }
    };

    const [soDtDangNhap, setSoDtDangNhap] = useState("");

    const [alertDangNhap, setAlertDangNhap] = useState("");

    const handleChangeInputDangNhap = (value) => {

        if (value === "" || value === undefined) {
            setAlertDangNhap("Vui lòng nhập số điện thoại");
        } else {
            setAlertDangNhap("");
        }

        setSoDtDangNhap(value);
    };

    const handleDangNhap = () => {
        let isValid = true;
        const phonePattern = /^\d+$/;
        if (soDtDangNhap === "" || soDtDangNhap === undefined) {
            setAlertDangNhap("Vui lòng nhập số điện thoại");
            isValid = false;
        }
        // If any field is empty, prevent further validation
        if (!isValid) {
            return;
        } else {
            // All validation passed; you can now proceed with registration
            if (soDtDangNhap === "+84919317710") {
                const user = {
                    soDt: "+84919317710",
                    tenNguoiDung: "Trương Bửu Lập",
                    diaChi: "Chợ Cầu Số 2, Hoà Bình, Bạc Liêu",
                    token: "TIGER",
                };

                localStorage.setItem("user", JSON.stringify(user));

                dispath(login());

                message.success("Đăng nhập thành công!", 3);
            } else {
                message.error("Số điện thoại chưa đăng ký!", 3);
            }
        }
    };

    const handleDangXuat = () => {
        Modal.confirm({
            title: "Xác nhận đăng xuất",
            content: "Bạn có chắc muốn đăng xuất?",
            okText: "Đồng ý",
            okType: "danger",
            cancelText: "Không",
            onOk() {
                // Put your delete logic here
                dispath(logout());
                message.success("Đăng xuất thành công", 3);
            },
            onCancel() { },
        });
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
                        {isLogin ? (
                            //đã đăng nhập
                            <>
                                <div id="thongTinNguoiDung">
                                    <h3>Thông tin người dùng</h3>
                                    <div className="main">
                                        <p className="tenNguoiDung">
                                            <i className="fa-solid fa-user"></i>
                                            {user.tenNguoiDung}
                                        </p>
                                        <p className="soDt">
                                            <i className="fa-solid fa-phone"></i>

                                            {user.soDt.replace("+84", "0")}
                                        </p>
                                        <p className="diaChi">
                                            <i className="fa-solid fa-location-dot"></i>
                                            {user.diaChi}
                                        </p>
                                    </div>
                                </div>
                                <div id="thongTinNguoiDung">
                                    <h3>Thêm địa chỉ nhận hàng</h3>
                                    <div className="main">
                                        <p>Chưa có viết</p>
                                    </div>
                                </div>
                                <div id="thongTinNguoiDung">
                                    <h3>Lịch sử đặt hàng</h3>
                                    <div className="main">
                                        <p>Chưa có viết</p>
                                    </div>
                                </div>
                                <div id="thongTinNguoiDung">
                                    <h3>Qui định chung</h3>
                                    <div className="main quiDinh">
                                        <p>
                                            Cảm ơn Quý khách đã sử dụng dịch vụ của chúng tôi. Quý
                                            khách vui lòng tuân thủ một số qui định sau:{" "}
                                        </p>
                                        <p>1. Không bơm hàng.</p>
                                        <p>2. Không trả lại hàng.</p>
                                        <p>3. Không mua thiếu.</p>
                                        <p>
                                            *
                                            <i>
                                                Việc truy cập sử dụng website, đăng ký tài khoản. Quý
                                                khách đã đồng ý cho chúng tôi thu thập thông tin: họ
                                                tên, số điện thoại, địa chỉ mà quý khách đã đăng ký.
                                            </i>{" "}
                                        </p>
                                    </div>
                                    <div className="myBtn">
                                        <button type="button" onClick={handleDangXuat}>
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) :

                            dangKy ? (
                                <>
                                    <h3>Đăng ký tài khoản</h3>
                                    <div className="myForm">
                                        <form action="" id="myRecaptcha">

                                            <>
                                                <div className="formDk" style={{ display: formDk ? "block" : "none" }}>
                                                    <div className="inputItem">
                                                        <PhoneInput
                                                            defaultCountry="VN"
                                                            placeholder="Số điện thoại"
                                                            value={userDangKy.soDt}
                                                            onChange={(value) => handleChangeInputSoDt(value)}
                                                            countries={["VN"]}
                                                            international={false} // Đặt international thành false để ẩn quốc gia
                                                        />
                                                        <i className="fa-solid fa-phone"></i>
                                                    </div>
                                                    {alert.soDt !== "" ? (
                                                        <p className="alert">{alertDangKy.soDt}</p>
                                                    ) : null}
                                                    <div className="inputItem">
                                                        <input
                                                            id="tenNguoiDung"
                                                            name="tenNguoiDung"
                                                            value={userDangKy.tenNguoiDung}
                                                            onChange={handleChangeInputDangKy}
                                                            type="text"
                                                            placeholder="Họ và tên"
                                                        />
                                                        <i className="fa-solid fa-user"></i>
                                                    </div>
                                                    {alert.tenNguoiDung !== "" ? (
                                                        <p className="alert">{alertDangKy.tenNguoiDung}</p>
                                                    ) : null}
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
                                                    {alertDangKy.diaChi !== "" ? (
                                                        <p className="alert">{alertDangKy.diaChi}</p>
                                                    ) : null}


                                                    <div className="myBtn">
                                                        <button id="dangKyBtn" type="button" onClick={handleDangKy}>
                                                            Đăng ký
                                                        </button>
                                                    </div>
                                                </div>


                                                <div className="formXacMinh">
                                                    {/* {
                                                        formDk ? null : (<h3>Vui lòng xác minh bước 1...</h3>)
                                                    }
                                                    <div id="reCaptcha" /> */}
                                                    <div className="xacMinhOtp" style={{ display: showXacNhanOtp ? "block" : "none" }}>
                                                        <h3>Vui lòng xác minh OTP...</h3>
                                                        <div className="inputItem">
                                                            <input
                                                                id="otp"
                                                                name="otp"
                                                                value={otp}
                                                                onChange={(e) => setOtp(e.target.value)} // Sửa đoạn này
                                                                type="text"
                                                                placeholder="Nhập mã OTP"
                                                            />
                                                            <i className="fa-solid fa-key"></i>
                                                        </div>
                                                        {alertOtp !== "" ? (
                                                            <p className="alert">{alertOtp}</p>
                                                        ) : null}
                                                        <div className="myBtn">
                                                            <button type="button" onClick={handleXacNhanOtp}>
                                                                Xác nhận OTP
                                                            </button>
                                                        </div>
                                                    </div>



                                                </div>






                                            </>
                                            {/* )} */}
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3>Đăng nhập</h3>
                                    <div className="myForm">
                                        <div className="inputItem">

                                            <PhoneInput
                                                defaultCountry="VN"
                                                placeholder="Số điện thoại"
                                                value={soDtDangNhap}
                                                onChange={(value) => handleChangeInputDangNhap(value)}
                                                countries={["VN"]}
                                                international={false} // Đặt international thành false để ẩn quốc gia
                                            />
                                            <i className="fa-solid fa-phone"></i>
                                        </div>
                                        {alertDangNhap !== "" ? (
                                            <p className="alert">{alertDangNhap}</p>
                                        ) : null}

                                        <div className="myBtn">
                                            <button type="button" onClick={handleDangNhap}>
                                                {" "}
                                                Đăng nhập
                                            </button>
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
            {/* <Footer /> */}
        </div>
    );
};

export default TaiKhoan;
