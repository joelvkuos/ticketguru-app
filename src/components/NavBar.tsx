import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
function Navbar() {
    return (
        <AppBar position="static" color="primary">
            <div style={{ fontFamily: 'system-ui' }}>
                <h1 style={{ paddingTop: '1rem', textAlign: 'center', color: 'inherit', textShadow: '3px 3px 3px black', textDecoration: 'underline' }}>T I C K E T G U R U</h1>
            </div>
            <Toolbar style={{ marginBottom: '1rem', justifyContent: 'center' }}>
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
                            color: 'blue'
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
                            color: 'blue'
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
                            color: 'blue'
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
                            color: 'inherit'
                        }
                    }}
                >
                    Sell Tickets
                </Button>
                <Button
                    variant="outlined"
                    color="inherit"
                    component={NavLink}
                    to="/tickets"
                    sx={{
                        "&:not(.active)": {
                            margin: '2px',
                            fontWeight: "bold",
                            color: 'inherit'
                        },
                        "&.active": {
                            margin: '2px',
                            fontWeight: "normal",
                            color: 'blue'
                        }
                    }}
                >
                    Tickets
                </Button>
            </Toolbar>

        </AppBar>
    );
}

export default Navbar;
