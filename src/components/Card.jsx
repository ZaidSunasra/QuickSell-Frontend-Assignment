import '../index.css'
import low from '../assets/Img - Low Priority.svg'
import no from '../assets/No-Priority.svg'
import high from '../assets/Img - High Priority.svg'
import medium from '../assets/Img - Medium Priority.svg'
import urgent from '../assets/SVG - Urgent Priority grey.svg'

const formatName = (name) => {
    if (!name) return 'Unknown';

    const [firstName, lastName] = name.split(' ');
    if (lastName) {
        return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
    }
    return firstName.charAt(0).toUpperCase();
};

export function Card({ ticket, name, group }) {

    const priorityArray = [no, low, medium, high, urgent];
    const color = ["#A8E6CF", "#008080", "#87CEEB", "#2E8B57"];

    return <div className='card-container'>
        <div className='card-header'>
            <div className='card-id'>{ticket.id}</div>
            {group == 'User' ? null : (
                <div className='card-name' style={{backgroundColor: color[Math.floor(Math.random()* color.length)]}}>{formatName(name)}</div>
            )}
            
        </div>
        <div className='card-title'>
            {ticket.title.slice(0, 69)}
            {ticket.title.length > 69 ? "..." : ""}
        </div>
        <div className='card-footer'>
            <div className='card-priority'>
                <img src={priorityArray[ticket.priority]} alt="Priority Icon"></img>
            </div>
            <div className='card-tag'>
                <div className='round'></div>
                {ticket.tag}
            </div>
        </div>
    </div>
}