import PropTypes from 'prop-types';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { formatRating } from "../services/currencyService";
import './styles/rating.css';

const Rating = ({ value }) => {

    const getStars = () => {
        const starStyle = {
            color: '#fdcc0d',
            marginRight: '2px'
        }
        let _rating = value || 0;
        const stars = Array(5).fill(<BsStar style={starStyle} />);

        for (let i = 0; i < 5 && _rating >= 0; i++) {
            if (_rating >= 1) {
                stars[i] = <BsStarFill style={starStyle} />
                _rating -= 1;
            } else if (_rating < 1 && _rating > 0) {
                stars[i] = <BsStarHalf style={starStyle} />
                _rating -= 0.5;
            } else {
                break;
            }
        }

        return stars;
    }

    return (
        <div className="position-relative d-flex flex-column">
            <small className="hover-target">{getStars()}</small>
            <span className="hover-text">{formatRating(value)} stars</span>
        </div>
    )
};

Rating.propTypes = {
    value: PropTypes.number
}

export default Rating;