import styles from "../CartItemContainer/CartItemContainer.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, FilledButton, Spinner } from "../index";
import {
  clearCart,
  removeFromCart,
  updateCartItem,
} from "../../app/features/cart/cartSlice";

const CartItemContainer = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.byId);
  const loading = useSelector((state) => state.productFilter.loading);
  const totalAmount = useSelector((state) => state.cart.totalAmount || 0);

  console.log("Cart items:", cartItems);
  console.log("Products:", products);

  const dispatch = useDispatch();

  // Combinar información del carrito con la de los productos
  const fullCartItems = Object.keys(cartItems)
    .map((key) => {
      const product = products[key];
      if (!product) {
        console.log("Producto no encontrado:", key); // Agregar esto puede ayudar a identificar si se está perdiendo algún producto.
        return null;
      }
      return {
        ...product,
        quantity: cartItems[key].quantity,
      };
    })
    .filter((item) => item !== null); // Esta línea elimina cualquier producto que no haya sido encontrado.

  console.log(fullCartItems);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (e, id) => {
    const newQuantity = parseInt(e.target.value); // Convierte el string del input a numero.
    if (newQuantity > 0) {
      dispatch(updateCartItem(id, newQuantity));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <>
      <div className={styles.cartItemContainer_header}>
        <h1 className={styles.cartItemContainer_headline}> Pedido </h1>
        <FilledButton
          buttonType="button"
          buttonText="Limpiar Carrito"
          buttonName="clearCart"
          buttonIcon=""
          buttonOnClick={handleClearCart}
          buttonWidth="10rem"
        />
      </div>
      <div className={styles.cartItemContainer_container}>
        {fullCartItems.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            stock={item.stock}
            imageUrl={item.imageUrl}
            stars={item.stars}
            category={item.category}
            subcategory={item.subcategory}
            inputEnable={true}
            inputType="number"
            inputName={`${item.name} Quantity`}
            inputLabel="Cantidad"
            inputWidth="5rem"
            // inputPlaceholder={`${item.stock} un.`}
            inputPlaceholder=""
            inputValue={item.quantity}
            inputOnChange={(e) => handleQuantityChange(e, item.id)}
            buttonEnable={true}
            buttonText=""
            buttonIcon="delete"
            buttonName={`${item.name} Delete`}
            buttonOnClick={() => handleRemove(item.id)}
          />
        ))}
        <div className={styles.cartItemContainer_footer}>
          <h3 className={styles.cartItemContainer_totalAmount}>
            Total:
            {totalAmount.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
          </h3>
          <FilledButton
            buttonType="button"
            buttonText="Siguiente paso"
            buttonName="purchase"
            buttonIcon=""
            buttonOnClick={props.onButtonClick}
            buttonWidth="10rem"
          />
        </div>
      </div>
    </>
  );
};

export default CartItemContainer;
