import { LuPlus } from 'react-icons/lu';

const AddChildButton = ({ id, onAddChildClick }) => {
    return (
        <button className='btn btn-outline-primary w-100 p-5 mt-3' onClick={(e) => onAddChildClick(e, id) }>Add child <LuPlus /></button>
    )
}

export default AddChildButton;