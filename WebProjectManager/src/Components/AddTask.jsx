import { Box, TextField, MenuItem, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from "../Store/tasksSlice";
import { useForm, Controller } from "react-hook-form";

const AddTask = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = location.state?.project;
  const taskToEdit = location.state?.task;

  const allStatus = [
    { label: 'To Do', value: 'ToDo' },
    { label: 'In Progress', value: 'InProgress' },
    { label: 'Testing', value: 'Testing' },
    { label: 'Done', value: 'Done' },
  ];

  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ];

  const oneWeekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: taskToEdit?.name || '',
      description: taskToEdit?.description || '',
      status: taskToEdit?.status || 'ToDo',
      priority: taskToEdit?.priority || 'Medium',
      endDate: taskToEdit?.endDate || oneWeekFromNow,
    }
  });

  const onSubmit = (taskData) => {
    if (!project) return;

    if (taskToEdit) {
      dispatch(updateTask({
        projectName: project.name,
        taskName: taskToEdit.name,
        newTaskData: taskData
      }));
    } else {
      dispatch(addTask({ projectName: project.name, task: taskData }));
    }

    navigate('/MyProjects', { state: { project } });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        width: 420,
        margin: 'auto',
        mt: 7,
        p: 5,
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(99,102,241,0.12)',
        border: '1px solid rgba(99,102,241,0.08)'
      }}
    >
      {/* משימה חדשה או עדכון של משימה*/}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Task name is required" }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Task Name"
            error={!!error}
            helperText={error?.message}
            fullWidth
          />
        )}
      />

      {/* תיאור של המשימה- חובה */}
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Description"
            multiline
            rows={4}
            error={!!error}
            helperText={error?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField select label="Status" {...field} fullWidth>
            {allStatus.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <TextField select label="Priority" {...field} fullWidth>
            {priorityOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="endDate"
        control={control}
        render={({ field }) => (
          <TextField
            label="Due Date"
            type="date"
            {...field}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {taskToEdit ? "Update Task" : "Save Task"}
      </Button>
    </Box>
  );
};

export default AddTask;