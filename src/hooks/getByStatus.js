import { useState, useEffect } from 'react';

export function useticketsGroupedByStatus(tickets) {
    const [groupedByStatus, setGroupedByStatus] = useState({});

    useEffect(() => {
        const grouped = tickets.reduce((statusGroup, ticket) => {
            const status = ticket.status;
            if (!statusGroup[status]) statusGroup[status] = [];
            statusGroup[status].push(ticket);
            return statusGroup;
        }, {});

        setGroupedByStatus(grouped);
    }, [tickets]);

    return groupedByStatus;
}