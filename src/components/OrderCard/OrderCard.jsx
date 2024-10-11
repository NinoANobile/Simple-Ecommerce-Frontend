import styles from "./OrderCard.module.css";
import { OrderDetail } from "../index";
import { useState } from "react";

const OrderCard = ({
  order,
  // cardOnClick
}) => {
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const orderDetails = order.OrderDetails || [];

  const handleShowOrderDetail = () => {
    // setSelectedOrder(order);
    setShowOrderDetail(!showOrderDetail);
  };

  return (
    <>
      <div
        className={styles.orderCard_container}
        onClick={handleShowOrderDetail}
        tabIndex={0}
      >
        <div className={styles.orderCard_left}>
          <h2 className={styles.orderCard_headline}>Pedido: {order.id}</h2>
          <p className={styles.orderCard_date}>
            Realizado el {order.createdAt}
          </p>
          <p className={styles.orderCard_price}>Total: ${order.totalAmount}</p>
        </div>
        <div className={styles.orderCard_right}>
          <p>{order.orderStatus}</p>
          <p className={styles.orderCard_items}>{orderDetails.length} items</p>
        </div>
      </div>
      {showOrderDetail && <OrderDetail order={order} />}
    </>
  );
};

export default OrderCard;
