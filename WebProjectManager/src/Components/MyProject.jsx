import { Typography, Box, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../Store/projectsSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { DeleteTask } from '../Store/tasksSlice';
import HomeIcon from '@mui/icons-material/Home';


const MyProjects = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const project = location.state?.project;
    const tasks = useSelector(state => state.tasks.projectsTasks[project.name] || []);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleOpenDeleteDialog = (task) => {
        setTaskToDelete(task);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setTaskToDelete(null);
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = () => {
        if (taskToDelete) {
            dispatch(DeleteTask({ projectName: project.name, taskName: taskToDelete.name }));
            console.log('Deleted task:', taskToDelete.name);
        }
        handleCloseDeleteDialog();
    };

    const goToHome = () => {
        navigate('/home');
    }

    const AllStatus = [
        { title: "ToDo", status: "ToDo" },
        { title: "InProgress", status: "InProgress" },
        { title: "Testing", status: "Testing" },
        { title: "Done", status: "Done" },
    ];

    if (!project) {
        return <Typography>לא נבחר פרויקט</Typography>;
    }

    const currentProject = () => {
        setShowAlert(true);
    };

    const reverse = () => {
        setShowAlert(false);
    };

    const deleteCurrentProject = () => {
        dispatch(deleteProject(project.name));
        console.log("Delete project:", project.name);
        navigate('/ListProject');
    };

    const editProject = () => {
        navigate('/AddProject', { state: { project } });
    }

    const goToTask = () => {
        navigate('/AddTask', { state: { project } });
    }

    const handleEditTask = (task) => {
        navigate('/AddTask', { state: { project, task } });
    };

    return (
        <Box sx={{ padding: '40px', minHeight: '100vh' }}>

            {showAlert && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 9999,
                        bgcolor: '#ffffff',
                        border: '1px solid #cccccc',
                        borderRadius: 2,
                        p: 3,
                        boxShadow: 4,
                        minWidth: 320,
                        textAlign: 'center',
                        animation: 'fadeIn 0.3s ease-out',
                    }}
                >
                    <Typography sx={{ mb: 2 }}>?האם אתה בטוח שברצונך למחוק את הפרויקט </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button size="small" variant="outlined" onClick={reverse}>לא</Button>
                        <Button size="small" variant="contained" color="error" onClick={deleteCurrentProject}>כן</Button>
                    </Stack>

                    {/* אנימציה */}
                    <style>
                        {`
                     @keyframes fadeIn {
                     0% { opacity: 0; transform: translate(-50%, -60%); }
                     100% { opacity: 1; transform: translate(-50%, -50%); }
                     } `
                    }
                    </style>
                </Box>
            )}
            {/*כפתור  חזרה לדף הבית*/}
            <Button
                onClick={goToHome}
                startIcon={<HomeIcon />}
                sx={{
                    position: "absolute",
                    top: "35px",
                    right: "35px",
                    padding: "8px 18px",
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#4f46e5",
                    "&:hover": {
                    background: "rgba(99,102,241,0.08)"
                    }
                }}
            >
                HomePage
            </Button>

            {/* כותרת הפרויקט */}
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
                NameProject: {project.name}
            </Typography>

            {/* כפתורים למעלה */}
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    position: 'absolute',
                    top: 50,
                    left: 80,
                    alignItems: 'center'
                }}
            >
                <Button
                    onClick={currentProject}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    sx={{
                        fontSize: '12px',
                        padding: '2px 8px',
                        textTransform: 'none'
                    }}
                >
                    Delete
                </Button>

                <Button
                    onClick={editProject}
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{
                        fontSize: '12px',
                        padding: '2px 20px',
                        textTransform: 'none'
                    }}
                >
                    Edit
                </Button>
            </Stack>

            {/* הריבועים */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '30px',
                    justifyContent: 'center'
                }}
            >
                <Paper
                    sx={{
                        width: '280px',
                        minHeight: '480px', height: 'auto',
                        background: 'rgba(255,255,255,0.92)',
                        border: '1.5px solid rgba(99,102,241,0.12)',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.07)',
                        position: 'relative',
                        backdropFilter: 'blur(6px)'
                    }}
                >
                    <Typography
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '20px'
                        }}
                    >
                        {AllStatus[0].title}
                    </Typography>

                    <button onClick={goToTask}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            padding: '5px 10px',
                            fontSize: '12px'
                        }}
                    >
                        +
                    </button>

                    {/* הצגת המשימות של סטטוס זה */}
                    <Box sx={{ marginTop: '50px', padding: 1 }}>
                        {tasks
                            .filter(task => task.status === AllStatus[0].status)
                            .map((task, index) => (
                                <Box key={index} sx={{ border: '1.5px solid rgba(99,102,241,0.10)', p: 1.5, m: 1, borderRadius: '12px', background: '#fff', boxShadow: '0 2px 8px rgba(99,102,241,0.06)', transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 4px 16px rgba(99,102,241,0.12)', transform: 'translateY(-1px)' } }}>

                                    {/* תאריך של המשימה */}
                                    <Box sx={{ fontSize: '0.75rem', color: 'gray', textAlign: 'right', mb: 0.5 }}>
                                        {task.endDate}
                                    </Box>

                                    <strong>{task.name}</strong><br />
                                    {task.description}<br />
                                    priority: {task.priority}
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                            mt: 1
                                        }}
                                    >
                                        {/* כפתורים של מחיקה ועריכה לכל משימה */}
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleOpenDeleteDialog(task)}
                                            sx={{ width: 36, height: 36, borderRadius: '10px', border: '1.5px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', color: '#6366f1', '&:hover': { background: 'rgba(99,102,241,0.16)', borderColor: '#6366f1' } }}
                                        >
                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                        </IconButton>

                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => handleEditTask(task)}
                                            sx={{ width: 36, height: 36, borderRadius: '10px', border: '1.5px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', color: '#6366f1', '&:hover': { background: 'rgba(99,102,241,0.16)', borderColor: '#6366f1' } }}
                                        >
                                            <EditIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            ))
                        }
                    </Box>
                </Paper>

                <Paper
                    sx={{
                        width: '280px',
                        minHeight: '480px', height: 'auto',
                        background: 'rgba(255,255,255,0.92)',
                        border: '1.5px solid rgba(99,102,241,0.12)',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.07)',
                        position: 'relative',
                        backdropFilter: 'blur(6px)'
                    }}
                >
                    <Typography
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '20px'
                        }}
                    >
                        {AllStatus[1].title}
                    </Typography>

                    <button onClick={goToTask}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            padding: '5px 10px',
                            fontSize: '12px'
                        }}
                    >
                        +
                    </button>

                    {/* הצגת המשימות של סטטוס זה */}
                    <Box sx={{ marginTop: '50px', padding: 1 }}>
                        {tasks
                            .filter(task => task.status === AllStatus[1].status)
                            .map((task, index) => (
                                <Box key={index} sx={{ border: '1.5px solid rgba(99,102,241,0.10)', p: 1.5, m: 1, borderRadius: '12px', background: '#fff', boxShadow: '0 2px 8px rgba(99,102,241,0.06)', transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 4px 16px rgba(99,102,241,0.12)', transform: 'translateY(-1px)' } }}>

                                    {/* תאריך של המשימה */}
                                    <Box sx={{ fontSize: '0.75rem', color: 'gray', textAlign: 'right', mb: 0.5 }}>
                                        {task.endDate}
                                    </Box>

                                    <strong>{task.name}</strong><br />
                                    {task.description}<br />
                                    priority: {task.priority}
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                            mt: 1
                                        }}
                                    >
                                        {/* כפתורים של מחיקה ועריכה לכל משימה */}
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleOpenDeleteDialog(task)}
                                            sx={{ width: 36, height: 36, borderRadius: '10px', border: '1.5px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', color: '#6366f1', '&:hover': { background: 'rgba(99,102,241,0.16)', borderColor: '#6366f1' } }}
                                        >
                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                        </IconButton>

                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => handleEditTask(task)}
                                            sx={{ width: 36, height: 36, borderRadius: '10px', border: '1.5px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', color: '#6366f1', '&:hover': { background: 'rgba(99,102,241,0.16)', borderColor: '#6366f1' } }}
                                        >
                                            <EditIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            ))
                        }
                    </Box>
                </Paper>

                <Paper
                    sx={{
                        width: '280px',
                        minHeight: '480px', height: 'auto',
                        background: 'rgba(255,255,255,0.92)',
                        border: '1.5px solid rgba(99,102,241,0.12)',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.07)',
                        position: 'relative',
                        backdropFilter: 'blur(6px)'
                    }}
                >
                    <Typography
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '20px'
                        }}
                    >
                        {AllStatus[2].title}
                    </Typography>

                    <button onClick={goToTask}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            padding: '5px 10px',
                            fontSize: '12px'
                        }}
                    >
                        +
                    </button>

                    {/* הצגת המשימות של סטטוס זה */}
                    <Box sx={{ marginTop: '50px', padding: 1 }}>
                        {tasks
                            .filter(task => task.status === AllStatus[2].status)
                            .map((task, index) => (
                                <Box key={index} sx={{ border: '1.5px solid rgba(99,102,241,0.10)', p: 1.5, m: 1, borderRadius: '12px', background: '#fff', boxShadow: '0 2px 8px rgba(99,102,241,0.06)', transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 4px 16px rgba(99,102,241,0.12)', transform: 'translateY(-1px)' } }}>

                                    {/* תאריך של המשימה */}
                                    <Box sx={{ fontSize: '0.75rem', color: 'gray', textAlign: 'right', mb: 0.5 }}>
                                        {task.endDate}
                                    </Box>

                                    <strong>{task.name}</strong><br />
                                    {task.description}<br />
                                    priority: {task.priority}
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                            mt: 1
                                        }}
                                    >
                                        {/* כפתורים של מחיקה ועריכה לכל משימה */}
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleOpenDeleteDialog(task)}
                                            sx={{ width: 36, height: 36, borderRadius: '10px', border: '1.5px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', color: '#6366f1', '&:hover': { background: 'rgba(99,102,241,0.16)', borderColor: '#6366f1' } }}
                                        >
                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                        </IconButton>

                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => handleEditTask(task)}
                                            sx={{ width: 36, height: 36, borderRadius: '10px', border: '1.5px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', color: '#6366f1', '&:hover': { background: 'rgba(99,102,241,0.16)', borderColor: '#6366f1' } }}
                                        >
                                            <EditIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            ))
                        }
                    </Box>
                </Paper>

                <Paper
                    sx={{
                        width: '280px',
                        minHeight: '480px', height: 'auto',
                        background: 'rgba(255,255,255,0.92)',
                        border: '1.5px solid rgba(99,102,241,0.12)',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.07)',
                        position: 'relative',
                        backdropFilter: 'blur(6px)'
                    }}
                >
                    <Typography
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            right: '20px'
                        }}
                    >
                        {AllStatus[3].title}
                    </Typography>

                    <button onClick={goToTask}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            padding: '5px 10px',
                            fontSize: '12px'
                        }}
                    >
                        +
                    </button>

                    {/* הצגת המשימות של סטטוס זה */}
                    <Box sx={{ marginTop: '50px', padding: 1 }}>
                        {tasks
                            .filter(task => task.status === AllStatus[3].status)
                            .map((task, index) => (
                                <Box key={task.name} sx={{ border: '1.5px solid rgba(99,102,241,0.10)', p: 1.5, m: 1, borderRadius: '12px', background: '#fff', boxShadow: '0 2px 8px rgba(99,102,241,0.06)', transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 4px 16px rgba(99,102,241,0.12)', transform: 'translateY(-1px)' } }}>
                                    {/* תאריך של המשימה */}
                                    <Box sx={{ fontSize: '0.75rem', color: 'gray', textAlign: 'right', mb: 0.5 }}>
                                        {task.endDate}
                                    </Box>

                                    <strong>{task.name}</strong><br />
                                    {task.description}<br />
                                    priority: {task.priority}
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                            mt: 1
                                        }}
                                    >
                                        {/* כפתורים של מחיקה ועריכה לכל משימה */}
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleOpenDeleteDialog(task)}
                                            sx={{ width: 36, height: 36, borderRadius: '10px', border: '1.5px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', color: '#6366f1', '&:hover': { background: 'rgba(99,102,241,0.16)', borderColor: '#6366f1' } }}
                                        >
                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                        </IconButton>

                                        <IconButton
                                            aria-label="edit"
                                            onClick={() => handleEditTask(task)}
                                            sx={{ width: 36, height: 36, borderRadius: '10px', border: '1.5px solid rgba(99,102,241,0.25)', background: 'rgba(99,102,241,0.07)', color: '#6366f1', '&:hover': { background: 'rgba(99,102,241,0.16)', borderColor: '#6366f1' } }}
                                        >
                                            <EditIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            ))
                        }
                    </Box>
                </Paper>

                {/* Dialog למחיקת משימה */}
                {openDeleteDialog && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 9999,
                            bgcolor: '#ffffff',
                            border: '1px solid #cccccc',
                            borderRadius: 2,
                            p: 3,
                            boxShadow: 4,
                            minWidth: 320,
                            textAlign: 'center',
                            animation: 'fadeIn 0.3s ease-out',
                        }}
                    >
                        {/* הכיתוב של השאלה */}
                        <Typography sx={{ mb: 2 }}>?האם אתה בטוח שברצונך למחוק את המשימה</Typography>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button size="small" variant="outlined" onClick={handleCloseDeleteDialog}>לא</Button>
                            <Button size="small" variant="contained" color="error" onClick={handleConfirmDelete}>כן</Button>
                        </Stack>

                        {/* אנימציה */}
                        <style>
                            
                            {`
                             @keyframes fadeIn {
                             0% { opacity: 0; transform: translate(-50%, -60%); }
                             100% { opacity: 1; transform: translate(-50%, -50%); }
                             }`
                            }

                        </style>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default MyProjects;







