import React, { useState } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import SanPhamItem from "../sanpham/SanPhamItem";
import { giamSoLuong, tangSoLuong, themGioHang } from "../../redux/gioHangSlice";
import "./danhmuc.scss";


const DanhMuc = () => {
    const { listSanPham } = useSelector((state) => state.listSanPham);
    const { gioHang } = useSelector((state) => state.gioHang);


    const danhMucSanPham = {};

    listSanPham.map((sanPham) => {
        if (!danhMucSanPham[sanPham.danhMuc]) {
            danhMucSanPham[sanPham.danhMuc] = [];
        }
        danhMucSanPham[sanPham.danhMuc].push(sanPham);
    });

    const listSanPhamTheoDanhMuc = Object.keys(danhMucSanPham).map((danhMuc) => ({
        danhMuc,
        sanPham: danhMucSanPham[danhMuc],
    }));



    console.log(listSanPhamTheoDanhMuc);

    const dispath = useDispatch();

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
        <div id="danhMuc">
            <div className="container">

                <div id="tabs">
                    <Tabs
                        tabPosition={"left"}
                        items={listSanPhamTheoDanhMuc.map((item, index) => {
                            let { sanPham } = item;
                            return {
                                label: item.danhMuc,
                                key: index,
                                children: (
                                    <div className="content">
                                        {
                                            sanPham.map(item => {

                                                const inCart = gioHang.some(
                                                    (cartItem) => cartItem.id === item.id
                                                );

                                                let { id, tenSp, hinhAnh, giaBan, giaGiam, kho, gif } = item;
                                                let sanPhamInCart = gioHang.find((item) => item.id === id);

                                                let phanTram = ((giaGiam * 100) / giaBan - 100).toFixed(1);

                                                return (


                                                    <div className="sanPhamItem" key={id}>
                                                        <div className="hinhAnh">
                                                            <img src={hinhAnh} alt="" />
                                                        </div>
                                                        <div className="text">
                                                            <div className="tenSp">
                                                                <p>{tenSp}</p>
                                                            </div>
                                                            <div className="giaSp">
                                                                <p className="giaGiam">
                                                                    {giaGiam > 0
                                                                        ? giaGiam.toLocaleString() + "đ"
                                                                        : giaBan.toLocaleString() + "đ"}
                                                                </p>
                                                                <p className="giaBan">
                                                                    {giaGiam > 0
                                                                        ? giaBan.toLocaleString() + "đ"
                                                                        : null}
                                                                </p>
                                                            </div>
                                                            {inCart ? (
                                                                <div className="tangGiam">
                                                                    <i
                                                                        className="fa-solid fa-minus giam"
                                                                        onClick={() => handleGiamSoLuong(id)}
                                                                    ></i>
                                                                    <p className="soLuong">
                                                                        {sanPhamInCart.soLuong}
                                                                    </p>
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
                                                                    <button type="button">Tạm hết hàng</button>
                                                                </div>
                                                            )}
                                                            <div className="phanTram">
                                                                <p>{giaGiam > 0 ? phanTram + "%" : null}</p>
                                                            </div>
                                                            {gif > 0 ? (
                                                                <div className="gif">
                                                                    <i className="fa-solid fa-gift"></i>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>



                                                )
                                            })
                                        }
                                    </div>








                                ),
                            };
                        })}
                    />
                </div>
            </div>
        </div>
    );
};

export default DanhMuc;
