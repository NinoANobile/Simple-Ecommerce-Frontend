import styles from "./OrdersContainer.module.css";
import { OrderCard, Spinner } from "../index";
import { useSelector } from "react-redux";

const OrdersContainer = ({ cardOnClick }) => {
  const ordersById = useSelector((state) => state.orders.byId);
  const loading = useSelector((state) => state.productFilter.loading);

  if (loading) return <Spinner></Spinner>;

  return (
    <div className={styles.orderHistory_container}>
      {ordersById.length === 0 ? (
        <p>Aún no hay órdenes.</p>
      ) : (
        <>
          {Object.values(ordersById).map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              // cardOnClick={() => cardOnClick(order)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default OrdersContainer;
