import styles from "./OrdersContainer.module.css";
import OrderCard from "../OrderCard/OrderCard";

const OrdersContainer = ({ orders }) => {
  return (
    <div>
      {Object.values(orders).map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersContainer;
