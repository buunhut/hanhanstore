import { useDispatch } from "react-redux";
import { giamSoLuong, tangSoLuong, themGioHang } from "./redux/gioHangSlice";

export const lockScroll = () => {
    document.body.style.overflow = "hidden";
};
export const unlockScroll = () => {
    document.body.style.overflow = "auto";
};


