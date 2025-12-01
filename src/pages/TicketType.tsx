import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { Events as EventType, Types as TicketTypeData } from '../types';
import { fetchEvents, createType, updateType } from '../services/api';
import { Button } from '@mui/material';
import TicketTypeDialog from '../components/TicketTypeDialog';


function TicketType() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTicket, setEditingTicket] = useState<TicketTypeData | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number>(0);


    useEffect(() => {
        fetchEvents()
            .then(data => {
                console.log('Events fetched:', data);
                setEvents(data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const handleCreateTickets = (eventId: number) => {
        setEditingTicket(null);
        setDialogOpen(true);
        setSelectedEventId(eventId);
    }

    const handleSave = async (ticketTypeData: Partial<TicketTypeData>) => {
        try {
            if (editingTicket) {
                await updateType(editingTicket.id, ticketTypeData);
            } else {
                await createType(ticketTypeData as Omit<TicketTypeData, 'id'>);
            }
            setDialogOpen(false);
            console.log('Ticket type saved successfully');
        } catch (error) {
            console.error('Error saving ticket type:', error);
        }
    };

    const columns = [
        { field: 'name', headerName: 'Event Name', width: 600 },
        {
            field: 'actions', headerName: 'Actions', width: 600, sortable: false, filterable: false, renderCell: (params: any) => (
                <>
                <Button size='small' onClick={() => handleCreateTickets(parseInt(params.row.id))}>Create ticket types</Button>
                </>
            )
        },
    ];

    return (
        <div style={{ height: 600, width: '100%', padding: '2rem' }}>
            <h1>Ticket Types</h1>
            <DataGrid
                rows={events}
                columns={columns}
                getRowId={(row) => row.id}
            />
            <TicketTypeDialog
                open={dialogOpen}
                ticketType={editingTicket}
                eventId={selectedEventId}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
            />
        </div>
    )
}

export default TicketType;