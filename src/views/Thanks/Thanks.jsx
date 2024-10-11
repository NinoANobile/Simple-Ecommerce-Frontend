import styles from "./Thanks.module.css";
import axios from "axios";
import { TopAppBar, FilledButton } from "../../components/index";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation, Navigate } from "react-router-dom";
import { fetchLastOrder } from "../../app/features/orders/ordersSlice";

const Thanks = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  if (!location.state?.fromPurchase) {
    // Si no se accedió a la página a través del flujo esperado, redirigir inmediatamente
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const userId = useSelector((state) => state.auth.userId);

  // useEffect(() => {
  //   if (userId) {
  //     axios
  //       .get(`http://localhost:3000/orders/lastOrder?userId=${userId}`)
  //       .then((response) => setOrder(response.data))
  //       .catch((error) =>
  //         console.error("Error al obtener la última orden", error)
  //       );
  //   }
  // }, [userId]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (userId) {
        try {
          const response = await dispatch(fetchLastOrder(userId)).unwrap();
          setOrder(response);
        } catch (error) {
          console.error("Error al obtener la última orden:", error);
        }
      }
    };

    fetchOrder();
  }, [userId, dispatch]);

  // const leftBehavior = {
  //   type: "back", // Puede ser both, back o null.
  //   icon: "\u2190",
  //   action: () => navigate("/"),
  // };

  // const rightBehavior = {
  //   type: null, // Cambiado a 'both' por defecto para la demostración
  //   menuIcon: "",
  //   logoIcon: "",
  //   menuAction: null,
  //   logoAction: "",
  // };

  console.log(order);

  return (
    <div className={styles.thanks_container}>
      {/* SIEMPRE TENGO QUE RENDERIZAR LOS DETALLES DE LA ORDEN UNA VEZ QUE EL COMPONENTE SE HAYA ACTUALIZADO!!!! */}
      {order ? (
        <>
          <div className={styles.thanks}>
            <h1 className={styles.thanks_headline}>¡Gracias por su compra!</h1>
            <div className={styles.thanks_top}>
              <div className={styles.thanks_topKeys}>
                <span>Numero de pedido: </span>
                <span>Monto total: </span>
              </div>
              <div className={styles.thanks_topValues}>
                <span>{order.id}</span>
                <span>
                  {parseFloat(order.totalAmount).toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </span>
                <span>{order.orderStatus} </span>
              </div>
            </div>
            <div>
              <div className={styles.thanks_mid}>
                <span>
                  Fecha del pedido: {new Date(order.createdAt).toLocaleString()}
                </span>
                <span>Metodo de pago: {order.paymentMethod}</span>
                <span>Sobre el envio: {order.shippingMethod}</span>
              </div>
              <div className={styles.thanks_bot}>
                {order.OrderDetails.map((prod, index) => (
                  <div className={styles.thanks_prodContainer} key={index}>
                    <span>{prod.productId}</span>
                    <span>Cantidad: {prod.quantity}</span>
                    <span>Precio: {prod.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.thanks_buttonContainer}>
              <FilledButton
                buttonText={"Ver en pedidos"}
                buttonName={"verEnPedidos"}
                buttonIcon={null}
                buttonOnClick={() => navigate("/history")}
              ></FilledButton>
              <FilledButton
                buttonText={"Segui comprando"}
                buttonName={"seguirComprando"}
                buttonIcon={null}
                buttonOnClick={() => navigate("/")}
              ></FilledButton>
            </div>
          </div>
        </>
      ) : (
        <p>Aún no se han realizado pedidos.</p>
      )}
    </div>
  );
};
export default Thanks;
