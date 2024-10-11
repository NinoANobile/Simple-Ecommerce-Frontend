import styles from "./FeaturedContainer.module.css";
import { ProdCardItem, Snackbar } from "../index";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../app/features/cart/cartSlice";

const FeaturedContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsById = useSelector((state) => state.products.byId);
  const featuredIds = useSelector((state) => state.products.featured);
  const userRole = useSelector((state) => state.auth.role || "usuario");

  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const featuredProducts = featuredIds.map((id) => productsById[id]);

  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    onClose: null,
    duration: null,
    actionName: "",
    action: null,
    enableCloseButton: true,
  });

  const handleButtonClick = (id, price, name) => {
    if (userRole === "usuario") {
      setSnackbar({
        isOpen: true,
        message: `${name} añadido al carrito`,
        onClose: handleSnackbarClose,
        duration: 4000,
        actionName: "Ir al carrito",
        action: () => navigate("/cart"),
        enableCloseButton: true,
      });
      // setIsDialogOpen(true);
      dispatch(addToCart(id, price, 1)); // Añade el producto al carrito con cantidad 1
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
    <section className={`${styles.featuredCards_container}`}>
      <h2 className={`${styles.featuredCards_headline}`}>
        {featuredProducts.length !== 0
          ? "Productos destacados"
          : "No hay productos destacados disponibles."}
      </h2>
      {featuredProducts.length !== 0 ? (
        <div className={`${styles.featuredCards}`}>
          {featuredProducts.map((prod) => (
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

export default FeaturedContainer;

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

// <section className={`${styles.cardscontainer}`}>
//   {featuredProducts.length === 0 ? (
//     <p>No featured products available.</p>
//   ) : (
//     featuredProducts.map((prod) => (
//       <ProdCardItem
//         key={prod.id}
//         id={prod.id}
//         name={prod.name}
//         description={prod.description}
//         brand={prod.brand}
//         price={prod.price}
//         stock={prod.stock}
//         images={prod.imageUrl}
//         buttonEnable={true}
//         buttonText={"X"}
//         buttonName={`${prod.name} ${"Delete"}`}
//         buttonIcon={null}
//         buttonOnClick={() => handleRemove(prod.id)}
//         buttonWidth={null}
//         onChange={(e) => handleQuantityChange(e, prod.id)}
//       />
//     ))
//   )}
// </section>
