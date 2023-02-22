import React , { useEffect } from "react";
import ScrollReveal from 'scrollreveal';
import PropTypes from "prop-types";

function PolicyCard(props) {

    useEffect(() => {
        ScrollReveal().reveal('.policy-card', { delay: 1, origin: 'bottom',duration: 1000,distance: '60px' });
    }, []);
    
    return ( 
        <div className="policy-card">
            <div className="policy-card__icon">
                <i className={props.icon}></i>
            </div>

            <div className="policy-card__info">
                <div className="policy-card__info__name">
                    {props.name}
                </div>

                <div className="policy-card__info__description">
                    {props.description}
                </div>
            </div>
        </div>
     );
}


PolicyCard.propTypes = {
    name: PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    icon : PropTypes.string.isRequired
}

export default PolicyCard;