import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import CartProductRow from "../cart-product-row/cart-product-row.component";
import "./cart-products-table.styles.scss";

const CartProductsTable = () => {
  const { cartItems, totalCartPrice } = useContext(CartContext);
  const tableHeadTitles = [
    "Product",
    "Description",
    "Quantity",
    "Price",
    "Remove",
  ];
  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableHeadTitles.map((title, i) => (
              <th key={i}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <CartProductRow key={cartItem.id} cartItem={cartItem} />
          ))}
        </tbody>
      </table>
      <span>TOTAL: ${totalCartPrice}</span>
    </div>
  );
};
export default CartProductsTable;
