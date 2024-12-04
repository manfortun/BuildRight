import PropTypes from 'prop-types';

const SideBarSubitem = ({ title, description, href }) => {

    return (
        <a className="d-flex flex-column align-items-start mt-3" href={href} style={{pointerEvents: `${href && href.length > 0 ? 'cursor' : 'none'}`} }>
            <h6 className="mb-0">{title}</h6>
            {description && description.length > 0 && (
                <small style={{maxWidth: '300px', textAlign: 'start'} }>{description}</small>
            ) }
        </a>
    )
};

SideBarSubitem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    href: PropTypes.string
}

export default SideBarSubitem;