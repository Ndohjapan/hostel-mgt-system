import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null,
    twk: localStorage.getItem('twk') ? localStorage.getItem("twk") : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload.porter;
            state.twk = action.payload.tokens.accessToken;
            localStorage.setItem("userInfo", JSON.stringify(action.payload.porter));
            localStorage.setItem("twk", action.payload.tokens.accessToken);
        },
        logout: (state, action) => {
            state.userInfo = null;
            state.twk = null;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("twk");
        }
    }
});
export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;