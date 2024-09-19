import Add from '../assets/add.svg';
import Dot from '../assets/3 dot menu.svg'
import low from '../assets/Img - Low Priority.svg'
import no from '../assets/No-Priority.svg'
import high from '../assets/Img - High Priority.svg'
import medium from '../assets/Img - Medium Priority.svg'
import urgent from '../assets/SVG - Urgent Priority colour.svg'

function getImageByPriority(name) {
    switch (name) {
        case '0':
            return no;
        case '1':
            return low;
        case '2':
            return medium;
        case '3':
            return high;
        case '4':
            return urgent;
    }
}

export function PriorityColumn({ name, length }) {

    const priorityLevel = ["No priority", "Low", "Medium", "High", "Urgent"]

    return <div className='kanban-col-header'>
        <div className='col-header-wrapper'>
            <img src={getImageByPriority(name)} alt="" />
            <div className='col-header-name'>
                {priorityLevel[name]}
            </div>
            <div className='col-header-length'>
                {length}
            </div>
        </div>
        <div className='col-header-wrapper'>
            <img src={Add} alt="" />
            <img src={Dot} alt="" />
        </div>
    </div>
}