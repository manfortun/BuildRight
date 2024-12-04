import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import ArrayDisplay from "./ArrayDisplay";
import CategoryDisplay from "./CategoryDisplay";
import ProductDisplay from "./ProductDisplay";

const CategorizedItemArrayDisplay = ({ items }) => {
    const [canRender, setCanRender] = useState(false);
    const [selectedNewArrivalCategory, setSelectedNewArrivalCategory] = useState();

    useEffect(() => {
        setCanRender(items?.length > 0 && items.every(i => i.hasOwnProperty('categories')));
    }, []);

    if (!canRender) {
        return <div className="text-danger">Unable to render this component...</div>;
    }

    const handleOnCategorySelection = (categoryId) => {
        setSelectedNewArrivalCategory(categoryId);
    }

    return (
        <div>
            <CategoryDisplay items={items} onSelection={handleOnCategorySelection} />
            <div className="mb-5"/>
            <ArrayDisplay noOfColumns={6 }>
                {items?.length > 0 && items.filter(i => i.categories.some(cat => cat.id === selectedNewArrivalCategory)).map(item => (
                    <ProductDisplay key={item.id} product={item } />
                )) }
            </ArrayDisplay>
        </div>
    )
}

CategorizedItemArrayDisplay.propTypes = {
    items: PropTypes.array
}

export default CategorizedItemArrayDisplay;