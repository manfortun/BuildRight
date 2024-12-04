import PropTypes from 'prop-types';

const SectionTitle = ({ label }) => {
    return (
        <h3 className="pb-5 mb-0">{label}</h3>
    )
};

SectionTitle.propTypes = {
    label: PropTypes.string
}
export default SectionTitle;