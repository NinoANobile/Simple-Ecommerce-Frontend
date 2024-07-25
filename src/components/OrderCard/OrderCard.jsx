import styles from "./OrderCard.module.css";

const OrderCard = ({ order }) => {
  const orderDetails = order.OrderDetails || [];

  return (
    <div className={styles.orderCard}>
      <h3>Orden ID: {order.id}</h3>
      <p>Estatus: {order.orderStatus}</p>
      <p>Método de Pago: {order.paymentMethod}</p>
      <p>Método de Envío: {order.shippingMethod}</p>
      <p>Total: ${order.totalAmount}</p>
      <p>Notas: {order.notes || "Ninguna"}</p>
      <div>
        Detalles de la Orden:
        <ul>
          {orderDetails.map((detail) => (
            <li key={detail.id}>
              Producto ID: {detail.productId}, Cantidad: {detail.quantity},
              Precio: ${detail.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderCard;
