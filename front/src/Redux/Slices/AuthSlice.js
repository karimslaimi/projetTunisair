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
            state.isAuthenticated = true;
            state.user = action.payload;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        logOut:(state, action)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.role = null;

        }
    },
});

export const { login,logOut /* Add other action names here */ } = userSlice.actions;
export default userSlice.reducer;
