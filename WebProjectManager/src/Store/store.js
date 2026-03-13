import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import projectsReducer from './projectsSlice';
import tasksReducer from './tasksSlice'; 

export const store = configureStore({
  reducer: {
    login: loginReducer,
    projects: projectsReducer,
    tasks: tasksReducer, 
  },
});