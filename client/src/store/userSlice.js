import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        logout(state) {
            state = null;
        },
        changeUser(state, action) {
            state = action.payload;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reduser;