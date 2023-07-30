import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    token:null,
    role:null,
    // Add other authentication-related state properties if needed
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(state);
            state.isAuthenticated = true;
            state.user = action.payload;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
    },
});

export const { login /* Add other action names here */ } = userSlice.actions;
export default userSlice.reducer;
