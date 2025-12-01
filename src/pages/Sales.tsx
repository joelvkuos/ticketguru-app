import { useEffect, useState } from 'react';
import type { Sales as SalesType } from '../types';
import { fetchSales } from '../services/api';
import { Button } from '@mui/material';
import SaleDialog from '../components/SaleDialog';

function Sales() {
    const [, setSales] = useState<SalesType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        loadSales();
    }, []);

    const loadSales = async () => {
        try {
            const data = await fetchSales();
            setSales(data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const handleAddClick = () => {
        setDialogOpen(true);
    };

    const handleSave = async () => {
        await loadSales();
        setDialogOpen(false);
    };




    return (
        <>
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <p style={{ fontFamily: "Arial" }}>Click the button below to sell tickets.</p>
            </div>
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>
                <Button variant='contained' onClick={handleAddClick} style={{ height: '10vh' }}>
                    Sell Tickets
                </Button>
                <SaleDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onSave={handleSave}
                />
            </div>
        </>
    );
}

export default Sales;
