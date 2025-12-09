import { useEffect, useState } from 'react';
import { fetchTickets, updateTicket, fetchTypes, fetchEvents } from '../services/api';
import type { Tickets, Types, Events } from '../types';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function Tickets() {

    const [ticket, setTickets] = useState<Tickets[]>([]);
    const [ticketTypes, setTicketTypes] = useState<Types[]>([]);
    const [events, setEvents] = useState<Events[]>([]);
    const [searchCode, setSearchCode] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');



    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [ticketsData, typesData, eventsData] = await Promise.all([
                fetchTickets(),
                fetchTypes(),
                fetchEvents()
            ]);
            setTickets(ticketsData);
            setTicketTypes(typesData);
            setEvents(eventsData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };


    const handleMarkAsUsed = async (ticketId: number) => {
        const ticketToUpdate = ticket.find(t => t.id === ticketId);
        if (ticketToUpdate) {
            await updateTicket(ticketId, {
                ...ticketToUpdate,
                used: new Date().toISOString()
            });
            await loadData();

            setModalMessage('Ticket marked as used successfully!');
            setShowModal(true);
            setSearchCode('');
        }
    };


    const filteredTickets = searchCode.trim() !== ''
        ? ticket.filter(t => t.code.toLowerCase().includes(searchCode.toLowerCase()))
        : [];

    const soldTickets = ticket.filter(t => t.sold);

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Ticket Code', width: 220 },
        {
            field: 'eventName',
            headerName: 'Event Name',
            width: 200,
            valueGetter: (_value, row) => {
                const type = ticketTypes.find(t => t.id === row.ticketTypeId);
                const event = type ? events.find(e => String(e.id) === String(type.eventId)) : null;
                return event?.name || 'N/A';
            }
        },
        {
            field: 'eventTime',
            headerName: 'Date & Time',
            width: 180,
            valueGetter: (_value, row) => {
                const type = ticketTypes.find(t => t.id === row.ticketTypeId);
                const event = type ? events.find(e => String(e.id) === String(type.eventId)) : null;
                return event ? new Date(event.dateTime).toLocaleString() : 'N/A';
            }
        },
        {
            field: 'ticketType',
            headerName: 'Ticket Type',
            width: 150,
            valueGetter: (_value, row) => {
                const type = ticketTypes.find(t => t.id === row.ticketTypeId);
                return type?.name || 'N/A';
            }
        },
        {
            field: 'price',
            headerName: 'Price (€)',
            width: 100,
            valueGetter: (_value, row) => {
                const type = ticketTypes.find(t => t.id === row.ticketTypeId);
                return type ? `€${type.price}` : 'N/A';
            }
        },
        {
            field: 'used',
            headerName: 'Status',
            width: 100,
            valueGetter: (_value, row) => {
                return row.used ? 'Used' : 'Not used';
            }
        }
    ];


    return (

        <>
            <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', marginTop: '1rem', borderRadius: '8px', fontFamily: 'System-UI', outlineStyle: 'outset', outlineColor: 'white' }}>
                <h3 style={{ textAlign: 'center', color: 'black' }}>Search ticket(s) by Ticket Code</h3>

                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        type='text'
                        helperText=''
                        label='Enter Ticket Code'
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

            <div style={{ padding: '2rem', maxWidth: '930px', margin: '2rem auto' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'system-ui' }}>All Sold Tickets</h3>
                <DataGrid
                    rows={soldTickets}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                />
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