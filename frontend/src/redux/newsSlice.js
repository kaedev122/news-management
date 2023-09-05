import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    news: [],
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNews: (state, action) => {
            state.news = action.payload;
        },
        addNews: (state, action) => {
            state.news.push(action.payload);
        },
        updateNews: (state, action) => {
            const { id, newData } = action.payload;
            const newsIndex = state.news.findIndex(n => n.id === id);
            if (newsIndex !== -1) {
                state.news[newsIndex] = { ...state.news[newsIndex], ...newData };
            }
        },
        removeNews: (state, action) => {
            const newsId = action.payload;
            state.news = state.news.filter(item => item.id !== newsId);
        },
    },
})

// Action creators are generated for each case reducer function
export const { setNews, addNews, updateNews, removeNews } = newsSlice.actions;
export default newsSlice.reducer;