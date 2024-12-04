import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import BorderContainer from "./BorderContainer";
import './styles/sidebarpopupitem.css';

const SideBarPopupItem = ({ title, description, children, href }) => {
    const [isMenuShownStepOne, setIsMenuShownStepOne] = useState(false);
    const [isMenuShownStepTwo, setIsMenuShownStepTwo] = useState(false);

    useEffect(() => {
        const element = document.querySelector(`.sidebar-title-${title}`);
        const popup = document.querySelector(`.popup-${title}`);
        let timer;

        const handleStepOneEnter = () => {
            setIsMenuShownStepOne(true);
        }

        const handleStepOneLeave = () => {
            timer = setTimeout(() => {
                if (!isMenuShownStepTwo) {
                    setIsMenuShownStepOne(false);
                }
            }, 100);
        }

        const handleStepTwoEnter = () => {
            clearTimeout(timer);
            if (isMenuShownStepOne) {
                setIsMenuShownStepTwo(true);
            }
        }

        const handleStepTwoLeave = () => {
            setIsMenuShownStepOne(false);
            setIsMenuShownStepTwo(false);
        }

        if (element) {
            element.addEventListener("mouseenter", handleStepOneEnter);
            element.addEventListener("mouseleave", handleStepOneLeave);
        }

        if (popup) {
            popup.addEventListener("mouseenter", handleStepTwoEnter);
            popup.addEventListener("mouseleave", handleStepTwoLeave)
        }

        return () => {
            if (element) {
                element.removeEventListener("mouseenter", handleStepOneEnter);
                element.removeEventListener("mouseleave", handleStepOneLeave);
            }

            if (popup) {
                popup.removeEventListener("mouseenter", handleStepTwoEnter);
                popup.removeEventListener("mouseleave", handleStepTwoLeave)
            }

            clearTimeout(timer);
        }
    }, []);

    const descriptionStyle = {
        color: 'gray',
        textAlign: 'left',
        maxWidth: '400px',
    }

    return (
        <div>
            <a className={`sidebar-title-${title} title`} href={href}>
                {title }
            </a>
            <div className={`popup popup-${title} ${isMenuShownStepOne || isMenuShownStepTwo ? 'show' : ''}`} style={{minWidth: '250px'} }>
                <BorderContainer hasPointerEvents={true}>
                    <div className="p-2" style={{pointerEvents: 'all!important'} }>
                        {description && description.length > 0 && (
                            <h6 style={descriptionStyle}>{description}</h6>
                        )}
                        {description && description.length > 0 && children && children.length > 0 && (
                            <hr />
                        ) }
                        {children && children.length > 0 && (
                            <div className="pb-3">
                                {children }
                            </div>
                        ) }
                    </div>
                </BorderContainer>
            </div>
        </div>
    )
}

SideBarPopupItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.any,
    href: PropTypes.string
}

export default SideBarPopupItem;