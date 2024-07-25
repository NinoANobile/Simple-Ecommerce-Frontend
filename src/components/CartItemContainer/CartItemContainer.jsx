import styles from "../CartItemContainer/CartItemContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { removeFromCart, updateCartItem } from "../../redux/actions";

const CartItemContainer = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.byId);
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

  return (
    <div className={styles.cartItemContainer}>
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
          inputPlaceholder={`${item.stock} un.`}
          inputValue={item.quantity}
          inputOnChange={(e) => handleQuantityChange(e, item.id)}
          buttonEnable={true}
          buttonText="X"
          buttonName={`${item.name} Delete`}
          buttonOnClick={() => handleRemove(item.id)}
        />
      ))}
    </div>
  );
};

export default CartItemContainer;
