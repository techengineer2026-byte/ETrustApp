// src/context/ChatContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// --- Types ---
export type UserType = 'Employer' | 'Seeker';
export type TicketStatus = 'Open' | 'Resolved' | 'Pending' | 'Banned';

export interface Message {
    id: string;
    text: string;
    sender: 'admin' | 'user';
    time: string;
    type?: 'text' | 'image' | 'file';
    isSystem?: boolean;
}

export interface Ticket {
    id: string;
    ticketId: string;
    name: string;
    userType: UserType;
    avatar: string;
    status: TicketStatus;
    messages: Message[];
    unreadCount: number;
}

// --- Initial Mock Data (Your Database) ---
const INITIAL_DATA: Ticket[] = [
    {
        id: '1',
        ticketId: '#TK-9021',
        name: 'Tech Solutions Pvt Ltd',
        userType: 'Employer',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        status: 'Open',
        unreadCount: 2,
        messages: [
            { id: 'm1', text: 'Hello Support.', sender: 'user', time: '10:00 AM', type: 'text' },
            { id: 'm2', text: 'We need help verifying our GST document.', sender: 'user', time: '10:05 AM', type: 'text' }
        ]
    },
    {
        id: '2',
        ticketId: '#TK-8832',
        name: 'Rahul Sharma',
        userType: 'Seeker',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        status: 'Pending',
        unreadCount: 0,
        messages: [
            { id: 'm1', text: 'I have not received payment for the interview.', sender: 'user', time: 'Yesterday', type: 'text' },
            { id: 'm2', text: 'We are checking this for you.', sender: 'admin', time: 'Yesterday', type: 'text' }
        ]
    },
    {
        id: '3',
        ticketId: '#TK-1102',
        name: 'InnovateX',
        userType: 'Employer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        status: 'Resolved',
        unreadCount: 0,
        messages: [
            { id: 'm1', text: 'Ticket Resolved. Thank you.', sender: 'user', time: 'Mon', type: 'text' }
        ]
    }
];

// --- Context Setup ---
interface ChatContextType {
    tickets: Ticket[];
    getTicketById: (id: string) => Ticket | undefined;
    sendMessage: (ticketId: string, text: string, sender: 'admin' | 'user', type?: 'text' | 'file' | 'image', isSystem?: boolean) => void;
    updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
    markAsRead: (ticketId: string) => void;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [tickets, setTickets] = useState<Ticket[]>(INITIAL_DATA);

    const getTicketById = (id: string) => tickets.find(t => t.id === id);

    const sendMessage = (ticketId: string, text: string, sender: 'admin' | 'user', type: 'text' | 'file' | 'image' = 'text', isSystem = false) => {
        setTickets(prev => prev.map(ticket => {
            if (ticket.id === ticketId) {
                const newMsg: Message = {
                    id: Date.now().toString(),
                    text,
                    sender,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    type,
                    isSystem
                };
                return { ...ticket, messages: [...ticket.messages, newMsg] };
            }
            return ticket;
        }));
    };

    const updateTicketStatus = (ticketId: string, status: TicketStatus) => {
        setTickets(prev => prev.map(ticket =>
            ticket.id === ticketId ? { ...ticket, status } : ticket
        ));
    };

    const markAsRead = (ticketId: string) => {
        setTickets(prev => prev.map(ticket =>
            ticket.id === ticketId ? { ...ticket, unreadCount: 0 } : ticket
        ));
    };

    return (
        <ChatContext.Provider value={{ tickets, getTicketById, sendMessage, updateTicketStatus, markAsRead }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);