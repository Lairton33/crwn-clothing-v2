import { useContext } from "react";

import Button from "../button/button.component";
// import { CartItemsContext } from "../../contexts/cartdd.context"
import "./product-card.styles.scss"

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <span className="name">{name}</span>
            <span className="price">{price}</span>
            <Button buttonType="inverted">Add to cart</Button>
        </div>
    );
}
export default ProductCard;