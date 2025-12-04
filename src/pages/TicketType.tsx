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
            <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', marginTop: '1rem', borderRadius: '8px', fontFamily: 'System-UI', backgroundColor: '#1976d2' }}>
                <h4 style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>Click the button below to create a new ticket type</h4>

                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh', backgroundColor: '#1976d2' }}>
                    <Button variant="contained" color="warning" onClick={handleCreateClick} style={{ height: '10vh' }}>
                        New Ticket Type
                    </Button>
                </div>
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
