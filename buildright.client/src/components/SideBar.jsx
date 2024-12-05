import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import './styles/sidebar.css';

const SideBar = ({ children, height }) => {
    const [isSidebarShown, setIsSidebarShown] = useState(true);
    let lastScroll = 0;

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.pageYOffset || document.documentElement.scrollTop;

            setIsSidebarShown(scroll < lastScroll);

            lastScroll = scroll <= 0 ? 0 : scroll;
        }

        const eventName = 'scroll';
        window.addEventListener(eventName, handleScroll);
        return () => window.removeEventListener(eventName, handleScroll);
    }, []);

    return (
        <div id="sidebar" className={`sidebar-base${isSidebarShown ? '' : ' disappear'}`} style={{ height: height ?? 'auto' }}>
            {children && children.length > 0 && children.map((child, index) => (
                <div className="p-2" key={index }>
                    {child}
                </div>
            )) }
        </div>
    )
};

SideBar.propTypes = {
    children: PropTypes.any,
    height: PropTypes.number
}

export default SideBar;