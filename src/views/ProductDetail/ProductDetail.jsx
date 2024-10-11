import styles from "./ProductDetail.module.css";
import { useMediaQuery } from "react-responsive";
import {
  ProductDetailData,
  ProductDetailData2,
  NavDrawer,
  TopAppBar,
  Dialog,
  TextButton,
} from "../../components/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  clearProductError,
} from "../../app/features/products/productsSlice";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const error = useSelector((state) => state.products.error);

  // const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 838px)" });

  useEffect(() => {
    dispatch(fetchProductDetails(id)); // Actualizo los datos desde el servidor por si otro vendedor hizo alguna modificacion.
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Error detected en ProductDetail, showing dialog:", error);
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

  // Renderizado principal si no hay error
  return (
    <div className={`${styles.productDetail_container} `}>
      <TopAppBar
        title=""
        leftBehavior={leftBehavior}
        rightBehavior={rightBehavior}
      />
      {/* <NavDrawer
        isFixed={isMediumScreen}
        isOpen={!isMediumScreen && isDrawerOpen}
        onClose={handleCloseDrawer}
      /> */}
      <div className={`${styles.productDetail}`}>
        <ProductDetailData />
      </div>
    </div>
  );
};

export default ProductDetail;
