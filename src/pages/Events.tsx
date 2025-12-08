import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { Events as EventType } from '../types';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../services/api';
import { Button } from '@mui/material';
import EventDialog from '../components/EventDialog';
import { isAdmin } from '../services/authService';


function Events() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
    const userIsAdmin = isAdmin();


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

    const handleAddClick = () => {
        setEditingEvent(null);
        setDialogOpen(true);
    };

    const handleEditClick = (event: EventType) => {
        setEditingEvent(event);
        setDialogOpen(true);
    };

    const handleSave = async (eventData: Partial<EventType>) => {
        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, eventData as Omit<EventType, 'id'>);
            } else {
                await createEvent(eventData as Omit<EventType, 'id'>);
            }
            const data = await fetchEvents();
            setEvents(data);
            setDialogOpen(false);
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleDelete = async (eventId: string) => {
        if (window.confirm('Delete this event?')) {
            try {
                await deleteEvent(eventId);
                const data = await fetchEvents();
                setEvents(data);
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const columns = [
        { field: 'name', headerName: 'Event Name', width: 200 },
        { field: 'dateTime', headerName: 'Date and Time', width: 200 },
        { field: 'location', headerName: 'Location', width: 200 },
        { field: 'capacity', headerName: 'Capacity', width: 150 },
        ...(userIsAdmin ? [{
            field: 'actions', headerName: 'Actions', width: 200, sortable: false, filterable: false, renderCell: (params: any) => (
                <>
                    <Button size="small" onClick={() => handleEditClick(params.row)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => handleDelete(params.row.id)}>Delete</Button>
                </>
            )
        }] : []),
    ];

    return (
        <>

            <div>
                {userIsAdmin && (
                    <Button variant="contained" color='success' onClick={handleAddClick} style={{ marginTop: '1rem', marginBottom: '1rem', marginLeft: '1rem' }}>
                        Add Event
                    </Button>
                )}

                <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                    <DataGrid
                        rows={events}
                        columns={columns}
                        getRowId={(row) => row.name}
                    />
                </div>
                {userIsAdmin && (
                    <EventDialog
                        open={dialogOpen}
                        event={editingEvent}
                        onClose={() => setDialogOpen(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </>
    )
}

export default Events;