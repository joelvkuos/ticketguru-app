import { useEffect, useState } from 'react';
import { fetchTickets, updateTicket } from '../services/api';
import type { Tickets } from '../types';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function Tickets() {

    const [ticket, setTickets] = useState<Tickets[]>([]);
    const [searchCode, setSearchCode] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    useEffect(() => {
        fetchTickets()
            .then(data => {
                console.log('Tickets fetched:', data);
                setTickets(data);
            })

    }, []);


    const handleMarkAsUsed = async (ticketId: number) => {
        const ticketToUpdate = ticket.find(t => t.id === ticketId);
        if (ticketToUpdate) {
            await updateTicket(ticketId, {
                ...ticketToUpdate,
                used: new Date().toISOString()
            });
            const updatedTickets = await fetchTickets();
            setTickets(updatedTickets);

            setModalMessage('Ticket marked as used successfully!');
            setShowModal(true);
            setSearchCode('');
        }
    };


    const filteredTickets = searchCode.trim() !== ''
        ? ticket.filter(t => t.code.toLowerCase().includes(searchCode.toLowerCase()))
        : [];


    return (

        <>
            <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', marginTop: '1rem', borderRadius: '8px', fontFamily: 'System-UI', outlineStyle: 'outset', outlineColor: 'white' }}>
                <h3 style={{ textAlign: 'center', color: 'black' }}>Search ticket(s) by TicketCode</h3>

                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        type='text'
                        helperText=''
                        label='Enter TicketCode'
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value)}
                        color='warning'
                        sx={{
                            width: '250px',
                            input: { color: 'black' },
                        }}
                    />
                </div>

                <div style={{ justifyItems: 'center' }}>
                    {filteredTickets.map(t => (
                        <div key={t.id} style={{ color: 'white' }}>
                            <p style={{ color: 'black' }}>Status: {t.used ? 'Used' : 'Not used!'}</p>
                            {!t.used && (
                                <Button
                                    onClick={() => handleMarkAsUsed(t.id)}
                                    variant='contained'
                                    color='success'>
                                    Mark as Used
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>Success</DialogTitle>
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

    );
}
export default Tickets;