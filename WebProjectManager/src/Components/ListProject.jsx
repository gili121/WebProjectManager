import { useSelector } from 'react-redux';
import { Box, Paper, Typography, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ListProject = () => {

  const projects = useSelector(state => state.projects.AllProjects);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const nextPage = () => {
    navigate('/AddProject');
  }

  const goToHome = () => {
    navigate('/home');
  }

  const goToMyProject = (project) => {
    navigate('/MyProjects', { state: { project } });
  }

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        position: "relative"
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          marginTop: '90px',
          marginBottom: '5px',
          fontFamily: "'Poppins', sans-serif",
          background: "linear-gradient(135deg, #6366f1 30%, #a5b4fc 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textTransform: 'capitalize'
        }}
      >
        My Projects
      </Typography>

      <Button
        onClick={goToHome}
        sx={{
          position: "absolute",
          top: "50px",
          right: "90px",
          padding: "10px 40px",
          minWidth: "0px",
          minHeight: "0px",
          background: "rgba(220,220,250,0.2)",
          borderRadius: "10px",
          border: "2px solid #a5b4fc",
        }}
      >
        <Box
          sx={{
            fontSize: "18px",
            fontWeight: 800,
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.3,
            background: "linear-gradient(135deg, #3b82f6, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "none",
            cursor: "pointer",
          }}
        >
          homePage
        </Box>
      </Button>

      {/* חיפוש לפי פרויקט */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3, paddingTop: 12 }}>
        <TextField
          label="Search Project"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* הוספת פרויקט */}
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <Button
          variant="contained"
          onClick={nextPage}
          sx={{ borderRadius: "12px", textTransform: "none" }}
        >
          Add Project
        </Button>
      </Box>

      {/* רשימת פרויקטים */}
      {filteredProjects.length === 0 ? (
        <Typography align="center" variant="h6" sx={{ color: "text.secondary" }}>
          No projects available
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
            paddingBottom: 4
          }}
        >
          {filteredProjects.map(project => (
            <Paper
              key={project.name}
              sx={{
                width: "300px",
                minHeight: "220px",
                background: "rgba(255,255,255,0.95)",
                border: "1.5px solid rgba(99,102,241,0.12)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: 3,
                boxShadow: "0 4px 20px rgba(99,102,241,0.08)",
                transition: "all 0.25s ease",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0 12px 36px rgba(99,102,241,0.16)",
                  transform: "translateY(-4px)",
                  borderColor: "rgba(99,102,241,0.3)"
                }
              }}
            >
              <Typography variant="h6" fontWeight="bold">{project.name}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                {project.description}
              </Typography>
              <Typography variant="caption" sx={{ mt: 1 }}>{project.date}</Typography>

              <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => goToMyProject(project)}
                  sx={{ borderRadius: "10px", textTransform: "none" }}
                >
                  Open Project
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ListProject;