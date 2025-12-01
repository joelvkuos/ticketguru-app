import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { Types as TicketType } from '../types';

interface TicketTypeDialogProps {
    open: boolean;
    ticketType: TicketType | null;
    eventId: number;
    onClose: () => void;
    onSave: (ticketType: Partial<TicketType>) => void;
}

function TicketTypeDialog({ open, ticketType, eventId, onClose, onSave }: TicketTypeDialogProps) {
    const [formData, setFormData] = useState({
        eventId: 0,
        name: '',
        price: 0,
        quantity: 0,
    });

    useEffect(() => {
        if (ticketType) {
            setFormData({
                eventId: ticketType.eventId,
                name: ticketType.name,
                price: ticketType.price,
                quantity: ticketType.quantity,
            });
        } else {
            setFormData({
                eventId: eventId,
                name: '',
                price: 0,
                quantity: 0,
            });
        }
    }, [ticketType, open, eventId]);

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{ticketType ? 'Edit Ticket Type' : 'Add Ticket Type'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Ticket Type Name"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    type="number"
                    fullWidth
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
                <TextField
                    margin="dense"
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default TicketTypeDialog;
