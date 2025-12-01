import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

function Navbar() {
    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/"
                    sx={{
                        "&.active": {
                            fontWeight: "bold",
                            color: 'black'
                        }
                    }}
                    end
                >
                    Events
                </Button>

                <Button
                    color="inherit"
                    component={NavLink}
                    to="/tickettype"
                    sx={{
                        "&.active": {
                            fontWeight: "bold",
                            color: 'black'
                        }
                    }}
                >
                    Types
                </Button>

                <Button
                    color="success"
                    variant="outlined"
                    component={NavLink}
                    to="/sales"
                    sx={{
                        "&.active": {
                            fontWeight: "bold",
                            color: 'success'
                        }
                    }}
                >
                    Sell Tickets
                </Button>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/tickets"
                    sx={{
                        "&.active": {
                            fontWeight: "bold",
                            color: 'black'
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
