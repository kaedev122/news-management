import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './newsSlice';
import addPopupSlice from './addPopupSlice';

export const store = configureStore({
    reducer: {
        news: newsSlice,
        addPopup: addPopupSlice
    },
})