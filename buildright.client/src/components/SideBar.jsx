import React, { useEffect, useState } from "react";
import './styles/sidebar.css';

const SideBar = ({ children, height }) => {
    const [isSidebarShown, setIsSidebarShown] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsSidebarShown(window.scrollY === 0);
        }

        const eventName = 'scroll';
        window.addEventListener(eventName, handleScroll);
        return () => window.removeEventListener(eventName, handleScroll);
    }, []);

    return (
        <div className={ `sidebar-base${isSidebarShown ? '' : ' disappear'}` } style={{height: height} }>
            { children }
        </div>
    )
};

export default SideBar;