import React, {useContext} from 'react';
import ProductsContext from "../../contexts/products.context";
import ProductCardComponent from "../../components/product-card/product-card.component";
import "./shop.styles.scss"

const ShopComponent = () => {
    const {products} = useContext(ProductsContext);

    return (
        <div className='products-container'>
            {products.map((product) => (
                <ProductCardComponent key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ShopComponent