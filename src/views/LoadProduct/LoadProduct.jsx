import styles from "./LoadProduct.module.css";
import { useMediaQuery } from "react-responsive";
import {
  LoadProductForm,
  NavDrawer,
  TopAppBar,
  Dialog,
  TextButton,
} from "../../components/index";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthRedirect, useRole } from "../../hooks/index";
import { clearProductError } from "../../app/features/products/productsSlice";

const LoadProduct = () => {
  const dispatch = useDispatch();
  useAuthRedirect(false); // Asegura que el usuario esté autenticado, pero no redirige si ya lo está
  useRole(["vendedor"], "/"); // Redirige si no tiene el rol adecuado

  const navigate = useNavigate();

  const error = useSelector((state) => state.products.error);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 838px)" });

  useEffect(() => {
    if (error) {
      setShowDialog(true);
    }
  }, [error]);

  const handleCloseDialog = () => {
    setShowDialog(false);
    dispatch(clearProductError()); // Limpiar el error en el estado global
  };

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

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
    <div className={`${styles.loadProduct_container}`}>
      <TopAppBar
        title="Cargar Productos"
        leftBehavior={leftBehavior}
        rightBehavior={rightBehavior}
      ></TopAppBar>
      <NavDrawer
        isFixed={!isSmallScreen}
        isOpen={isSmallScreen && isDrawerOpen}
        onClose={handleCloseDrawer}
      />
      <div className={`${styles.loadProduct} `}>
        <LoadProductForm />
      </div>
    </div>
  );
};

export default LoadProduct;
