import Todo from '../assets/To-do.svg';
import Done from '../assets/Done.svg';
import Backlog from '../assets/Backlog.svg';
import Inprogress from '../assets/in-progress.svg';
import Cancelled from '../assets/Cancelled.svg';
import Add from '../assets/add.svg';
import Dot from '../assets/3 dot menu.svg'

function getImageByStatus(name){
    switch (name) {
        case 'Todo':
            return Todo;
        case 'Done':
            return Done;
        case 'Backlog':
            return Backlog;
        case 'In progress':
            return Inprogress;
        case 'Cancelled':
            return Cancelled;
    }
}

export function StatusColumn({ name, length }) {

    console.log(name);
    return <div className='kanban-col-header'>
        <div className='col-header-wrapper'>
            <img src={getImageByStatus(name)} alt="" />
            <div className='col-header-name'>
                {name} 
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