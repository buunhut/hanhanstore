import { createSlice } from "@reduxjs/toolkit";

//giá trị khởi tạo ban đầu, gọi từ backend về
const initialState = {
    isLogin: false,
    user: {}
}

export const dangNhapSlice = createSlice({
    name: 'dangNhap',

    //giá trị khởi tạo ban đầu
    initialState,

    //đường dispath về
    reducers: {
        login: (state) => {
            const localUser = JSON.parse(localStorage.getItem('user'))
            if (localUser) {
                state.user = localUser
                state.isLogin = true
            }

        },
        logout: (state) => {
            localStorage.removeItem('user')
            state.user = {}
            state.isLogin = false


        }

    }
})
export const { login, logout } = dangNhapSlice.actions;
export default dangNhapSlice.reducer