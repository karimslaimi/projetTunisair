import {createSlice} from '@reduxjs/toolkit';

const user = localStorage.getItem("user");
const token = localStorage.getItem("token")
const us = (user !== "undefined" && user!== undefined && user !== null) ? JSON.parse(user) : null;
const tk = token??null;
//us for parsed user if exist and tk for parsed token if exist

const initialState = {
    isAuthenticated: tk && us,
    user: us,
    token: tk,
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
