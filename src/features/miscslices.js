import { createSlice } from "@reduxjs/toolkit";

const isLoggedInSlice = createSlice({
    name: "isLoggedIn",
    initialState: { value: false },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setIsLoggedIn } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;