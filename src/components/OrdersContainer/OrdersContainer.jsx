import styles from "./OrdersContainer.module.css";
import { OrderCard, Spinner } from "../index";
import { useSelector } from "react-redux";

const OrdersContainer = () => {
  const ordersById = useSelector((state) => state.orders.byId);
  const loading = useSelector((state) => state.productFilter.loading);

  if (loading) return <Spinner></Spinner>;

  // Ordenar las órdenes por fecha de creación (más nuevas primero)
  const sortedOrders = Object.values(ordersById).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className={styles.orderHistory_container}>
      {sortedOrders.length === 0 ? (
        <p>Aún no hay órdenes.</p>
      ) : (
        <>
          {sortedOrders.map((order) => (
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
