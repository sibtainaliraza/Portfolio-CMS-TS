import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{token: null, isAuthenticated: false},
    reducers:{
        setLogin: (state, action)  => {
            state.token = action.payload;
            state.isAuthenticated= true;
        },
        Logout: (state) => {
            state.token = null;
            state.isAuthenticated =false;
        }
    }
});

export const {setLogin, Logout} = authSlice.actions;
export default authSlice.reducer;