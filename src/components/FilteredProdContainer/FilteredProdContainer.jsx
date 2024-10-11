import styles from "./FilteredProdContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  ProdCardItem,
  ActiveFiltersContainer,
  FilterSummary,
  Snackbar,
} from "../index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../app/features/cart/cartSlice";

const FilteredProdContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsById = useSelector((state) => state.products.byId);
  const {
    category: categories,
    subcategory: subcategories,
    brand: brands,
    featured: isFeatured,
    query,
  } = useSelector((state) => state.productFilter);

  const userRole = useSelector((state) => state.auth.role || "usuario");

  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    onClose: null,
    duration: null,
    actionName: "",
    action: null,
    enableCloseButton: true,
  });

  // Convertir productsById que es un objeto en un arreglo de productos
  const allProducts = Object.values(productsById);

  const filteredProd = allProducts.filter((prod) => {
    // Filtro de búsqueda (solo si query no está vacío)
    const matchesQuery =
      !query ||
      prod.name.toLowerCase().includes(query.toLowerCase()) ||
      prod.description.toLowerCase().includes(query.toLowerCase());

    // Filtro de marca (solo si hay marcas especificadas)
    const matchesBrand = !brands.length || brands.includes(prod.brand);

    // Filtro de productos destacados
    const matchesFeatured = !isFeatured || prod.featured;

    // Filtro de categoría o subcategoría
    const matchesCategoryOrSubCategory =
      categories.includes(prod.category) ||
      subcategories.includes(prod.subcategory);

    // Devuelve true solo si todos los filtros necesarios son true
    // Podria poner este resultado en Results en el estado global si necesitara usarlo en otro componente.
    return (
      matchesQuery &&
      matchesBrand &&
      matchesFeatured &&
      (categories.length > 0 || subcategories.length > 0
        ? matchesCategoryOrSubCategory
        : true)
    );
  });

  console.log("Estos son los productos filtrados :", filteredProd);

  const handleButtonClick = (id, price, name) => {
    if (userRole === "usuario") {
      // setIsDialogOpen(true);

      // Mostrar la Snackbar
      setSnackbar({
        isOpen: true,
        message: `${name} añadido al carrito`,
        onClose: handleSnackbarClose,
        duration: 4000,
        actionName: "Ir al carrito",
        action: () => navigate("/cart"),
        enableCloseButton: true,
      });
      dispatch(addToCart(id, price, 1));
    } else if (userRole === "vendedor") {
      navigate(`/editproduct/${id}`);
    }
  };

  // Función para cerrar la Snackbar
  const handleSnackbarClose = () => {
    setSnackbar((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  return (
    <section className={`${styles.filteredCards_container}`}>
      {filteredProd.length !== 0 ? (
        <div className={`${styles.filteredCards_headline}`}>
          <ActiveFiltersContainer />
          <FilterSummary
            query={query}
            brands={brands}
            categories={categories}
            subcategories={subcategories}
            isFeatured={isFeatured}
          />
        </div>
      ) : (
        <h2 className={`${styles.filteredCards_headlineNone}`}>
          No hay productos disponibles.
        </h2>
      )}

      {filteredProd.length !== 0 ? (
        <div className={`${styles.filteredCards}`}>
          {filteredProd.map((prod) => (
            <ProdCardItem
              key={prod.id}
              id={prod.id}
              name={prod.name}
              description={prod.description}
              brand={prod.brand}
              price={prod.price}
              stock={prod.stock}
              images={prod.imageUrl}
              buttonEnable={true}
              buttonText={userRole === "usuario" ? "Add to Cart" : "Edit"}
              buttonName={`${prod.name} ${
                userRole === "usuario" ? "Add" : "Edit"
              }`}
              buttonIcon={""}
              buttonOnClick={() =>
                handleButtonClick(prod.id, prod.price, prod.name)
              }
              buttonWidth={null}
            />
          ))}
        </div>
      ) : (
        ""
      )}
      <Snackbar
        message={snackbar.message}
        isOpen={snackbar.isOpen}
        onClose={snackbar.onClose}
        duration={snackbar.duration}
        actionName={snackbar.actionName}
        action={snackbar.action}
        enableCloseButton={snackbar.enableCloseButton}
      />
    </section>
  );
};

export default FilteredProdContainer;

{
  /* <dialog open={isDialogOpen} className={styles.dialog}>
        <h2>Producto añadido al carrito</h2>
        <p>¿Qué te gustaría hacer ahora?</p>
        <div>
          <button onClick={() => setIsDialogOpen(false)}>
            Seguir comprando
          </button>
          <button
            onClick={() => {
              setIsDialogOpen(false);
              navigate("/cart");
            }}
          >
            Ir al carrito
          </button>
        </div>
      </dialog> */
}
