import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: { name: 'project', password: '123' }
});

export default loginSlice.reducer;
