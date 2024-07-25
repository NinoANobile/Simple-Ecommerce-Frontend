import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrdersContainer from "../../components/OrdersContainer/OrdersContainer";
import { fetchOrders } from "../../redux/actions";
import useAuth from "../../components/Hooks/useAuth";

const Orders = () => {
  const dispatch = useDispatch();
  const { hasPermission, redirectIfUnauthorized } = useAuth(["vendedor"]); // Quienes puede ver esta pagina?
  const ordersById = useSelector((state) => state.orders.byId);
  const orderDetailsById = useSelector((state) => state.orderDetails.byId);

  useEffect(() => {
    if (hasPermission) {
      dispatch(fetchOrders());
    } else {
      redirectIfUnauthorized("/"); // Redirige si no tiene permiso, ajustar según necesidad
    }
  }, [dispatch, hasPermission, redirectIfUnauthorized]);

  // Previene que el componente se renderice antes de verificar los permisos
  if (!hasPermission) {
    return <div>Cargando...</div>;
  }

  const combinedOrders = Object.values(ordersById).map((order) => ({
    // Aca se combinan las orders y orderDetails.
    ...order,
    OrderDetails: Object.values(orderDetailsById).filter(
      (detail) => detail.orderId === order.id
    ),
  }));

  return (
    <div>
      <h1>Todas las Órdenes</h1>
      <OrdersContainer orders={combinedOrders} />
    </div>
  );
};

export default Orders;
