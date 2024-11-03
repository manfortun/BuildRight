import { useEffect, useState } from "react";
import CategoryDisplay from "./CategoryDisplay";
import ArrayDisplay from "./ArrayDisplay";
import ProductDisplay from "./ProductDisplay";

const CategorizedItemArrayDisplay = ({ items }) => {
    const [canRender, setCanRender] = useState(false);
    const [selectedNewArrivalCategory, setSelectedNewArrivalCategory] = useState();

    useEffect(() => {
        try {

            if (items.some(item => !item.hasOwnProperty("categories"))) {
                throw new Error("Some of the items do not have the correct properties to render this component.");
            }

            setCanRender(true);
        } catch {
            setCanRender(false);
        }
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
                {items && items.length > 0 && items.filter(i => i.categories.some(cat => cat.id === selectedNewArrivalCategory)).map(item => (
                    <ProductDisplay key={item.id} product={item } />
                )) }
            </ArrayDisplay>
        </div>
    )
}

export default CategorizedItemArrayDisplay;