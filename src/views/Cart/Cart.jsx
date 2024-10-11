import styles from "../Cart/Cart.module.css";
import { useMediaQuery } from "react-responsive";
import {
  CartItemContainer,
  OrderForm,
  TopAppBar,
  NavDrawer,
  Dialog,
} from "../../components/index";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearOrderError } from "../../app/features/orders/ordersSlice";

// En este componente tengo que manejar el posible error de la ceracion de la orden.
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const error = useSelector((state) => state.orders.error);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const isMediumScreen = useMediaQuery({ query: "(min-width: 839px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 838px)" });

  useEffect(() => {
    if (error) {
      setShowDialog(true);
    }
  }, [error]);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
    dispatch(clearOrderError());
  };

  const handleShowOrderForm = () => {
    setShowOrderForm(true); // Muestra el OrderForm y oculta el botón
  };

  const handleHideOrderForm = () => {
    setShowOrderForm(false); // Muestra el OrderForm y oculta el botón
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

  const rightBehavior = !isMediumScreen
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
        onClose={handleCloseDialog}
        title="Error al Cargar el pedido"
        content={error}
        actions={<button onClick={handleCloseDialog}>Cerrar</button>}
      />
    );
  }

  return (
    <div className={styles.cart_container}>
      <TopAppBar
        title="Carrito"
        rightBehavior={rightBehavior}
        leftBehavior={leftBehavior}
      />
      <NavDrawer
        isFixed={!isSmallScreen}
        isOpen={isSmallScreen && isDrawerOpen}
        onClose={handleCloseDrawer}
      />

      {showOrderForm && (
        // Si el botón se presionó, muestra el OrderForm
        <div className={styles.cart}>
          <OrderForm onButtonClick={handleHideOrderForm} />
        </div>
      )}

      {!showOrderForm && (
        <div className={styles.cart}>
          {Object.keys(items).length === 0 ? (
            <h2 className={styles.cart_headlineNone}>El carrito está vacío</h2>
          ) : (
            <>
              <CartItemContainer onButtonClick={handleShowOrderForm} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
