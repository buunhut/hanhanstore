import React, { useState } from "react";
import "./search.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clickInput, nhapNoiDung, offBack } from "../../redux/timKiemSlice";
import { giamSoLuong, tangSoLuong, xoaDatHang } from "../../redux/gioHangSlice";

const Search = () => {
    const dispath = useDispatch();
    const { back, clear, keyword, ketQua } = useSelector(
        (state) => state.timKiem
    );
    const { gioHang } = useSelector((state) => state.gioHang);
    const sumSoLuong = gioHang.reduce((total, item) => {
        return total + item.soLuong;
    }, 0);
    const sumThanhTien = gioHang.reduce((total, item) => {
        return total + item.thanhTien;
    }, 0);
    const clickSearch = () => {
        dispath(clickInput());
    };

    const handleBack = () => {
        dispath(offBack());
    };
    const timKiemSanPham = (event) => {
        let keyword = event.target.value;
        dispath(nhapNoiDung(keyword));
    };
    const [showGioHang, setShowGioHang] = useState(false);
    // console.log(showGioHang);
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

    return (
        <div id="search">
            <div className="container">
                <div className="content">
                    {back ? (
                        <div className="back" onClick={handleBack}>
                            <NavLink to="/">
                                <i className="fa-solid fa-angle-left"></i>
                            </NavLink>
                        </div>
                    ) : null}
                    <div className="input">
                        <NavLink to="tim-kiem">
                            <input
                                id="timKiem"
                                name="timKiem"
                                type="text"
                                placeholder="Tên sản phẩm cần tìm...,"
                                value={keyword}
                                onClick={clickSearch}
                                onChange={timKiemSanPham}
                            />
                        </NavLink>
                        <i className="fa-solid fa-magnifying-glass glass"></i>
                        {clear ? <i className="fa-solid fa-xmark close"></i> : null}
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
                    <p>Giỏ hàng của bạn ({sumSoLuong.toLocaleString()})</p>
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
                    <button type="button">Đặt hàng ngay</button>
                </div>
            </div>
        </div>
    );
};

export default Search;
