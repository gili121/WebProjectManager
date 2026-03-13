import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const { name, password } = useSelector(state => state.login);
  const [newname, setNewname] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  const check = () => {
    if (newname === name && newpassword === password) {
      navigate('/ListProject');
    } else {
      setOpenError(true);
      setNewname('');
      setNewpassword('');
    }
  };

  const handleCloseError = () => setOpenError(false);

  const pageStyle = {
    position: "fixed",
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Nunito', 'Poppins', sans-serif"
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.96)",
    padding: "56px 48px",
    borderRadius: "28px",
    boxShadow: "0 24px 60px rgba(99,102,241,0.14), 0 6px 20px rgba(0,0,0,0.06)",
    textAlign: "center",
    width: "420px",
    border: "1px solid rgba(99,102,241,0.08)",
    backdropFilter: "blur(8px)"
  };

  const titleStyle = {
    fontSize: "30px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #1e293b, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "8px",
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "-0.3px"
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "28px",
    fontWeight: "500"
  };

  const buttonStyle = {
    padding: "13px 44px",
    fontSize: "15px",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #818cf8, #a5b4fc)",
    color: "#0f172a",
    fontWeight: "700",
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "0.03em",
    boxShadow: "0 8px 24px rgba(99,102,241,0.25)",
    transition: "all 0.25s ease"
  };

  return (
    <>
      <div style={pageStyle}>
        <div style={cardStyle}>
          <div style={titleStyle}>Login</div>
          <div style={subtitleStyle}>Enter your credentials to continue</div>
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' } }} noValidate autoComplete="off">
            <TextField
              value={newname}
              onChange={(e) => setNewname(e.target.value)}
              label="Username"
              variant="outlined"
            />
            <TextField
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              label="Password"
              type="password"
              variant="outlined"
            />
            <br />
            <Button
              onClick={check}
              style={buttonStyle}
              onMouseEnter={e => e.target.style.transform = "scale(1.07)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              Join Us
            </Button>
          </Box>
        </div>
      </div>

      {/* בשביל הפופאפ שגיאה*/}
      <Dialog open={openError} onClose={handleCloseError}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          username or password are incorrect. Please try again.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;