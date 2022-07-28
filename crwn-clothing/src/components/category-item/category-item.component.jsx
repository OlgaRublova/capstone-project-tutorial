import React from 'react'; /* rsc */
import "./category-item.styles.scss"

const CategoryItemComponent = ({category}) => {
    const {title, imageUrl} = category;

    return (
        <div className="category-container">
            <div className="background-image"
                 style={{backgroundImage: `url(${imageUrl})`}}>
            </div>
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shopping</p>
            </div>
        </div>
    );
};

export default CategoryItemComponent;
