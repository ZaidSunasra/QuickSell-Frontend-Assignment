import axios from 'axios';
import './index.css';
import display from './assets/Display.svg';
import down from './assets/down.svg';
import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import { useTicketsGroupedByUser } from './hooks/getByUser';
import { useTicketsGroupedByPriority } from './hooks/getByPriority';
import { useticketsGroupedByStatus } from './hooks/getByStatus';
import { UserColumn } from './components/UserColumnHeader';
import { StatusColumn } from './components/StatusColumnHeader';
import { PriorityColumn } from './components/PriorityColumnheader';

function App() {
  const [grouping, setGrouping] = useState(() => localStorage.getItem('grouping') || 'User');
  const [ordering, setOrdering] = useState(() => localStorage.getItem('ordering') || 'Title'); 
  const [groupedTickets, setGroupedTickets] = useState({});
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [map, setMap] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        const { tickets, users } = response.data;

        const usersMap = users.reduce((map, user) => {
          map[user.id] = user.name;
          return map;
        }, {});

        setTickets(tickets);
        setUsers(users);
        setMap(usersMap);
        setLoading(false);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedByUser = useTicketsGroupedByUser(tickets, users);
  const groupedByPriority = useTicketsGroupedByPriority(tickets);
  const groupedByStatus = useticketsGroupedByStatus(tickets);

  const sortGroupedTickets = (groupedTickets) => {
    return Object.keys(groupedTickets).reduce((sortedGroups, group) => {
      const sortedTickets = [...groupedTickets[group]]; 
      if (ordering === 'Title') {
        sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
      } else if (ordering === 'Priority') {
        sortedTickets.sort((a, b) => b.priority - a.priority);
      }

      sortedGroups[group] = sortedTickets;
      return sortedGroups;
    }, {});
  };

  useEffect(() => {
    let currentGroupedTickets = {};
    switch (grouping) {
      case 'User':
        currentGroupedTickets = groupedByUser;
        break;
      case 'Priority':
        currentGroupedTickets = groupedByPriority;
        break;
      case 'Status':
        currentGroupedTickets = groupedByStatus;
        break;
      default:
        break;
    }

    const sortedTickets = sortGroupedTickets(currentGroupedTickets);
    setGroupedTickets(sortedTickets);

  }, [grouping, ordering, groupedByUser, groupedByPriority, groupedByStatus]);

  const handleGroupingChange = (value) => {
    setGrouping(value);
    localStorage.setItem('grouping', value);  
  };


  const handleOrderingChange = (value) => {
    setOrdering(value);
    localStorage.setItem('ordering', value);  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="navbar">
        <div className='option'>
          <img src={display} alt="Display Icon" />
          <span>Display</span>
          <img src={down} alt="Down Arrow" onClick={showMenu} />
        </div>
        {menuVisible && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select value={grouping} onChange={(e) => handleGroupingChange(e.target.value)}>
                <option value="User">User</option>
                <option value="Status">Status</option>
                <option value="Priority">Priority</option>

              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select value={ordering} onChange={(e) => handleOrderingChange(e.target.value)}>
                <option value="Title">Title</option>
                <option value="Priority">Priority</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
          {grouping == 'User' && <UserColumn name={group} length={groupedTickets[group].length}/>}
          {grouping == 'Status' && <StatusColumn name={group} length={groupedTickets[group].length}/>}
          {grouping == 'Priority' && <PriorityColumn name={group} length={groupedTickets[group].length}/>} 
            {groupedTickets[group].map((ticket) => (
              <Card
                key={ticket.id}
                ticket={ticket}
                group={grouping}
                name={map[ticket.userId]}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
export default App