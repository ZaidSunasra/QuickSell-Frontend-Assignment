import { useState, useEffect } from 'react';

export function useTicketsGroupedByUser(tickets, users) {
    const [groupedByUser, setGroupedByUser] = useState({});

    useEffect(() => {
        const grouped = tickets.reduce((userGroup, ticket) => {
            const user = users.find(user => user.id === ticket.userId)?.name || "Unknown";
            if (!userGroup[user]) userGroup[user] = [];
            userGroup[user].push(ticket);
            return userGroup;
        }, {});

        setGroupedByUser(grouped);
    }, [tickets, users]);

    return groupedByUser;
}