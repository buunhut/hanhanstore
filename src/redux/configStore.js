import { configureStore } from "@reduxjs/toolkit";
import sanPhamSlice from "./sanPhamSlice";
import gioHangSlice from "./gioHangSlice";
import timKiemSlice from "./timKiemSlice";
import dangNhapSlice from "./dangNhapSlice";

export const store = configureStore({
    reducer: {
        listSanPham: sanPhamSlice,
        gioHang: gioHangSlice,
        timKiem: timKiemSlice,
        dangNhap: dangNhapSlice,
    },
});
