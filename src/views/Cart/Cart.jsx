import styles from "../Cart/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import CartItemContainer from "../../components/CartItemContainer/CartItemContainer";
import OrderForm from "../../components/OrderForm/OrderForm";
import FilledButton from "../../components/Buttons/FilledButton";
import { clearCart } from "../../redux/actions";
import { useEffect } from "react";

const Cart = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {}, [cart]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.cart_container}>
      <h2>Tu Carrito</h2>
      {Object.keys(cart.items).length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className={styles.cart_body}>
          <CartItemContainer />
          <div className={styles.cart_summary}>
            <h3>
              Total:
              {totalAmount.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </h3>
            <FilledButton
              buttonType="button"
              buttonText="Limpiar Carrito"
              buttonName="clearCart"
              buttonIcon=""
              buttonOnClick={handleClearCart}
              buttonWidth="10rem"
            ></FilledButton>
          </div>
          <OrderForm></OrderForm>
        </div>
      )}
    </div>
  );
};

export default Cart;
