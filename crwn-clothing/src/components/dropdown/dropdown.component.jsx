import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import "./dropdown.styles.scss"
import ButtonComponent from "../button/button.component";
import {CartContext} from '../../contexts/cart.context';
import CartItemComponent from "../cart-item/cart-item.component";

const DropdownComponent = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItemComponent key={cartItem.id} cartItem={cartItem}/>
                    ))
                ) : (
                    <span className='empty-message'>Your cart is empty</span>
                )}
            </div>
            <ButtonComponent onClick={goToCheckoutHandler}>GO TO CHECKOUT</ButtonComponent>
        </div>
    );
};

export default DropdownComponent;