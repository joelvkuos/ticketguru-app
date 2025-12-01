import { useState } from 'react'
import './App.css'
import { fetchEvents, fetchSales, fetchTickets, fetchTypes } from './services/api'
import type { Events, Sales, Tickets, Types } from './types'

function App() {
  const [events, setEvents] = useState<Events[]>([])
  const [sales, setSales] = useState<Sales[]>([])
  const [tickets, setTickets] = useState<Tickets[]>([])
  const [types, setTypes] = useState<Types[]>([])
  const [loading, setLoading] = useState<string>('')

  const testFetchEvents = async () => {
    setLoading('events')
    try {
      console.log('🚀 Testing fetchEvents...')
      const data = await fetchEvents()
      console.log('✅ Events:', data)
      setEvents(data)
    } catch (error) {
      console.error('❌ Error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading('')
    }
  }

  const testFetchSales = async () => {
    setLoading('sales')
    try {
      console.log('🚀 Testing fetchSales...')
      const data = await fetchSales()
      console.log('✅ Sales:', data)
      setSales(data)
    } catch (error) {
      console.error('❌ Error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading('')
    }
  }

  const testFetchTickets = async () => {
    setLoading('tickets')
    try {
      console.log('🚀 Testing fetchTickets...')
      const data = await fetchTickets()
      console.log('✅ Tickets:', data)
      setTickets(data)
    } catch (error) {
      console.error('❌ Error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading('')
    }
  }

  const testFetchTypes = async () => {
    setLoading('types')
    try {
      console.log('🚀 Testing fetchTypes...')
      const data = await fetchTypes()
      console.log('✅ Types:', data)
      setTypes(data)
    } catch (error) {
      console.error('❌ Error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading('')
    }
  }

  return (
    <>
      <h1>TicketGuru API Tests</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button onClick={testFetchEvents} disabled={loading === 'events'}>
          {loading === 'events' ? 'Loading...' : 'Test fetchEvents()'}
        </button>
        <button onClick={testFetchSales} disabled={loading === 'sales'}>
          {loading === 'sales' ? 'Loading...' : 'Test fetchSales()'}
        </button>
        <button onClick={testFetchTickets} disabled={loading === 'tickets'}>
          {loading === 'tickets' ? 'Loading...' : 'Test fetchTickets()'}
        </button>
        <button onClick={testFetchTypes} disabled={loading === 'types'}>
          {loading === 'types' ? 'Loading...' : 'Test fetchTypes()'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div>
          <h2>Events ({events.length})</h2>
          <pre style={{
            textAlign: 'left',
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '8px',
            maxHeight: '400px',
            overflow: 'auto',
            fontSize: '0.85rem'
          }}>
            {events.length > 0 ? JSON.stringify(events, null, 2) : 'No data yet'}
          </pre>
        </div>

        <div>
          <h2>Sales ({sales.length})</h2>
          <pre style={{
            textAlign: 'left',
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '8px',
            maxHeight: '400px',
            overflow: 'auto',
            fontSize: '0.85rem'
          }}>
            {sales.length > 0 ? JSON.stringify(sales, null, 2) : 'No data yet'}
          </pre>
        </div>

        <div>
          <h2>Tickets ({tickets.length})</h2>
          <pre style={{
            textAlign: 'left',
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '8px',
            maxHeight: '400px',
            overflow: 'auto',
            fontSize: '0.85rem'
          }}>
            {tickets.length > 0 ? JSON.stringify(tickets, null, 2) : 'No data yet'}
          </pre>
        </div>

        <div>
          <h2>Types ({types.length})</h2>
          <pre style={{
            textAlign: 'left',
            background: '#1e1e1e',
            color: '#d4d4d4',
            padding: '1rem',
            borderRadius: '8px',
            maxHeight: '400px',
            overflow: 'auto',
            fontSize: '0.85rem'
          }}>
            {types.length > 0 ? JSON.stringify(types, null, 2) : 'No data yet'}
          </pre>
        </div>
      </div>

      <p style={{ fontSize: '0.9em', color: '#888', marginTop: '2rem' }}>
        Open DevTools (F12) to see console logs
      </p>
    </>
  )
}

export default App
