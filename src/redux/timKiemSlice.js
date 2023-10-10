import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    back: false,
    clear: false,
    goiY: true,
    keyword: '',
    ketQua: []
}

export const timKiemSlice = createSlice({
    name: 'timkiem',
    initialState,
    reducers: {
        clickInput: (state) => {
            state.back = true;
            state.goiY = true;
        },
        offBack: (state) => {
            state.back = false;
            state.clear = false;
        },
        

        nhapNoiDung: (state, action) => {
            state.keyword = action.payload;
            state.goiY = false;
            action.payload !== '' ? state.clear = true : state.clear = false
            // action.payload !== '' ? state.goiY = false : state.goiY = true
        },
    }
});

export const { clickInput, offBack, nhapNoiDung } = timKiemSlice.actions;
export default timKiemSlice.reducer;
