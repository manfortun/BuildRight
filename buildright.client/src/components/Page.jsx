import PropTypes from 'prop-types';

const Page = ({ children }) => {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        minHeight: '720px'
    }
    return (
        <div style={ style }>
            { children }
        </div>
    )
};

Page.propTypes = {
    children: PropTypes.any
}

export default Page;