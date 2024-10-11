import styles from "./OrderDetail.module.css";

const OrderDetail = ({ order }) => {
  const orderDetails = order.OrderDetails || [];

  return (
    <div className={styles.orderCard_container}>
      <div className={styles.orderCard_OrderDetail}>
        {/* <h2 className={styles.orderCard_headline}>Pedido: {order.id}</h2> */}
        {/* <p className={styles.orderCard_date}>Realizado el {order.createdAt}</p> */}
        {/* <p className={styles.orderCard_price}>Total: ${order.totalAmount}</p> */}
        {/* <p>{order.orderStatus}</p> */}
        <p>Método de Pago: {order.paymentMethod}</p>
        <p>Método de Envío: {order.shippingMethod}</p>

        <p>Notas: {order.notes || "Ninguna"}</p>
        <div>
          {/* <p className={styles.orderCard_items}>{orderDetails.length} items</p> */}
          Detalles de la Orden:
          <ul>
            {orderDetails.map((detail) => (
              <li key={detail.productId}>
                Nombre: {detail.Product.name}, Cantidad: {detail.quantity},
                Precio: ${detail.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
