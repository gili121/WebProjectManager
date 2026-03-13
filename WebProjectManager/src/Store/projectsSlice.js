import { createSlice } from '@reduxjs/toolkit';

//טעינה של הפרויקט מ sessionStorage
const savedProjects = JSON.parse(sessionStorage.getItem('projects')) || [];

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    AllProjects: savedProjects
  },
  reducers: {
    addProject: (state, action) => {
      const newProject = {
        name: action.payload.name,
        description: action.payload.description,
        date: action.payload.date
      };
      state.AllProjects.push(newProject);

      // שמירה ב-sessionStorage אחרי הוספה
      sessionStorage.setItem('projects', JSON.stringify(state.AllProjects));
    },

    deleteProject: (state, action) => {
      state.AllProjects = state.AllProjects.filter(
        project => project.name !== action.payload
      );
      sessionStorage.setItem('projects', JSON.stringify(state.AllProjects));
    },
    
    updateProject: (state, action) => {
      state.AllProjects = state.AllProjects.map(proj =>
        proj.name === action.payload.originalName
          ? { ...proj, name: action.payload.name, description: action.payload.description, date: action.payload.date }
          : proj
      );
      sessionStorage.setItem('projects', JSON.stringify(state.AllProjects));
    }
  }
});

export const { addProject, deleteProject, updateProject } = projectsSlice.actions;
export default projectsSlice.reducer;