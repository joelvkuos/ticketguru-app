import { useEffect, useState } from 'react';
import { fetchTickets, updateTicket } from '../services/api';
import type { Tickets } from '../types';
import { Button, colors, TextField } from '@mui/material';

function Tickets() {

    const [ticket, setTickets] = useState<Tickets[]>([]);
    const [searchCode, setSearchCode] = useState('');



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
            // Refresh tickets
            const updatedTickets = await fetchTickets();
            setTickets(updatedTickets);
        }
    };


    const filteredTickets = searchCode.trim() !== ''
        ? ticket.filter(t => t.code.toLowerCase().includes(searchCode.toLowerCase()))
        : [];


    return (

        <>
            <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', marginTop: '1rem', borderRadius: '8px', fontFamily: 'System-UI', backgroundColor: '#1976d2' }}>
                <h3 style={{ textAlign: 'center', color: 'white', textShadow: '2px 2px 2px black' }}>Search ticket(s) by TicketCode</h3>

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
                            input: { color: 'white' },
                        }}
                    />
                </div>

                <div style={{ justifyItems: 'center' }}>
                    {filteredTickets.map(t => (
                        <div key={t.id} style={{ color: 'white' }}>
                            <p>Status: {t.used ? 'Used' : 'Not used!'}</p>
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
        </>

    );
}
export default Tickets;