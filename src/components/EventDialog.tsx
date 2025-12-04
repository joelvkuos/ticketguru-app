import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { Events as EventType } from '../types';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Event Name"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Date and Time"
                        value={formData.dateTime ? dayjs(formData.dateTime) : null}
                        onChange={(newValue) => setFormData({
                            ...formData,
                            dateTime: newValue ? newValue.toISOString() : ''
                        })}
                        slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
                    />
                </LocalizationProvider>
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
