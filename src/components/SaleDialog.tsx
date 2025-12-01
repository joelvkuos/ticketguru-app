import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import type { Events, Types } from '../types';
import { fetchEvents, fetchTypes, createTicket, createSale } from '../services/api';

interface SaleDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
}

function SaleDialog({ open, onClose, onSave }: SaleDialogProps) {
    const [events, setEvents] = useState<Events[]>([]);
    const [ticketTypes, setTicketTypes] = useState<Types[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | ''>('');
    const [selectedTypeId, setSelectedTypeId] = useState<number | ''>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [customerId, setCustomerId] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            loadEvents();
        }
    }, [open]);

    useEffect(() => {
        if (selectedEventId) {
            loadTicketTypes();
        } else {
            setTicketTypes([]);
            setSelectedTypeId('');
        }
    }, [selectedEventId]);

    const loadEvents = async () => {
        try {
            const data = await fetchEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error loading events:', error);
        }
    };

    const loadTicketTypes = async () => {
        try {
            const allTypes = await fetchTypes();
            const filtered = allTypes.filter(type => type.eventId === selectedEventId);
            setTicketTypes(filtered);
        } catch (error) {
            console.error('Error loading ticket types:', error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedEventId || !selectedTypeId || quantity < 1) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);
        try {
            const selectedType = ticketTypes.find(t => t.id === selectedTypeId);
            if (!selectedType) {
                alert('Selected ticket type not found');
                return;
            }

            const totalPrice = selectedType.price * quantity;
            const customerIdNumber = customerId ? parseInt(customerId) : null;

            for (let i = 0; i < quantity; i++) {
                const ticketCode = `TICKET-${Date.now()}-${i}`;
                const ticket = await createTicket({
                    ticketTypeId: selectedTypeId as number,
                    code: ticketCode,
                    sold: true,
                    used: null
                });

                await createSale({
                    ticketId: ticket.id,
                    eventId: selectedEventId as number,
                    customerId: customerIdNumber,
                    sellerId: 1, // TODO: Get from logged in user
                    saleDate: new Date().toISOString(),
                    price: selectedType.price
                });
            }

            alert(`Successfully sold ${quantity} ticket(s) for €${totalPrice.toFixed(2)}`);
            handleClose();
            onSave();
        } catch (error) {
            console.error('Error creating sale:', error);
            alert('Error creating sale');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedEventId('');
        setSelectedTypeId('');
        setQuantity(1);
        setCustomerId('');
        setTicketTypes([]);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>New Sale</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Event</InputLabel>
                    <Select
                        value={selectedEventId}
                        onChange={(e) => setSelectedEventId(e.target.value as number)}
                        label="Event"
                    >
                        {events.map((event) => (
                            <MenuItem key={event.id} value={event.id}>
                                {event.name} - {new Date(event.dateTime).toLocaleDateString()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" disabled={!selectedEventId}>
                    <InputLabel>Ticket Type</InputLabel>
                    <Select
                        value={selectedTypeId}
                        onChange={(e) => setSelectedTypeId(e.target.value as number)}
                        label="Ticket Type"
                    >
                        {ticketTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                                {type.name} - €{type.price}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    inputProps={{ min: 1 }}
                />

                {selectedTypeId && quantity > 0 && (
                    <div style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        Total: €{(ticketTypes.find(t => t.id === selectedTypeId)?.price || 0) * quantity}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                <Button onClick={handleSubmit} variant="outlined" color='success' disabled={loading}>
                    {loading ? 'Processing...' : 'Complete Sale'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SaleDialog;
