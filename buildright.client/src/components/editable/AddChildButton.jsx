import { LuPlus } from 'react-icons/lu';

const AddChildButton = ({ id, title, onAddChildClick }) => {
    return (
        <button className='btn btn-outline-primary w-100 p-5 mt-3 d-flex justify-content-center align-items-center gap-3' onClick={(e) => onAddChildClick(e, id)}>{title} <LuPlus /></button>
    )
}

export default AddChildButton;