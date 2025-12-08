import type { Events, Sales, Users, Tickets, Types } from "../types";
import { getToken } from "./authService";

const API_URL = "/api"

// Helper function to get authorization headers
const getAuthHeaders = (): HeadersInit => {
    const token = getToken();
    console.log('Token from localStorage:', token ? 'EXISTS' : 'NULL');
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
    console.log('API Response status:', response.status);
    
    if (response.status === 401) {
        console.error('401 Unauthorized - clearing tokens and redirecting to login');
        // Jos 401, tyhjennä token ja ohjaa kirjautumissivulle
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        // Käytä setTimeout välttääksesi selaimen auth-dialogin
        setTimeout(() => {
            window.location.href = '/login';
        }, 0);
        throw new Error('Unauthorized');
    }
    if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
};

export const fetchEvents = async (): Promise<Events[]> => {
    const response = await fetch(`${API_URL}/events`, {
        headers: getAuthHeaders()
    });
    await handleResponse(response);
    const data: Events[] = await response.json();
    return data;
};

export const fetchSales = async (): Promise<Sales[]> => {
    const response = await fetch(`${API_URL}/sales`, {
        headers: getAuthHeaders()
    });
    await handleResponse(response);
    const data: Sales[] = await response.json();
    return data;
};

export const fetchTickets = async (): Promise<Tickets[]> => {
    const response = await fetch(`${API_URL}/tickets`, {
        headers: getAuthHeaders()
    });
    await handleResponse(response);
    const data: Tickets[] = await response.json();
    return data;
};

export const fetchTypes = async (): Promise<Types[]> => {
    const response = await fetch(`${API_URL}/tickets/types`, {
        headers: getAuthHeaders()
    });
    await handleResponse(response);
    const data: Types[] = await response.json();
    return data;
};

export const fetchUsers = async (): Promise<Users[]> => {
    const response = await fetch(`${API_URL}/users`, {
        headers: getAuthHeaders()
    });
    await handleResponse(response);
    const data: Users[] = await response.json();
    return data;
};


export const createEvent = async (event: Omit<Events, 'id'>): Promise<Events> => {
    const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(event)
    });
    await handleResponse(response);
    return await response.json();
};

export const createSale = async (sale: Omit<Sales, 'id'>): Promise<Sales> => {
    const response = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(sale)
    });
    await handleResponse(response);
    return await response.json();
};

export const createTicket = async (ticket: Omit<Tickets, 'id'>): Promise<Tickets> => {
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(ticket)
    });
    await handleResponse(response);
    return await response.json();
};

export const createType = async (type: Omit<Types, 'id'>): Promise<Types> => {
    const response = await fetch(`${API_URL}/tickets/types`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(type)
    });
    await handleResponse(response);
    return await response.json();
};

export const createUser = async (user: Omit<Users, 'id'>): Promise<Users> => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(user)
    });
    await handleResponse(response);
    return await response.json();
};


export const updateEvent = async (id: string | number, event: Partial<Events>): Promise<Events> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(event)
    });
    await handleResponse(response);
    return await response.json();
};

export const updateSale = async (id: number, sale: Partial<Sales>): Promise<Sales> => {
    const response = await fetch(`${API_URL}/sales/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(sale)
    });
    await handleResponse(response);
    return await response.json();
};

export const updateTicket = async (id: number, ticket: Partial<Tickets>): Promise<Tickets> => {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(ticket)
    });
    await handleResponse(response);
    return await response.json();
};

export const updateType = async (id: number, type: Partial<Types>): Promise<Types> => {
    const response = await fetch(`${API_URL}/tickets/types/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(type)
    });
    await handleResponse(response);
    return await response.json();
};

export const updateUser = async (id: number, user: Partial<Users>): Promise<Users> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(user)
    });
    await handleResponse(response);
    return await response.json();
};


export const deleteEvent = async (id: string | number): Promise<void> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    await handleResponse(response);
};

export const deleteSale = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/sales/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    await handleResponse(response);
};

export const deleteTicket = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    await handleResponse(response);
};

export const deleteType = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/tickets/types/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    await handleResponse(response);
};

export const deleteUser = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    await handleResponse(response);
};







