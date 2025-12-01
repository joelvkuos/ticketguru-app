import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { Events as EventType } from '../types';

interface EventDialogProps {
    open: boolean;
    event: EventType | null;
    onClose: () => void;
    onSave: (event: Partial<EventType>) => void;
}

function EventDialog({ open, event, onClose, onSave }: EventDialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        dateTime: '',
        location: '',
        capacity: '',
    });

    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name,
                dateTime: event.dateTime,
                location: event.location,
                capacity: event.capacity,
            });
        } else {
            setFormData({
                name: '',
                dateTime: '',
                location: '',
                capacity: '',
            });
        }
    }, [event, open]);

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Event Name"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Date and Time"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Location"
                    fullWidth
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <TextField
                    margin="dense"
                    label="Capacity"
                    type="number"
                    fullWidth
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventDialog;
