import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'Redux/Slices/AuthSlice';

const store = configureStore({
    reducer: {
        userData: userReducer,
        // Add other reducers here if you have them
    },
});

export default store;
