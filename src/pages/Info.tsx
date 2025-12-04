function Info() {

    return (
        <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: "System-UI", color: 'white' }}>

            <section style={{ marginBottom: '2rem' }}>
                <div style={{ backgroundColor: '#1976d2', textShadow: '2px 2px 2px black', padding: '1.5rem', borderRadius: '8px', lineHeight: '1.8', textAlign: 'center' }}>
                    <h3><strong>HOW TO USE</strong></h3>
                    <p><strong>1:</strong> Create an Event (Events page)</p>
                    <p><strong>2:</strong> Create Ticket Types for that event (Types page)</p>
                    <p><strong>3:</strong> Sell tickets to customers (Sell Tickets page)</p>
                    <p><strong>4:</strong> Redeem tickets (Tickets page)</p>
                </div>
            </section>
        </div>
    );
}
export default Info;