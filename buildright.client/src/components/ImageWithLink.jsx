const ImageWithLink = ({ title, link, src }) => {
    return (
        <a href={link } className="d-flex flex-column justify-content-center align-items-center">
            <img src={`/assets/${src}`} alt={title} width="200px"/>
        </a>
    )
}

export default ImageWithLink;