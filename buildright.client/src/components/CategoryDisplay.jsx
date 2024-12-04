import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const CategoryDisplay = ({ items, onSelection }) => {
    const [canRender, setCanRender] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let _canRender = items?.length > 0 && items.every(i => i.hasOwnProperty('categories'));
        setCanRender(_canRender);

        if (_canRender) {
            getCategories();
        }
    }, []);

    const select = (id) => {
        if (onSelection) {
            onSelection(id);
        }
    }

    const getCategories = () => {
        let _categories = [];

        items.forEach(item => {
            item.categories.forEach(cat => {
                if (!_categories.some(existingCat => existingCat.id === cat.id)) {
                    _categories.push({...cat, isActive: false});
                }
            });
        });

        _categories[0].isActive = true;
        select(_categories[0].id);
        setCategories(_categories);
    }

    if (!canRender) {
        return <div className="text-danger">Unable to render this component...</div>;
    }

    const handleCategoryClick = (id) => {
        let _categories = categories.map(cat => ({ ...cat, isActive: id === cat.id }));
        setCategories(_categories);
        select(id);
    }

    return (
        <div>
            {categories?.length > 0 && categories.map(cat => (
                <button className="btn fw-bold" style={{ color: `${cat.isActive ? 'black' : 'lightgray'}` }} onClick={(e) => handleCategoryClick(cat.id)} key={cat.id }>{cat.title}</button>
            )) }
        </div>
    );
}

CategoryDisplay.propTypes = {
    items: PropTypes.array,
    onSelection: PropTypes.func
}

export default CategoryDisplay;