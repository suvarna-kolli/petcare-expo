import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const reportsSlice = createSlice({
  name: 'reports',  
  initialState: [], 
  reducers: {

    addReport: (state, action) => {
      state.push(action.payload); 
    },
  },
});


const store = configureStore({
    reducer: {
      reports: reportsSlice.reducer, 
    },
  });
  
  export default store;
export const { addReport } = reportsSlice.actions;

