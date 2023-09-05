import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popup: false,
}

export const addPopupSlice = createSlice({
    name: 'addPopup',
    initialState,
    reducers: {
        show: (state, action) => {
            state.popup = true;
        },
        hide: (state, action) => {
            state.popup = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { show, hide } = addPopupSlice.actions;
export default addPopupSlice.reducer;