import React from "react";
import "./sanphamitem.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  giamSoLuong,
  tangSoLuong,
  themGioHang,
} from "../../redux/gioHangSlice";

const SanPhamItem = ({ item, inCart }) => {
  const { gioHang } = useSelector((state) => state.gioHang);

  let { id, tenSp, hinhAnh, giaBan, giaGiam, kho, gif } = item;
  let phanTram = ((giaGiam * 100) / giaBan - 100).toFixed(1);

  let sanPhamInCart = gioHang.find((item) => item.id === id);

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
            {giaGiam > 0 ? giaBan.toLocaleString() + "đ" : null}
          </p>
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
        ) : (


          kho > 0 ? (
            <div className="addToCart">
              <button type="button" onClick={() => handleThemVaoGio(item)}>
                Thêm vào giỏ
              </button>
            </div>


          ) : (
            <div className="tamHet">
              <button type="button">
                Tạm hết hàng
              </button>
            </div>

          )

        )}
        <div className="phanTram">
          <p>{giaGiam > 0 ? phanTram + "%" : null}</p>
        </div>
        <div className="heart">
          <i className="fa-regular fa-heart"></i>
        </div>
        {
          gif > 0 ? (
            <div className="gif">
              <i className="fa-solid fa-gift"></i>
            </div>
          ) : null
        }

      </div>
    </div>
  );
};

export default SanPhamItem;
