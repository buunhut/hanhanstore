import React, { useEffect, useState } from "react";
import "./search.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    giamSoLuong,
    tangSoLuong,
    xoaDatHang,
    datHangNgay,
} from "../../redux/gioHangSlice";
import { login } from "../../redux/dangNhapSlice";
import { message } from "antd";

const Search = () => {
    const dispath = useDispatch();
    useEffect(() => {
        dispath(login());
    }, []);


    //lấy dữ liệu từ redex store
    const { isLogin, user } = useSelector((state) => state.dangNhap);

    const { gioHang } = useSelector((state) => state.gioHang);

    const [thongTinDatHang, setThongTinDatHang] = useState({
        tenKhachHang: "",
        soDt: "",
        diaChi: "",
        ghiChu: "",
        hinhThucTT: "",
    });

    useEffect(() => {

        setThongTinDatHang({
            tenKhachHang: user.tenNguoiDung,
            soDt: user.soDt?.replace("+84", "0"),
            diaChi: "",
            ghiChu: "",
            hinhThucTT: "tiền mặt",
        });

    }, [user]);

    console.log(thongTinDatHang);







    const sumSoLuong = gioHang.reduce((total, item) => {
        return total + item.soLuong;
    }, 0);
    const sumThanhTien = gioHang.reduce((total, item) => {
        return total + item.thanhTien;
    }, 0);
    let phiShip = 20000
    if (sumThanhTien >= 300000) {
        phiShip = 0
    }



    const [showGioHang, setShowGioHang] = useState(false);
    const handleGioHang = () => {
        setShowGioHang(true);
        lockScroll();
    };

    const handleDongGioHang = () => {
        setShowGioHang(false);
        unlockScroll();
    };

    const handleGiamSoLuong = (id) => {
        dispath(giamSoLuong(id));
    };

    const handleTangSoLuong = (id) => {
        dispath(tangSoLuong(id));
    };
    const handleXoaDatHang = (id) => {
        dispath(xoaDatHang(id));
    };

    const [showXacNhan, setShowXacNhan] = useState(false);

    const lockScroll = () => {
        document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
        document.body.style.overflow = "auto";
    };

    const handleDangHangNgay = () => {
        setShowXacNhan(!showXacNhan);
        lockScroll();
    };

    const handleXacNhanDonHang = () => {
        if (thongTinDatHang.diaChi === '') {
            setThongTinDatHang((prevState) => ({
                ...prevState,
                diaChi: user.diaChi
            }))
        }
        const dataDonHang = {
            // user,
            gioHang,
            thongTinDatHang
        };
        dispath(datHangNgay(dataDonHang));
        message.success("Đặt hàng thành công", 3);

        handleDangHangNgay();
        unlockScroll();
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        setThongTinDatHang((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    return (
        <div id="search">
            <div className="container">
                <div className="content">
                    <div className="input">
                        <NavLink to="tim-kiem">
                            <input type="text" placeholder="Bạn muốn tìm gì hôm nay" />
                        </NavLink>
                        <i className="fa-solid fa-magnifying-glass glass"></i>
                    </div>
                    {sumSoLuong > 0 ? (
                        <div className="cart" onClick={handleGioHang}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span>{sumSoLuong}</span>
                        </div>
                    ) : null}
                </div>
            </div>

            <div
                id="overlay"
                className={showGioHang ? "show" : null}
            // onClick={handleDongGioHang}
            ></div>

            <div id="gioHang" className={showGioHang ? "show" : null}>
                <div className="top">
                    <i
                        className="fa-solid fa-angle-right"
                        onClick={handleDongGioHang}
                    ></i>
                    <div>
                        <p>Giỏ hàng của bạn ({sumSoLuong.toLocaleString()})</p>
                    </div>
                    <button type="button" onClick={handleDongGioHang}>
                        Đóng
                    </button>
                </div>
                <div className="main">
                    <table>
                        <tbody>
                            {gioHang?.map((item) => {
                                const { id, tenSp, hinhAnh, donGia, soLuong, thanhTien } = item;
                                return (
                                    <tr key={id}>
                                        <td className="hinhAnh">
                                            <img src={hinhAnh} alt="" />
                                        </td>
                                        <td className="tenSp">
                                            <p>{tenSp}</p>
                                            <div>
                                                <p className="donGia">
                                                    {donGia.toLocaleString() + "đ"}
                                                </p>
                                                <i
                                                    className="fa-solid fa-minus giam"
                                                    onClick={() => handleGiamSoLuong(id)}
                                                ></i>
                                                <p className="soLuong">{soLuong.toLocaleString()}</p>

                                                <i
                                                    className="fa-solid fa-plus tang"
                                                    onClick={() => handleTangSoLuong(id)}
                                                ></i>
                                            </div>
                                        </td>
                                        <td className="thanhTien">
                                            <i
                                                className="fa-regular fa-trash-can"
                                                onClick={() => handleXoaDatHang(id)}
                                            ></i>
                                            <p>{thanhTien.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="bottom">
                    <p>Tổng: {sumThanhTien.toLocaleString() + "đ"}</p>

                    {
                        isLogin ? (
                            <>
                                {sumSoLuong > 0 ? (
                                    <button type="button" onClick={handleDangHangNgay}>
                                        Đặt hàng ngay
                                    </button>
                                ) : (
                                    <button type="button" onClick={handleDongGioHang}>
                                        Tiếp tục mua sắm
                                    </button>
                                )}
                            </>
                        ) : (
                            <button type="button">
                                <NavLink to="/tai-khoan">Đăng nhập</NavLink>
                            </button>
                        )
                    }
                </div>

                {showXacNhan ? (
                    <div id="confirm" onClick={handleDangHangNgay}></div>
                ) : null}
                <div id="main" className={showXacNhan ? "show" : null}>
                    <button type="button" className="close" onClick={handleDangHangNgay}>
                        Đóng
                    </button>
                    <h3>Thông tin khách hàng</h3>
                    <div className="tenNguoiDung">
                        <div className="inputItem">
                            <input
                                id="tenKhachHang"
                                name="tenKhachHang"
                                type="text"
                                value={
                                    thongTinDatHang.tenKhachHang
                                }
                                disabled
                            // onChange={handleInputChange}
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="inputItem">
                            <input
                                id="soDt"
                                name="soDt"
                                type="text"
                                value={
                                    thongTinDatHang.soDt
                                }
                                disabled
                            // onChange={handleInputChange}
                            />
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className="inputItem">

                            <input
                                list="listDiaChi"
                                name="diaChi"
                                id="diaChi"
                                defaultValue={user.diaChi}
                                // value={thongTinDatHang.diaChi}
                                placeholder={"Nhập địa chỉ nhận hàng"}
                                onChange={handleInputChange}
                            // onClick={
                            //     () => setThongTinDatHang((prevState) => ({
                            //         ...prevState,
                            //         diaChi: ""

                            //     }))
                            // }
                            />

                            <datalist id="listDiaChi">
                                {
                                    user.listDiaChiNhanHang?.map((item, index) => {
                                        return <option value={item} key={index} />
                                    })
                                }
                            </datalist>


                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="inputItem">
                            <input
                                id="ghiChu"
                                name="ghiChu"
                                type="text"
                                value={
                                    thongTinDatHang.ghiChu
                                }
                                placeholder="Ghi chú"

                                onChange={handleInputChange}
                            />
                            <i className="fa-solid fa-pen"></i>
                            {/* <label htmlFor="ghiChu">Ghi Chú:</label>
                        <textarea name="ghiChu" id="ghiChu" cols="50" rows="3" onChange={handleInputChange}></textarea> */}
                        </div>

                    </div>

                    <h3>Thông tin đơn hàng</h3>
                    <div className="thanhToan">
                        <div className="thanhToanItem">
                            <span>Tiền hàng:</span>{" "}
                            <p> {sumThanhTien.toLocaleString() + "đ"} </p>
                        </div>
                        <div className="thanhToanItem">
                            <span>Phí ship: </span>
                            <p> {phiShip > 0 ? phiShip.toLocaleString() + "đ" : "Miễn phí"} </p>
                        </div>
                        <div className="thanhToanItem">
                            <span>
                                <b>Tổng thanh toán:</b>{" "}
                            </span>
                            <p>
                                <b>{(sumThanhTien + phiShip).toLocaleString() + "đ"}</b>{" "}
                            </p>
                        </div>
                        {/* <div className="thanhToanItem">
                            <p> Địa chỉ: {thongTinDatHang.diaChi === '' ? diaChi : thongTinDatHang.diaChi}</p>
                        </div> */}


                        <div className="thanhToanItem noBorder">
                            <p>Hình thức thanh toán:</p>
                            <div className="hinhThucThanhToan">
                                <select
                                    name="hinhThucTT"
                                    id="hinhThucTT"
                                    className="custom-select"
                                    onChange={handleInputChange}
                                >
                                    <option value="tiền mặt">Tiền mặt</option>
                                    <option value="chuyển khoản">Chuyển khoản</option>
                                </select>
                            </div>
                        </div>


                        <div
                            id="thongTinTk"
                            style={{
                                display: thongTinDatHang.hinhThucTT === "chuyển khoản" ? "block" : "none",
                            }}
                        >
                            <p>Số tài khoản: 999 999 999</p>
                            <p>Chủ tài khoản: Trương Bửu Lập</p>
                            <p>Ngân hàng: BA TIGER - CN Bạc Liêu</p>
                        </div>

                    </div>
                    <div className="myBtn">
                        <button type="button" onClick={handleXacNhanDonHang}>
                            {" "}
                            Xác nhận đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
