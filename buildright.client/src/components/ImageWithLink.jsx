import PropTypes from 'prop-types';

const ImageWithLink = ({ title, link, src }) => {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <a href={link} style={style }>
            <img src={`/assets/${src}`} alt={title} width="200px"/>
        </a>
    )
}

ImageWithLink.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    src: PropTypes.string
}

export default ImageWithLink;