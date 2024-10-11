import styles from "./Orders.module.css";
import { useMediaQuery } from "react-responsive";
import {
  OrdersContainer,
  NavDrawer,
  TopAppBar,
  Dialog,
  TextButton,
} from "../../components/index";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRole, useAuthRedirect } from "../../hooks/index";
import {
  fetchOrders,
  clearOrderError,
} from "../../app/features/orders/ordersSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.orders.error);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 838px)" });

  useAuthRedirect(false);
  const { hasPermission } = useRole(["vendedor"], "/");

  useEffect(() => {
    if (hasPermission) {
      dispatch(fetchOrders());
    }
  }, [dispatch, hasPermission]);

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
    <div className={`${styles.orders_container} `}>
      <TopAppBar
        title="Todas las Órdenes"
        leftBehavior={leftBehavior}
        rightBehavior={rightBehavior}
      ></TopAppBar>
      <NavDrawer
        isFixed={!isSmallScreen}
        isOpen={isSmallScreen && isDrawerOpen}
        onClose={handleCloseDrawer}
      />
      <div className={`${styles.orders}`}>
        <OrdersContainer />
      </div>
    </div>
  );
};

export default Orders;
