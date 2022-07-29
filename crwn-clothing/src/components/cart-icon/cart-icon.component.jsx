import React, {useContext} from 'react';
import "./cart-icon.styles.scss"
import {Link} from "react-router-dom";

import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import {CartContext} from "../../contexts/cart.context";

const CartIconComponent = () => {
    const {isCartOpen, setIsCartOpen, cartItemCount} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <Link to="checkout">
            <div className="cart-icon-container">
                <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen}/>
                <span className="item-count">{cartItemCount}</span>
            </div>
        </Link>
    );
};

export default CartIconComponent;