import {createSlice} from '@reduxjs/toolkit';

const us = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ?? '') : null;

const initialState = {
    isAuthenticated: localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null,
    user: us,
    token: localStorage.getItem("token") ?? null,
    role: us?.role,
    // Add other authentication-related state properties if needed
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {

            const {token, roles} = action.payload;
            state.isAuthenticated = !!token; // Check if token exists
            state.user = action.payload;
            state.token = token;
            state.role = roles;
        },
        logOut: (state, action) => {
            console.log("in logout");
            state.isAuthenticated = false;
            state.user = null;
            state.token = '';
            state.role = '';

        }
    },
});

export const {login, logOut} = userSlice.actions;
export default userSlice.reducer;
