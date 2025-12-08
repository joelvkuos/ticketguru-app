import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout, isAuthenticated, isAdmin, getCurrentUser } from '../services/authService';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = isAuthenticated();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="relative" color="transparent">
            <div style={{ fontFamily: 'system-ui' }}>
                <h1 style={{ paddingTop: '1rem', textAlign: 'center', color: 'black' }}>T I C K E T G U R U</h1>
            </div>
            <Toolbar style={{ marginBottom: '1rem' }}>
                {isLoggedIn && (
                    <>
                        <Button
                            variant="outlined"
                            color="inherit"
                            component={NavLink}
                            to="/"
                            sx={{
                                "&:not(.active)": {
                                    margin: '2px',
                                    fontWeight: "bold",
                                    color: 'inherit'
                                },
                                "&.active": {
                                    margin: '2px',
                                    fontWeight: "normal",
                                    color: 'black'
                                }
                            }}
                            end
                            endIcon={<InfoOutlinedIcon />}
                        >
                            Info
                        </Button>

                        <Button
                            variant="outlined"
                            color="inherit"
                            component={NavLink}
                            to="/events"
                            sx={{
                                "&:not(.active)": {
                                    margin: '2px',
                                    fontWeight: "bold",
                                    color: 'inherit'
                                },
                                "&.active": {
                                    margin: '2px',
                                    fontWeight: "normal",
                                    color: 'black'
                                }
                            }}
                        >
                            Events
                        </Button>

                        <Button
                            variant="outlined"

                            color="inherit"
                            component={NavLink}
                            to="/tickettype"
                            sx={{
                                "&:not(.active)": {
                                    margin: '2px',
                                    fontWeight: "bold",
                                    color: 'inherit'
                                },
                                "&.active": {
                                    margin: '2px',
                                    fontWeight: "normal",
                                    color: 'black'
                                }
                            }}
                        >
                            Types
                        </Button>

                        <Button
                            color="success"
                            variant="contained"
                            component={NavLink}
                            to="/sales"
                            sx={{
                                "&:not(.active)": {
                                    margin: '2px',
                                    fontWeight: 'bold'
                                },
                                "&.active": {
                                    margin: '2px',
                                    fontWeight: "normal",
                                    color: 'black'
                                }
                            }}
                        >
                            Sell Tickets
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            component={NavLink}
                            to="/tickets"
                            sx={{
                                "&:not(.active)": {
                                    margin: '2px',
                                    fontWeight: "bold",
                                },
                                "&.active": {
                                    margin: '2px',
                                    fontWeight: "normal",
                                    color: 'black'
                                }
                            }}
                        >
                            Check tickets
                        </Button>

                        <Box sx={{ flexGrow: 1 }} />
                        
                        {user && (
                            <Box sx={{ mr: 2, color: 'black' }}>
                                {user.username} ({user.role})
                            </Box>
                        )}

                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={handleLogout}
                            startIcon={<LogoutIcon />}
                            sx={{
                                margin: '2px',
                                fontWeight: "bold",
                            }}
                        >
                            Kirjaudu ulos
                        </Button>
                    </>
                )}
            </Toolbar>

        </AppBar>
    );
}

export default Navbar;
