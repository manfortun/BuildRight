import { formatCurrency } from "../services/currencyService";
import PropTypes from 'prop-types';
import Rating from "./Rating";

const ProductDisplay = ({ product }) => {
    const divStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div style={ divStyle }>
            <div className="d-flex flex-column justify-content-center align-items-start mt-3">
                <img height="200px" width="200px" className="mb-2" />
                <h6>{product.title}</h6>
                <h6 className="text-secondary">{formatCurrency(product.price)}</h6>
                <Rating rating={product.averageRating} />
            </div>
        </div>
    )
}

ProductDisplay.propTypes = {
    product: PropTypes.any
}

export default ProductDisplay;