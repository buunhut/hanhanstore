import React from "react";
import "./sanpham.scss";
import { useSelector } from "react-redux";
import SanPhamItem from "./SanPhamItem";
import MyCarousel from "../carousel/MyCarousel";

const SanPham = () => {
    const { sanPham } = useSelector((state) => state.sanPham);
    const { gioHang } = useSelector((state) => state.gioHang);

    return (
        <div id="sanPham">
            <div className="container">
                <h2>Sản phẩm mới</h2>
                <MyCarousel />
                <h2>Sản phẩm bán chạy</h2>

                <div className="content">
                    {sanPham?.map((item) => {
                        const sanPhamInCart = gioHang.some(
                            (cartItem) => cartItem.id === item.id
                        );
                        return (
                            <SanPhamItem
                                item={item}
                                inCart={sanPhamInCart}
                                key={item.id}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SanPham;
