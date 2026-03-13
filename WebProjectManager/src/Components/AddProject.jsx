// AddProject.jsx
import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addProject, updateProject } from '../Store/projectsSlice';

const AddProject = () => {

    const today = new Date().toISOString().split('T')[0];
    const location = useLocation();
    const project = location.state?.project;

    const [projectName, setProjectName] = useState(project?.name || '');
    const [projectDescription, setProjectDescription] = useState(project?.description || '');
    const [projectDate, setProjectDate] = useState(today);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [duplicateError, setDuplicateError] = useState(false);

    const projects = useSelector(state => state.projects.AllProjects);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveProject = (e, isUpdate) => {
        e.preventDefault();
        setNameError(false);
        setDescriptionError(false);
        setDuplicateError(false);

        let hasError = false;
        if (!projectName.trim()) { setNameError(true); hasError = true; }
        if (!projectDescription.trim()) { setDescriptionError(true); hasError = true; }
        if (hasError) return;

        const projectExists = projects.some(p =>
            p.name.toLowerCase() === projectName.toLowerCase() &&
            p.name !== project?.name
        );
        if (projectExists) { setDuplicateError(true); return; }

        if (isUpdate) {
            dispatch(updateProject({
                originalName: project.name,
                name: projectName,
                description: projectDescription,
                date: projectDate
            }));
        } else {
            dispatch(addProject({
                name: projectName,
                description: projectDescription,
                date: projectDate
            }));
        }

        navigate('/ListProject');
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2
            }}
        >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5,
                    width: 380,
                    p: 5,
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.08)'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Project Name"
                    variant="outlined"
                    value={projectName}
                    onChange={(e) => { setProjectName(e.target.value); setDuplicateError(false); }}
                    error={nameError || duplicateError}
                    helperText={
                        nameError
                            ? "Project name is required"
                            : duplicateError
                                ? "A project with this name already exists"
                                : ""
                    }
                    fullWidth
                />

                <TextField
                    label="Project Description"
                    variant="outlined"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    multiline
                    rows={4}
                    error={descriptionError}
                    helperText={descriptionError ? "Description is required" : ""}
                    fullWidth
                />

                {project ? (
                    <Button variant="contained" onClick={(e) => saveProject(e, true)}>
                        Save Changes
                    </Button>
                ) : (
                    <Button variant="contained" onClick={(e) => saveProject(e, false)}>
                        Add Project
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default AddProject;