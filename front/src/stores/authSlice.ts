import {createSlice} from '@reduxjs/toolkit';

export interface authenticationState {
    isAuthenticated: boolean,
    user: any,
    token:string,
    role:string,
}

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
            state.isAuthenticated = true;
            state.user = action.payload;
            state.token = action.payload.token;
            state.role = action.payload.roles;
        },
        logOut:(state, action)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.token = '';
            state.role = '';

        }
    },
});

export const { login,logOut  } = userSlice.actions;
export default userSlice.reducer;
