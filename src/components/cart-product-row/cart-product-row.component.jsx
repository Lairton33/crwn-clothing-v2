import "./cart-product-row.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartProductRow = ({ cartItem }) => {
  const { id, imageUrl, name, price, quantity } = cartItem;

  const { quantityIncrease, quantityDecrease, removeItemFromCart } =
    useContext(CartContext);

  const handleQuantityIncrease = () => quantityIncrease(id);
  const handleQuantityDecrease = () => quantityDecrease(id);
  const handleItemRemove = () => removeItemFromCart(id);

  return (
    <tr>
      <td>
        <img src={imageUrl} alt={`${name}`} />
      </td>
      <td>{name}</td>
      <td>
        <span onClick={handleQuantityDecrease}>&lt;</span>
        <span>{quantity}</span>
        <span onClick={handleQuantityIncrease}>&gt;</span>
      </td>
      <td>{price}</td>
      <td>
        <button onClick={handleItemRemove}>x</button>
      </td>
    </tr>
  );
};
export default CartProductRow;
