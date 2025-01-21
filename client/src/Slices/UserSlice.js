import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginError: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            return initialState;
        },
        subscribe: (state, action) => {
            if (state.currentUser.subscribedUser.includes(action.payload)) {
                state.currentUser.subscribedUser.splice(state.currentUser.subscribedUser.findIndex((id) => id === action.payload), 1);

            } else {
                state.currentUser.subscribedUser.push(action.payload);

            }
        }

    }
})
export const { loginStart, loginError, loginSuccess, logout, subscribe } = userSlice.actions;

export default userSlice.reducer;
