import Add from '../assets/add.svg';
import Dot from '../assets/3 dot menu.svg'

const formatName = (name) => {
    if (!name) return 'Unknown';

    const [firstName, lastName] = name.split(' ');
    if (lastName) {
        return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
    }
    return firstName.charAt(0).toUpperCase();
};

export function UserColumn({ name, length }) {

    const color = ["#A8E6CF", "#008080", "#87CEEB", "#2E8B57"];

    return <div className='kanban-col-header'>
        <div className='col-header-wrapper'>
            <div className='col-name-initial' style={{backgroundColor: color[Math.floor(Math.random() * color.length)]}}> {formatName(name)} </div>
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