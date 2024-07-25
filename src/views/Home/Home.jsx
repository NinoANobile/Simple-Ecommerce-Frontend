import styles from "../Home/Home.module.css";
import { useMediaQuery } from "react-responsive";
import SideSheet from "../../components/SideSheet/SideSheet";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import NavDrawer from "../../components/NavDrawer/NavDrawer";
import FeaturedContainer from "../../components/FeaturedContainer/FeaturedContainer";
import LogStateButton from "../../components/Develop/LogStateButton";
import FilteredProdContainer from "../../components/FilteredProdContainer/FilteredProdContainer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const categories = useSelector((state) => state.search.filters.category);
  const subcategories = useSelector(
    (state) => state.search.filters.subcategory
  );

  // Determinar si hay algún filtro activo
  const hasActiveFilters = categories.length > 0 || subcategories.length > 0;
  console.log(hasActiveFilters);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSideSheetOpen, setSideSheetOpen] = useState(false);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 699px)" });

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleOpenSideSheet = () => setSideSheetOpen(true);
  const handleCloseSideSheet = () => setSideSheetOpen(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.home_container}>
      <TopAppBar
        areMenuIcon={!isLargeScreen}
        areFilterIcon={isSmallScreen}
        onMenuClick={handleOpenDrawer}
        onFilterClick={handleOpenSideSheet}
      />
      <NavDrawer
        isFixed={isLargeScreen}
        isOpen={!isLargeScreen && isDrawerOpen}
        onClose={handleCloseDrawer}
      />
      <main className={styles.home_main}>
        {/* Aca tengo que hacer que cuando hay un filtro en el estado global,
      se renderice FilteredProdContainer y se deje de mostrar FeaturedProd. */}
        <div>
          {hasActiveFilters ? <FilteredProdContainer /> : <FeaturedContainer />}
        </div>
      </main>
      <SideSheet
        isFixed={!isSmallScreen}
        isOpen={isSmallScreen && isSideSheetOpen}
        onClose={handleCloseSideSheet}
        title="Filtros"
      ></SideSheet>
      <LogStateButton></LogStateButton>
    </div>
  );
};

export default Home;
