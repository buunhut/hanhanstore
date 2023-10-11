import React, { useState } from "react";
import "./timkiem.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    giamSoLuong,
    tangSoLuong,
    themGioHang,
} from "../../redux/gioHangSlice";

const TimKiem = () => {
    const dispath = useDispatch();
    const { sanPham } = useSelector((state) => state.sanPham);
    const { gioHang } = useSelector((state) => state.gioHang);

    const [keyword, setKeyword] = useState("");

    const [ketQuaTimKiem, setKetQuaTimKiem] = useState([]);

    const handleClear = () => {
        setKeyword("");
        setKetQuaTimKiem([])
    };

    // Hàm chuyển đổi dấu tiếng Việt sang không dấu
    const boDauTiengViet = (str) => {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/[^a-z0-9\s]/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, hoặc khoảng trắng
    };

    const handleGoiY = (event) => {
        setKeyword(event.target.innerText);

        const value = event.target.innerText;
        const result = sanPham.filter((item) => {
            return boDauTiengViet(item.tenSp).includes(boDauTiengViet(value));
        });
        setKetQuaTimKiem(result);
    };

    const handleKeyword = (event) => {
        if (event.target.value === '') {
            setKeyword('');

            setKetQuaTimKiem([]);


        } else {
            setKeyword(event.target.value);

            const result = sanPham.filter((item) => {
                return boDauTiengViet(item.tenSp).includes(boDauTiengViet(keyword));
            });
            setKetQuaTimKiem(result);
        }

    };

    const handleThemVaoGio = (item) => {
        dispath(themGioHang(item));
    };

    const handleGiamSoLuong = (id) => {
        dispath(giamSoLuong(id));
    };

    const handleTangSoLuong = (id) => {
        dispath(tangSoLuong(id));
    };

    return (
        <div id="timKiem">
            <div id="header">
                <div className="container">
                    <div className="content">
                        <div className="back">
                            <NavLink to="/">
                                <i className="fa-solid fa-angle-left"></i>
                            </NavLink>
                        </div>
                        <div className="inputItem">
                            <input
                                type="text"
                                placeholder="Nhập tên sản phẩm...,"
                                autoFocus
                                value={keyword}
                                onChange={handleKeyword}
                            />
                            <i className="fa-solid fa-magnifying-glass glass"></i>
                            {keyword !== "" ? (
                                <i
                                    className="fa-solid fa-xmark close"
                                    onClick={handleClear}
                                ></i>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            <div id="main">
                <div className="container">
                    {keyword === "" ? (
                        <div className="goiY">
                            <span onClick={handleGoiY}>bia</span>
                            <span onClick={handleGoiY}>nước mắm</span>
                            <span onClick={handleGoiY}>mi</span>
                            <span onClick={handleGoiY}>sữa tươi</span>
                        </div>
                    ) : null}

                    {ketQuaTimKiem.length > 0 ? (
                        <>
                            {/* <p className="ketQua">Kết quả tìm kiếm</p> */}
                            <div className="content">
                                {ketQuaTimKiem?.map((item) => {
                                    const inCart = gioHang.some(
                                        (cartItem) => cartItem.id === item.id
                                    );

                                    const sanPhamInCart = gioHang.find(
                                        (cartItem) => cartItem.id === item.id
                                    );

                                    const { id, tenSp, hinhAnh, giaBan, giaGiam, kho, gif } = item;
                                    const phanTram = ((giaGiam * 100) / giaBan - 100).toFixed(1);


                                    return (
                                        <div className="product" key={id}>
                                            <div className="hinhAnh">
                                                <img src={hinhAnh} alt="" />

                                            </div>
                                            <div className="text">
                                                <div className="tenSp">
                                                    <p>{tenSp}</p>
                                                </div>
                                                <div className="giaSp">
                                                    <div>
                                                        <p className="giaGiam">
                                                            {giaGiam > 0
                                                                ? giaGiam.toLocaleString() + "đ"
                                                                : giaBan.toLocaleString() + "đ"}
                                                        </p>

                                                        {giaGiam > 0 ? (
                                                            <p className="giaBan">
                                                                {giaBan.toLocaleString() + "đ"}
                                                            </p>
                                                        ) : null}
                                                    </div>
                                                    {inCart ? (
                                                        <div className="tangGiam">
                                                            <i
                                                                className="fa-solid fa-minus giam"
                                                                onClick={() => handleGiamSoLuong(id)}
                                                            ></i>
                                                            <p className="soLuong">{sanPhamInCart.soLuong}</p>
                                                            <i
                                                                className="fa-solid fa-plus tang"
                                                                onClick={() => handleTangSoLuong(id)}
                                                            ></i>
                                                        </div>
                                                    ) : kho > 0 ? (
                                                        <div className="addToCart">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleThemVaoGio(item)}
                                                            >
                                                                Thêm vào giỏ
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="tamHet">
                                                            <button
                                                                type="button"
                                                            >
                                                                Tạm hết hàng
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* <div className="heart">
                                                <i className="fa-regular fa-heart"></i>
                                            </div> */}
                                            <div className="phanTram">
                                                <p>{giaGiam > 0 ? phanTram + "%" : null}</p>
                                            </div>
                                            <div className="gif">
                                                <i className="fa-solid fa-gift"></i>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default TimKiem;
