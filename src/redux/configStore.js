import { configureStore } from "@reduxjs/toolkit";
import sanPhamSlice from "./sanPhamSlice";
import gioHangSlice from "./gioHangSlice";
import timKiemSlice from "./timKiemSlice";

export const store = configureStore({
    reducer: {
        sanPham: sanPhamSlice,
        gioHang: gioHangSlice,
        timKiem: timKiemSlice,
    },
});
