import type { Events, Sales, Users, Tickets, Types } from "../types";

const API_URL = "/api"

// Credentials for Basic Authentication
const USERNAME = "user";
const PASSWORD = "password";

// Create base64 encoded credentials
const credentials = btoa(`${USERNAME}:${PASSWORD}`);

export const fetchEvents = async (): Promise<Events[]> => {
    const response = await fetch(`${API_URL}/events`, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
    const data: Events[] = await response.json();
    return data;
};

export const fetchSales = async (): Promise<Sales[]> => {
    const response = await fetch(`${API_URL}/sales`, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
    const data: Sales[] = await response.json();
    return data;
};

export const fetchTickets = async (): Promise<Tickets[]> => {
    const response = await fetch(`${API_URL}/tickets`, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
    const data: Tickets[] = await response.json();
    return data;
};

export const fetchTypes = async (): Promise<Types[]> => {
    const response = await fetch(`${API_URL}/tickets/types`, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
    const data: Types[] = await response.json();
    return data;
};

export const fetchUsers = async (): Promise<Users[]> => {
    const response = await fetch(`${API_URL}/users`, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
    const data: Users[] = await response.json();
    return data;
};


export const createEvent = async (event: Omit<Events, 'id'>): Promise<Events> => {
    const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });
    return await response.json();
};

export const createSale = async (sale: Omit<Sales, 'id'>): Promise<Sales> => {
    const response = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sale)
    });
    return await response.json();
};

export const createTicket = async (ticket: Omit<Tickets, 'id'>): Promise<Tickets> => {
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    });
    return await response.json();
};

export const createType = async (type: Omit<Types, 'id'>): Promise<Types> => {
    const response = await fetch(`${API_URL}/tickets/types`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(type)
    });
    return await response.json();
};

export const createUser = async (user: Omit<Users, 'id'>): Promise<Users> => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return await response.json();
};


export const updateEvent = async (id: string | number, event: Partial<Events>): Promise<Events> => {
    const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });
    return await response.json();
};

export const updateSale = async (id: number, sale: Partial<Sales>): Promise<Sales> => {
    const response = await fetch(`${API_URL}/sales/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sale)
    });
    return await response.json();
};

export const updateTicket = async (id: number, ticket: Partial<Tickets>): Promise<Tickets> => {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    });
    return await response.json();
};

export const updateType = async (id: number, type: Partial<Types>): Promise<Types> => {
    const response = await fetch(`${API_URL}/tickets/types/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(type)
    });
    return await response.json();
};

export const updateUser = async (id: number, user: Partial<Users>): Promise<Users> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return await response.json();
};


export const deleteEvent = async (id: string | number): Promise<void> => {
    await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
};

export const deleteSale = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/sales/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
};

export const deleteTicket = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/tickets/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
};

export const deleteType = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/tickets/types/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
};

export const deleteUser = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });
};







