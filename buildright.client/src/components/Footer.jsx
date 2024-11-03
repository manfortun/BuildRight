import { BsFacebook, BsLinkedin, BsInstagram, BsYoutube } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className="d-flex flex-row justify-content-center align-items-start text-white p-4" style={{columnGap: '5rem', flexWrap: 'wrap', rowGap: '4rem', backgroundColor: '#333', width: '100%' }} >
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
            <div className="d-flex flex-column justify-content-start align-items-start">
                <h4 className="fw-bold">Services</h4>
                <h6>Carpentry</h6>
                <h6>Demolition</h6>
                <h6>Electrical</h6>
                <h6>HVAC</h6>
                <h6>Masonry</h6>
                <h6>Plumbing</h6>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-start">
                <h4 className="fw-bold">Resources</h4>
                <h6>About Us</h6>
                <h6>Insights</h6>
                <h6>Career</h6>
                <h6>Ventures</h6>
            </div>
        </footer>
    )
}

export default Footer;