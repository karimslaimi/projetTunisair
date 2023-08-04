import {createSlice} from '@reduxjs/toolkit';



const initialState = {
    isAuthenticated: false,
    user: null,
    token:'',
    role:'',
    // Add other authentication-related state properties if needed
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {

            const { token, roles } = action.payload;
            state.isAuthenticated = !!token; // Check if token exists
            state.user = action.payload;
            state.token = token;
            state.role = roles;
        },
        logOut:(state, action)=>{
            console.log("in logout");
            state.isAuthenticated = false;
            state.user = null;
            state.token = '';
            state.role = '';

        }
    },
});

export const { login,logOut  } = userSlice.actions;
export default userSlice.reducer;
