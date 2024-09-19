import { useState, useEffect } from 'react';

export function useTicketsGroupedByPriority(tickets) {
    const [groupedByPriority, setGroupedByPriority] = useState({});

    useEffect(() => {
        const grouped = tickets.reduce((priorityGroup, ticket) => {
            const priority = ticket.priority;
            if (!priorityGroup[priority]){
                priorityGroup[priority] = [];
            } 
            priorityGroup[priority].push(ticket);
            return priorityGroup;
        }, {});

        setGroupedByPriority(grouped);
    }, [tickets]);

    return groupedByPriority;
}