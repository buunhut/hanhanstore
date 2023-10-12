import { createSlice } from "@reduxjs/toolkit";

const gioHang = JSON.parse(localStorage.getItem('gioHang')) || [];
const initialState = {
    gioHang,
}

export const gioHangSlice = createSlice({
    name: 'gioHang',
    initialState,
    reducers: {
        themGioHang: (state, action) => {
            const sanPham = action.payload;
            const { id, tenSp, hinhAnh, giaBan, giaGiam, gif } = sanPham;
            const donGia = giaGiam > 0 ? giaGiam : giaBan;
            const soLuong = 1;
            const thanhTien = donGia * soLuong;
            const data = {
                id, tenSp, hinhAnh, donGia, soLuong, thanhTien
            }
            state.gioHang.push(data)

            // Lưu giỏ hàng vào Local Storage
            localStorage.setItem('gioHang', JSON.stringify(state.gioHang));
        },

        giamSoLuong: (state, action) => {
            const id = action.payload
            const index = state.gioHang.findIndex(item => item.id === id)
            if (index !== -1) {
                const soLuong = state.gioHang[index].soLuong - 1
                if (soLuong === 0) {
                    state.gioHang.splice(index, 1)

                } else {
                    const thanhTien = state.gioHang[index].donGia * soLuong
                    const data = {
                        ...state.gioHang[index],
                        soLuong,
                        thanhTien
                    }
                    state.gioHang[index] = data
                }
            }
            localStorage.setItem('gioHang', JSON.stringify(state.gioHang));
        },

        tangSoLuong: (state, action) => {
            const id = action.payload
            const index = state.gioHang.findIndex(item => item.id === id)
            if (index !== -1) {
                const soLuong = state.gioHang[index].soLuong + 1
                const thanhTien = state.gioHang[index].donGia * soLuong
                const data = {
                    ...state.gioHang[index],
                    soLuong,
                    thanhTien
                }
                state.gioHang[index] = data
            }
            localStorage.setItem('gioHang', JSON.stringify(state.gioHang));
        },

        xoaDatHang: (state, action) => {
            const id = action.payload
            const index = state.gioHang.findIndex(item => item.id === id)
            if (index !== -1) {
                state.gioHang.splice(index, 1)
                localStorage.setItem('gioHang', JSON.stringify(state.gioHang));
            }
        },

        datHangNgay: (state, action) => {
            localStorage.removeItem('gioHang')
            state.gioHang = []

            console.log(action.payload)
        }



    }
});

export const { themGioHang, tangSoLuong, giamSoLuong, xoaDatHang, datHangNgay } = gioHangSlice.actions;
export default gioHangSlice.reducer;
