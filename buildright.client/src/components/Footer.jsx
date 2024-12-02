import { BsFacebook, BsLinkedin, BsInstagram, BsYoutube } from 'react-icons/bs';

const Footer = ({ children }) => {
    const footerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'start',
        columnGap: '5rem',
        flexWrap: 'wrap',
        rowGap: '4rem',
        backgroundColor: '#333',
        width: '100vw'
    }
    return (
        <footer className="d-flex flex-row justify-content-center align-items-start text-white p-4" style={ footerStyle } >
            <div className="d-flex flex-column justify-content-start align-items-start">
                <h1>BuildRight</h1>
                <span>&copy; 2024</span>
                <div>
                    <a href="/privacy" className="text-white">Privacy</a>
                    <span>-</span>
                    <a href="/terms" className="text-white">Terms</a>
                </div>
                <div className="d-flex flex-row fs-5 mt-2" style={{columnGap: '0.5rem'} }>
                    <BsFacebook />
                    <BsLinkedin />
                    <BsInstagram />
                    <BsYoutube />
                </div>
            </div>
            {children }
        </footer>
    )
}

export default Footer;