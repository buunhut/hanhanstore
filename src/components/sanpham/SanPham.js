import React from "react";
import "./sanpham.scss";
import { useSelector } from "react-redux";
import SanPhamItem from "./SanPhamItem";

const SanPham = () => {
    const { sanPham } = useSelector((state) => state.sanPham);
    const { gioHang } = useSelector((state) => state.gioHang);

    return (
        <div id="sanPham">
            <div className="container">
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
