import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import type { Types, Events } from '../types';

interface TicketTypeDialogProps {
    open: boolean;
    events: Events[];
    onClose: () => void;
    onSave: (ticketType: Partial<Types>) => void;
}

function TicketTypeDialog({ open, events, onClose, onSave }: TicketTypeDialogProps) {
    const [formData, setFormData] = useState({
        eventId: '',
        name: '',
        price: '',
        quantity: '',
    });

    useEffect(() => {
        if (!open) {
            setFormData({
                eventId: '',
                name: '',
                price: '',
                quantity: '',
            });
        }
    }, [open]);

    const handleSubmit = () => {
        const dataToSave = {
            eventId: parseInt(formData.eventId),
            name: formData.name,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
        };
        onSave(dataToSave);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create Ticket Type</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Event</InputLabel>
                    <Select
                        value={formData.eventId}
                        label="Event"
                        onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                    >
                        {events.map((event) => (
                            <MenuItem key={event.id} value={event.id}>
                                {event.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Ticket Type Name"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Adult, Child, VIP"
                />
                <TextField
                    margin="dense"
                    label="Price"
                    type="number"
                    fullWidth
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    inputProps={{ step: '0.01', min: '0' }}
                />
                <TextField
                    margin="dense"
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    inputProps={{ min: '0' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='error'>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="success">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TicketTypeDialog;