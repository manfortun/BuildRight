import { formatCurrency } from "../services/currencyService";
import Rating from "./Rating";

const ProductDisplay = ({ product }) => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-start mt-3">
                <img height="200px" width="200px" className="mb-2" />
                <h6>{product.title}</h6>
                <h6 className="text-secondary">{formatCurrency(product.price)}</h6>
                <Rating rating={product.averageRating} />
            </div>
        </div>
    )
}

export default ProductDisplay;