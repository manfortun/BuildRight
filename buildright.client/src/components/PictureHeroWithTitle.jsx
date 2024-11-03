import PictureHero from "./PictureHero"

const PictureHeroWithTitle = ({ src, textColor, height = "800px", alt = "" }) => {
    return (
        <div style={{justifyContent: 'center', alignItems: 'center', height: '-webkit-fill-available', width: '-webkit-fill-available', display: 'flex', position: 'relative'} }>
            <PictureHero src={src} height={height} alt={alt} />
            <h1 className="position-absolute text-align-center" style={{color: textColor, fontSize: '5rem'} }>BuildRight</h1>
        </div>
    )
}

export default PictureHeroWithTitle;