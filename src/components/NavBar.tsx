import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    Events
                </Button>
                <Button color="inherit" component={Link} to="/tickettype">
                    TicketType
                </Button>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;