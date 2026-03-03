import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice ({
    name: "projects",
    initialState: {items:[]},
    reducers:{
        setProjects : (state, action) => {
            state.items = action.payload;
        }
    }
});


export const {setProjects} = projectSlice.actions;
export default projectSlice.reducer;