import PropTypes from 'prop-types';
import { ComponentMap } from "./components/maps/componentMap";

const CustomerRenderer = ({ ...props }) => {
    let finalizedProps = { ...props };

    if (props.children?.length > 0) {
        finalizedProps.children = props.children.map(c => <CustomerRenderer {...c} />);
    }

    const Component = ComponentMap[props.type] || null;
    return Component ? <Component {...finalizedProps} key={props.id} /> : <div>Component not found...</div>;
};

CustomerRenderer.propTypes = {
    id: PropTypes.string,
    children: PropTypes.any,
    type: PropTypes.string
}

export default CustomerRenderer;