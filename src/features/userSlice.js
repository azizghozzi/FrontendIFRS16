import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state)=>state.user.value
export default userSlice.reducer;
//ysajel el user fel redux