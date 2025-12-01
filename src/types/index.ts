
export interface Events {
    id: string,
    name: string,
    dateTime: string,
    location: string,
    capacity: string,
}

export interface Sales {
    id: number;
    ticketId: number;
    eventId: number | null;
    customerId: number | null;
    sellerId: number;
    saleDate: string;
    price: number;
}

export interface Types {
    id: number;
    eventId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Tickets {
    id: number;
    ticketTypeId: number;
    code: string;
    sold: boolean;
    used: string | null;
}

export interface Users {
    id: number;
    username: string;
    password: string;
    role: string; // e.g., "SELLER", "ADMIN"
}