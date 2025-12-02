import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import type { Tickets as TicketType, Types } from '../types';
import { fetchTickets, updateTicket, fetchTypes } from '../services/api';
import { Button, Chip } from '@mui/material';

function Tickets() {
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [ticketTypes, setTicketTypes] = useState<Types[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [ticketsData, typesData] = await Promise.all([
                fetchTickets(),
                fetchTypes()
            ]);
            setTickets(ticketsData);
            setTicketTypes(typesData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const loadTickets = async () => {
        try {
            const data = await fetchTickets();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const handleMarkAsUsed = async (ticketId: number) => {
        if (window.confirm('Mark this ticket as used?')) {
            try {
                const ticket = tickets.find(t => t.id === ticketId);
                if (ticket) {
                    await updateTicket(ticketId, {
                        ...ticket,
                        used: new Date().toISOString()
                    });
                    await loadTickets();
                }
            } catch (error) {
                console.error('Error updating ticket:', error);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'code', headerName: 'Ticket Code', width: 200 },
        {
            field: 'ticketTypeId',
            headerName: 'Ticket Type',
            width: 180,
            renderCell: (params) => {
                const type = ticketTypes.find(t => t.id === params.row.ticketTypeId);
                return type ? `${type.name} (€${type.price})` : `Type ID: ${params.row.ticketTypeId}`;
            }
        },
        {
            field: 'sold',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.row.sold ? 'Sold' : 'Available'}
                    color={params.row.sold ? 'success' : 'default'}
                    size="small"
                />
            ),
        },
        {
            field: 'used',
            headerName: 'Used',
            width: 180,
            renderCell: (params) => (
                params.row.used ? new Date(params.row.used).toLocaleString() : '-'
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    size="small"
                    variant="contained"
                    disabled={!!params.row.used}
                    onClick={() => handleMarkAsUsed(params.row.id)}
                >
                    {params.row.used ? 'Used' : 'Mark as Used'}
                </Button>
            ),
        },
    ];



    return (
        <>
            <div style={{ height: 600, width: '100%', padding: '1rem' }}>
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={tickets}
                        columns={columns}
                        getRowId={(row) => row.id}
                    />
                </div>
            </div>
        </>
    );
}

export default Tickets;