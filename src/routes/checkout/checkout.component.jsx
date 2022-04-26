import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const tableHeaderTitles = [
    "Product",
    "Description",
    "Quantity",
    "Price",
    "Remove",
  ];
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {tableHeaderTitles.map((title, i) => (
          <div key={i} className="header-block">
            <span>{title}</span>
          </div>
        ))}
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} {...{ cartItem }} />
      ))}
      <span className="total">TOTAL: ${cartTotal}</span>
    </div>
  );
};

export default Checkout;
