import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const path = () => {
        navigate('/Login');
    }

    const pageStyle = {
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Nunito', 'Poppins', sans-serif",
    };

    const headerStyle = {
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(99,102,241,0.10)",
        boxShadow: "0 2px 20px rgba(99,102,241,0.07)"
    };

    const logoStyle = {
        fontSize: "24px",
        fontWeight: "800",
        background: "linear-gradient(135deg, #6366f1, #06b6d4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "0.5px",
        fontFamily: "'Poppins', sans-serif"
    };

    const centerStyle = {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    const cardStyle = {
        background: "rgba(255,255,255,0.95)",
        padding: "64px 60px",
        borderRadius: "28px",
        boxShadow: "0 24px 60px rgba(99,102,241,0.13), 0 6px 20px rgba(0,0,0,0.06)",
        textAlign: "center",
        width: "460px",
        border: "1px solid rgba(99,102,241,0.08)",
        backdropFilter: "blur(8px)"
    };

    const titleStyle = {
        fontSize: "38px",
        background: "linear-gradient(135deg, #1e293b 0%, #6366f1 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "12px",
        fontWeight: "900",
        fontFamily: "'Nunito', 'Varela Round', sans-serif",
        letterSpacing: "-0.5px"
    };

    const subtitleStyle = {
        fontSize: "16px",
        color: "#64748b",
        marginBottom: "40px",
        fontWeight: "600",
        lineHeight: "1.7",
        fontFamily: "'Nunito', 'Varela Round', sans-serif"
    };

    const buttonStyle = {
        padding: "14px 48px",
        fontSize: "16px",
        borderRadius: "50px",
        border: "none",
        cursor: "pointer",
        background: "linear-gradient(135deg, #6366f1, #818cf8)",
        color: "white",
        fontWeight: "700",
        fontFamily: "'Nunito', sans-serif",
        letterSpacing: "0.03em",
        boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
        transition: "all 0.25s ease"
    };

    return (
        <div style={pageStyle}>

            <div style={headerStyle}>
                <div style={logoStyle}>ProManage</div>
            </div>

            <div style={centerStyle}>
                <div style={cardStyle}>

                    <div style={titleStyle}>
                        Project Management
                    </div>

                    <div style={subtitleStyle}>
                        Manage your projects, tasks and team in one simple system
                    </div>

                    <button
                        onClick={path}
                        style={buttonStyle}
                        onMouseEnter={e => {
                            e.target.style.transform = "scale(1.08)";
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = "scale(1)";
                        }}
                    >
                        Get Started
                    </button>

                </div>
            </div>

        </div>
    )
}

export default Home