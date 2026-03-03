import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice ({
    name: "projects",
    initialState: {itmes:[]},
    reducers:{
        setProjects : (state, action) => {
            state.itmes = action.payload;
        }
    }
});


export const {setProjects} = projectSlice.actions;
export default projectSlice.reducer;