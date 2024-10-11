import styles from "./OrderHistory.module.css";
import { useMediaQuery } from "react-responsive";
import {
  OrdersContainer,
  NavDrawer,
  TopAppBar,
  Dialog,
  OrderDetail,
  TextButton,
} from "../../components/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthRedirect, useRole } from "../../hooks";
import { useNavigate } from "react-router-dom";
import {
  fetchOrderHistory,
  clearOrderError,
} from "../../app/features/orders/ordersSlice";
// import { fetchOrdersHistory } from "../../redux/actions";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const error = useSelector((state) => state.orders.error);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  // const [selectedOrder, setSelectedOrder] = useState(null);
  // const [showOrderDetail, setShowOrderDetail] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 838px)" });

  useAuthRedirect(false); // Asegura que el usuario esté autenticado
  useRole(["usuario"], "/"); // Descomentar y ajustar si necesitas restringir por roles

  useEffect(() => {
    dispatch(fetchOrderHistory(userId));
  }, [dispatch, userId]); // Asegúrate de incluir userId en las dependencias

  useEffect(() => {
    if (error) {
      setShowDialog(true);
    }
  }, [error]);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
    dispatch(clearOrderError()); // Limpiar el error en el estado global
  };

  // const handleShowOrderDetail = (order) => {
  //   setSelectedOrder(order);
  //   setShowOrderDetail(!showOrderDetail);
  // };

  const leftBehavior = isSmallScreen
    ? {
        type: "both",
        logo: "logo.png",
        logoAction: "/",
        icon: "menu",
        iconAction: handleOpenDrawer,
      }
    : {
        type: null,
        logo: "logo.png",
        logoAction: "/",
        icon: null,
        iconAction: null,
      };

  const rightBehavior = isSmallScreen
    ? {
        type: "icon",
        logo: null,
        logoAction: null,
        icon: null,
        iconAction: null,
        icon2: "arrow_back",
        iconAction2: () => navigate(-1),
        icon3: null,
        iconAction3: null,
      }
    : {
        type: "icon",
        logo: null,
        logoAction: null,
        icon: null,
        iconAction: null,
        icon2: "arrow_back",
        iconAction2: () => navigate(-1),
        icon3: null,
        iconAction3: null,
      };

  if (error) {
    return (
      <Dialog
        isOpen={showDialog}
        title="Error"
        content={error}
        actions={
          <TextButton
            text="Cerrar"
            icon="close"
            onClick={handleCloseDialog}
          ></TextButton>
        }
      />
    );
  }

  return (
    <div className={styles.orderHistory_container}>
      <TopAppBar
        title="Historial de Pedidos"
        leftBehavior={leftBehavior}
        rightBehavior={rightBehavior}
      ></TopAppBar>
      <NavDrawer
        isFixed={!isSmallScreen}
        isOpen={isSmallScreen && isDrawerOpen}
        onClose={handleCloseDrawer}
      />
      <div className={styles.orderHistory}>
        <OrdersContainer
        // cardOnClick={handleShowOrderDetail}
        />
      </div>
      {/* {showOrderDetail && showOrderDetail && (
        <div className={styles.orderDetails}>
          <OrderDetail order={selectedOrder} />
        </div>
      )} */}
    </div>
  );
};

export default OrderHistory;
