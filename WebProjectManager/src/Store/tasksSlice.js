import { createSlice } from '@reduxjs/toolkit';

const savedTasks = JSON.parse(sessionStorage.getItem('tasks')) || {};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    projectsTasks: savedTasks
  },
  reducers: {
    addTask: (state, action) => {
      const { projectName, task } = action.payload;

      if (!state.projectsTasks[projectName]) {
        state.projectsTasks[projectName] = [];
      }

      state.projectsTasks[projectName].push(task);
      sessionStorage.setItem('tasks', JSON.stringify(state.projectsTasks));
    },

    updateTask: (state, action) => {
      const { projectName, taskName, newTaskData } = action.payload;

      if (state.projectsTasks[projectName]) {
        const index = state.projectsTasks[projectName].findIndex(
          t => t.name.trim().toLowerCase() === taskName.trim().toLowerCase()
        );
        if (index !== -1) {
          state.projectsTasks[projectName][index] = newTaskData;
        }
      }
      sessionStorage.setItem('tasks', JSON.stringify(state.projectsTasks));
    },

    DeleteTask: (state, action) => {
      const { projectName, taskName } = action.payload;
      if (state.projectsTasks[projectName]) {
        //מחליף את המערך בלי המשימה שנבחרה למחיקה
        state.projectsTasks[projectName] = [
          ...state.projectsTasks[projectName].filter(
            t => t.name.trim().toLowerCase() !== taskName.trim().toLowerCase()
          )
        ];
      }
      sessionStorage.setItem('tasks', JSON.stringify(state.projectsTasks));
    }
  }
});

export const { addTask, updateTask, DeleteTask } = taskSlice.actions;
export default taskSlice.reducer;