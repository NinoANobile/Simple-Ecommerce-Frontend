import styles from "../Home/Home.module.css";
import { useMediaQuery } from "react-responsive";
import {
  StandardSideSheet,
  ModalSideSheet,
  TopAppBar,
  NavDrawer,
  FeaturedContainer,
  FilteredProdContainer,
  Dialog,
  TextButton,
  Spinner,
} from "../../components/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/features/products/productsSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const filters = useSelector((state) => state.productFilter);

  // Determinar si hay algún filtro activo
  const hasActiveFilters =
    filters.query.trim() !== "" || // Si la query tiene valor
    filters.category.length > 0 ||
    filters.subcategory.length > 0 ||
    filters.brand.length > 0 ||
    filters.featured === true;

  const [showDialog, setShowDialog] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSideSheetOpen, setSideSheetOpen] = useState(false);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 699px)" });

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleOpenSideSheet = () => setSideSheetOpen(!isSideSheetOpen);
  const handleCloseSideSheet = () => setSideSheetOpen(false);

  useEffect(() => {
    if (error) {
      setShowDialog(true);
    }
  }, [error]);

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

  const rightBehavior = {
    type: "icon",
    logo: null,
    logoAction: null,
    icon: null,
    iconAction: null,
    icon2: "filter_alt",
    iconAction2: handleOpenSideSheet,
    icon3: null,
    iconAction3: null,
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  // console.log("Esto es isSmallScreen: ", isSmallScreen);
  // console.log("Esto es isSideSheetOpen: ", isSideSheetOpen);
  console.log(import.meta.env.VITE_API_URL); // Verifica si se muestra la URL del túnel

  if (loading) return <Spinner></Spinner>;
  // if (error) return <p>Error: {error}. </p>;

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
    <div className={styles.home_container}>
      <TopAppBar
        title="Inicio"
        leftBehavior={leftBehavior}
        rightBehavior={rightBehavior}
      />
      <NavDrawer
        isFixed={!isSmallScreen}
        isOpen={isSmallScreen && isDrawerOpen}
        onClose={handleCloseDrawer}
      />
      {isLargeScreen ? (
        <StandardSideSheet
          isOpen={isSideSheetOpen}
          onClose={handleCloseSideSheet}
          title="Filtros"
        />
      ) : (
        <ModalSideSheet
          isOpen={isSideSheetOpen}
          onClose={handleCloseSideSheet}
          title="Filtros"
        />
      )}
      <main className={styles.home_main}>
        {hasActiveFilters ? <FilteredProdContainer /> : <FeaturedContainer />}
      </main>
    </div>
  );
};

export default Home;

// import styles from "../Home/Home.module.css";
// import { useMediaQuery } from "react-responsive";
// import {
//   StandardSideSheet,
//   ModalSideSheet,
//   TopAppBar,
//   NavDrawer,
//   FeaturedContainer,
//   FilteredProdContainer,
// } from "../../components/index";
// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../app/features/products/productsSlice";

// const Home = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const loading = useSelector((state) => state.products.loading);
//   const error = useSelector((state) => state.products.error);

//   const filters = useSelector((state) => state.productFilter);

//   // Determinar si hay algún filtro activo
//   const hasActiveFilters =
//     filters.query.trim() !== "" ||
//     filters.category.length > 0 ||
//     filters.subcategory.length > 0 ||
//     filters.brand.length > 0 ||
//     filters.featured === true;

//   const [isDrawerOpen, setDrawerOpen] = useState(false);
//   const [isSideSheetOpen, setSideSheetOpen] = useState(false); // Mantenemos este estado para StandardSideSheet
//   const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });
//   const isSmallScreen = useMediaQuery({ query: "(max-width: 699px)" });

//   const sideSheetRef = useRef(null); // Referencia para el popover en ModalSideSheet

//   const handleOpenDrawer = () => setDrawerOpen(true);
//   const handleCloseDrawer = () => setDrawerOpen(false);

//   // Alternar el estado de StandardSideSheet
//   const handleOpenSideSheet = () => {
//     if (isSideSheetOpen) {
//       setSideSheetOpen(false);
//     } else setSideSheetOpen(true);
//   };
//   const handleCloseSideSheet = () => setSideSheetOpen(false);

//   // Usar la referencia para controlar el popover en ModalSideSheet
//   const handleToggleSideSheetPopover = () => {
//     const sideSheetPopover = sideSheetRef.current;
//     if (sideSheetPopover) {
//       sideSheetPopover.showPopover(); // Alternar el popover usando la referencia
//     }
//   };

//   const leftBehavior = isSmallScreen
//     ? {
//         type: "both",
//         logo: "logo.png",
//         logoAction: "/",
//         icon: "menu",
//         iconAction: handleOpenDrawer,
//       }
//     : {
//         type: null,
//         logo: "logo.png",
//         logoAction: "/",
//         icon: null,
//         iconAction: null,
//       };

//   const rightBehavior = !isLargeScreen
//     ? {
//         type: "icon",
//         logo: null,
//         logoAction: null,
//         icon: null,
//         iconAction: null,
//         icon2: "filter_alt",
//         iconAction2: handleToggleSideSheetPopover, // Controla el popover en pantallas pequeñas
//         icon3: null,
//         iconAction3: null,
//       }
//     : {
//         type: "icon",
//         logo: null,
//         logoAction: null,
//         icon: null,
//         iconAction: null,
//         icon2: "filter_alt",
//         iconAction2: handleOpenSideSheet, // Controla el StandardSideSheet en pantallas grandes
//         icon3: null,
//         iconAction3: null,
//       };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className={styles.home_container}>
//       <TopAppBar
//         title="Inicio"
//         leftBehavior={leftBehavior}
//         rightBehavior={rightBehavior}
//       />

//       <NavDrawer
//         isFixed={!isSmallScreen}
//         isOpen={isSmallScreen && isDrawerOpen}
//         onClose={handleCloseDrawer}
//       />

//       {isLargeScreen ? (
//         <StandardSideSheet
//           isOpen={isSideSheetOpen} // Mantener el control para pantallas grandes
//           onClose={handleCloseSideSheet}
//           title="Filtros"
//         />
//       ) : (
//         <ModalSideSheet
//           ref={sideSheetRef} // Usamos la referencia para controlar el popover en pantallas pequeñas
//           title="Filtros"
//         />
//       )}

//       <main className={styles.home_main}>
//         <div>
//           {hasActiveFilters ? <FilteredProdContainer /> : <FeaturedContainer />}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Home;
