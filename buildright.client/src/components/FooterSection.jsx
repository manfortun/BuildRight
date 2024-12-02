import PropTypes from 'prop-types';

const FooterSection = ({ children, title }) => {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start'
    }
    return (
        <div style={style }>
            {title?.length > 0 && (
                <h4 className="fw-bold">{title}</h4>
            ) }
            {children }
        </div>
    )
}

FooterSection.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
}

export default FooterSection;