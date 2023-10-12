import React, { useEffect, useState } from "react";
import "./search.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clickInput, nhapNoiDung, offBack } from "../../redux/timKiemSlice";
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
    // const { back, clear, keyword, ketQua } = useSelector(
    //     (state) => state.timKiem
    // );
    const { gioHang } = useSelector((state) => state.gioHang);
    const sumSoLuong = gioHang.reduce((total, item) => {
        return total + item.soLuong;
    }, 0);
    const sumThanhTien = gioHang.reduce((total, item) => {
        return total + item.thanhTien;
    }, 0);
    const [showGioHang, setShowGioHang] = useState(false);
    const handleGioHang = () => {
        setShowGioHang(!showGioHang);
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

    useEffect(() => {
        dispath(login());
    }, []);

    const { isLogin, user } = useSelector((state) => state.dangNhap);

    const [showXacNhan, setShowXacNhan] = useState(false);

    const handleDangHangNgay = () => {

        setShowXacNhan(!showXacNhan);
    };

    const handleXacNhanDonHang = () => {
        if (isLogin) {
            const dataDonHang = {
                user,
                gioHang,
            }
            dispath(datHangNgay(dataDonHang))
            message.success('Đặt hàng thành công', 3)
            handleDangHangNgay()
        } else {
            message.error('Bạn chưa đăng nhập', 3)
        }

    }

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
                onClick={handleGioHang}
            ></div>

            <div id="gioHang" className={showGioHang ? "show" : null}>
                <div className="top">
                    <i className="fa-solid fa-angle-right" onClick={handleGioHang}></i>
                    <div>
                        <p>Giỏ hàng của bạn ({sumSoLuong.toLocaleString()})</p>
                    </div>
                    <button type="button" onClick={handleGioHang}>
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
                    <button type="button" onClick={handleDangHangNgay}>
                        Đặt hàng ngay
                    </button>
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
                                id="tenNguoiDung"
                                name="tenNguoiDung"
                                type="text"
                                value={user.tenNguoiDung}
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="inputItem">
                            <input id="soDt" name="soDt" type="text" value={user.soDt} />
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className="inputItem">
                            <input
                                id="diaChi"
                                name="diaChi"
                                type="text"
                                value={user.diaChi}
                            />
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                    </div>
                    <div className="ghiChu">
                        <label htmlFor="ghiChu">Ghi Chú</label>
                        <textarea name="ghiChu" id="ghiChu" cols="50" rows="5"></textarea>
                    </div>
                    <div className="thanhToan">
                        <p>Thanh toán khi nhận hàng</p>
                    </div>
                    <div className="myBtn">
                        <button type="button" onClick={handleXacNhanDonHang}> Xác nhận đơn hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
