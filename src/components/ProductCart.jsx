import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";
import { Link } from "react-router-dom";


const ProductCart = props => {
    return ( 
        <div className="product-card">
            <Link to={`/catalog/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.img01} alt="" />
                    <img src={props.img02} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {props.price} đ
                    <span className="product-card__price__old">
                        <del>399000 đ</del>
                    </span>
                </div>
            </Link>

                <div className="product-card__btn">
                    <Button
                        size="sm"
                        icon="bx bxs-cart-add" 
                        animate={true}
                    >
                        Chọn mua
                    </Button>
                </div>
        </div>
     );
}


ProductCart.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    slug : PropTypes.string.isRequired
}

export default ProductCart;