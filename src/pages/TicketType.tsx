import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import type { Types, Events } from "../types";
import { useState, useEffect } from "react";
import { fetchEvents, createType } from '../services/api';
import TicketTypeDialog from "../components/TicketTypeDialog";


function TicketType() {
    const [events, setEvents] = useState<Events[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
            setModalMessage('Ticket type created successfully!');
            setShowModal(true);
        } catch (error) {
            console.error('Error saving ticket type:', error);
            setModalMessage('Error creating ticket type');
            setShowModal(true);
        }
    };

    return (
        <>
            <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', marginTop: '1rem', borderRadius: '8px', fontFamily: 'System-UI', outlineStyle: 'outset', outlineColor: 'white' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'black' }}>Click the button below to create a new ticket type</h3>

                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>
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

            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    <p>{modalMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)} variant="contained" color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default TicketType;