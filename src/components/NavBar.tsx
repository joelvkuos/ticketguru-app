import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
function Navbar() {
    return (
        <AppBar position="relative" color="transparent">
            <div style={{ fontFamily: 'system-ui' }}>
                <h1 style={{ paddingTop: '1rem', textAlign: 'center', color: 'black' }}>T I C K E T G U R U</h1>
            </div>
            <Toolbar style={{ marginBottom: '1rem' }}>
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
            </Toolbar>

        </AppBar>
    );
}

export default Navbar;
