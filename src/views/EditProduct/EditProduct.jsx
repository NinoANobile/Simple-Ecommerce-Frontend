import styles from "./EditProduct.module.css";
import { useMediaQuery } from "react-responsive";
import {
  EditProductForm,
  NavDrawer,
  TopAppBar,
  Dialog,
} from "../../components/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthRedirect, useRole } from "../../hooks/index";
import {
  fetchProductDetails,
  clearProductError,
} from "../../app/features/products/productsSlice";

const EditProduct = () => {
  useAuthRedirect(false); // Asegura que el usuario esté autenticado, pero no redirige si ya lo está
  useRole(["vendedor"], "/"); // Redirige si no tiene el rol adecuado

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.byId[id]);
  const error = useSelector((state) => state.products.error);

  // const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 838px)" });

  useEffect(() => {
    dispatch(fetchProductDetails(id)); // Actualizo los datos desde el servidor por si otro vendedor hizo alguna modificacion.
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      setShowDialog(true);
    }
  }, [error]);

  // const handleOpenDrawer = () => setDrawerOpen(true);
  // const handleCloseDrawer = () => setDrawerOpen(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
    dispatch(clearProductError()); // Limpiar el error en el estado global
  };

  const leftBehavior = {
    type: "logo",
    logo: "http://localhost:5173/logo.png",
    logoAction: "/",
    icon: null,
    iconAction: null,
  };

  const rightBehavior = {
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
        title="Error al Cargar Producto"
        content={error}
        actions={<button onClick={handleCloseDialog}>Cerrar</button>}
      />
    );
  }

  return (
    <div className={`${styles.editProduct_container} `}>
      <TopAppBar
        title="Editar Producto"
        leftBehavior={leftBehavior}
        rightBehavior={rightBehavior}
      ></TopAppBar>
      {/* <NavDrawer
        isFixed={isMediumScreen}
        isOpen={!isMediumScreen && isDrawerOpen} 
        onClose={handleCloseDrawer}
      /> */}
      <div className={`${styles.editProduct} `}>
        {product ? (
          <EditProductForm
          // key={id} product={product}
          />
        ) : (
          <p>Producto no encontrado</p>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
