import { Button } from "@mui/material";
import type { Types, Events } from "../types";
import { useState, useEffect } from "react";
import { fetchEvents, createType } from '../services/api';
import TicketTypeDialog from "../components/TicketTypeDialog";


function TicketType() {
    const [events, setEvents] = useState<Events[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const eventsData = await fetchEvents();
            setEvents(eventsData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleCreateClick = () => {
        setDialogOpen(true);
    };

    const handleSave = async (ticketTypeData: Partial<Types>) => {
        try {
            await createType(ticketTypeData as Omit<Types, 'id'>);
            setDialogOpen(false);
            alert('Ticket type created successfully!');
        } catch (error) {
            console.error('Error saving ticket type:', error);
            alert('Error creating ticket type');
        }
    };

    return (
        <>
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <p style={{ fontFamily: "Arial" }}>Click the button below to create a new ticket type</p>
            </div>
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>
                <Button variant="contained" onClick={handleCreateClick} style={{ height: '10vh' }}>
                    Create a new Ticket Type
                </Button>
                <TicketTypeDialog
                    open={dialogOpen}
                    events={events}
                    onClose={() => setDialogOpen(false)}
                    onSave={handleSave}
                />
            </div>
        </>
    )

}

export default TicketType;
