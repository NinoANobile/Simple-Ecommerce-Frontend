import styles from "./FilteredProdContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import ProdCardItem from "../ProdCardItem/ProdCardItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/actions";

const FilteredProdContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsById = useSelector((state) => state.products.byId);
  const categories = useSelector((state) => state.search.filters.category);
  const subcategories = useSelector(
    (state) => state.search.filters.subcategory
  );
  const userRole = useSelector((state) => state.auth.role || "cliente");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Convertir productsById que es un objeto en un arreglo de productos
  const allProducts = Object.values(productsById);

  // Filtrar productos por categoría y subcategoría
  const filteredProd = allProducts.filter((prod) => {
    // Verificar si el producto debe ser incluido basado en las categorías activas
    const isInCategory =
      categories.length === 0 || categories.includes(prod.category);
    // Verificar si el producto debe ser incluido basado en las subcategorías activas
    const isInSubCategory =
      subcategories.length === 0 || subcategories.includes(prod.subcategory);

    return isInCategory && isInSubCategory;
  });
  // Este toma todos los productos del estado global y los filtrs y los usa para renderizar los productos filtrados.

  const handleButtonClick = (id) => {
    if (userRole === "cliente") {
      setIsDialogOpen(true);
      dispatch(addToCart(id, 1)); // Añade el producto al carrito con cantidad 1
    } else if (userRole === "vendedor") {
      navigate(`/edit-product/${id}`);
    }
  };

  return (
    <section className={`${styles.cardscontainer}`}>
      <dialog open={isDialogOpen} className={styles.dialog}>
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
      </dialog>
      {filteredProd.length === 0 ? (
        <p>No featured products available.</p>
      ) : (
        filteredProd.map((prod) => (
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
            buttonText={userRole === "cliente" ? "Add to Cart" : "Edit"}
            buttonName={`${prod.name} ${
              userRole === "cliente" ? "Add" : "Edit"
            }`}
            buttonIcon={""}
            buttonOnClick={() => handleButtonClick(prod.id)}
            buttonWidth={null}
          />
        ))
      )}
    </section>
  );
};

export default FilteredProdContainer;
