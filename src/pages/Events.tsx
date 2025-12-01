import {useState, useEffect} from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {fetchEvents} from '../services/api';

export default

function Events() {
    const [events, setEvents] = useState<Events[]>([]);
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const columns: GridColDef = [
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'date', headerName: 'Date', width: 150},
        {field: 'location', headerName: 'Location', width: 200},
    ]


    return(
        <div>
        <DataGrid
            rows={events}
            columns={columns}
            pageSize={10}
            autoHeight
        />
        </div>
    )


        