import styles from "./ProductDetailData.module.css";
import {
  OutlinedButton,
  FilledButton,
  OutlinedTextField,
  Dialog,
  Spinner,
  TextButton,
} from "../index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../../app/features/cart/cartSlice";
import { deleteProduct } from "../../app/features/products/productsSlice";

const validate = (quantityForm, property, errors, setErrors) => {
  const value = quantityForm[property]; // Convertir a número
  let newErrors = { ...errors };

  switch (property) {
    case "quantity":
      if (isNaN(value) || value < 1) {
        newErrors.quantity =
          "La cantidad debe ser un número mayor o igual a uno.";
      } else {
        newErrors.quantity = "";
      }
      break;

    default:
      break;
  }
  setErrors(newErrors);
};

const ProdDetailData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("Renderizando ProdDetailData"); // BORRAR

  const userRole = useSelector((state) => state.auth.role);
  const detailedProd = useSelector((state) => state.products.byId[id]);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [isProductDeleted, setIsProductDeleted] = useState(false);
  console.log("Esto es isProductDeleted acaba de nacer: ", isProductDeleted); //BORRAR
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [actionTaken, setActionTaken] = useState(""); // PUEDO USAR ESTE ESTADO COMO BANDERA DE ISDELETED Y ADDCART.
  const [quantityForm, setQuantityForm] = useState({ quantity: "" });
  const [errors, setErrors] = useState({ quantity: "" });
  const [formError, setFormError] = useState("");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // let currentImage;

  // useEffect(() => {
  //   if (detailedProd) {
  //     currentImage =
  //       detailedProd.imageUrl && detailedProd.imageUrl.length > 0
  //         ? detailedProd.imageUrl[currentImageIndex]
  //         : "a84a75b5-ffbd-40d9-ad31-4110e6ea7258.webp";
  //   }
  // }, [detailedProd]);

  // Función para pasar a la siguiente imagen
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === detailedProd.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para pasar a la imagen anterior
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? detailedProd.imageUrl.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    console.log("Esto es isProductDeleted en useEffect: ", isProductDeleted); // BORRAR
    if (isProductDeleted && !error) {
      setDialogContent({
        title: "Producto eliminado con éxito",
        content: "El producto se ha borrado correctamente.",
        redirectPath: "/",
        actions: (
          <>
            <TextButton
              text="Ir al Home"
              icon="home"
              onClick={() => {
                navigate("/");
                setIsProductDeleted(false);
              }}
            ></TextButton>
          </>
        ),
      });
      setShowDialog(true);
      console.log("showDialog", showDialog); // BORRAR
      console.log("dialogContent", dialogContent); // BORRAR
    }
    // Manejo de la adición al carrito
    else if (actionTaken === "addedToCart") {
      setDialogContent({
        title: "Producto añadido al carrito",
        content: "¿Te gustaría seguir comprando o ir al carrito?",
        actions: (
          <>
            <button
              onClick={() => {
                setActionTaken(""); // Resetea la acción para futuras adiciones
                setShowDialog(false);
              }}
            >
              Seguir Comprando
            </button>
            <button
              onClick={() => {
                navigate("/cart");
                setActionTaken(""); // Resetea la acción
              }}
            >
              Ir al Carrito
            </button>
          </>
        ),
      });
      setShowDialog(true);
    }
  }, [actionTaken, navigate, isProductDeleted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter.name;
    const noErrors = Object.values(errors).every((error) => error === "");

    if (userRole === "vendedor") {
      if (submitter === "edit") {
        console.log("Editar producto clickeado"); // BORRAR
        navigate(`/editproduct/${detailedProd.id}`);
      } else if (submitter === "delete") {
        const confirmed = window.confirm(
          "¿Estás seguro de que quieres eliminar este producto?"
        );

        if (confirmed) {
          console.log("Eliminar producto clickeado"); // BORRAR
          try {
            await dispatch(deleteProduct(detailedProd.id)).unwrap();
            setIsProductDeleted(true);
          } catch (error) {
            console.error("Error al eliminar el producto:", error);
          }
        }
      }
    } else {
      // Comprueba si la cantidad es válida o no se ha interactuado con el formulario
      if (noErrors || (noErrors && quantityForm.quantity === "")) {
        const quantity = quantityForm.quantity || 1; // Valor predeterminado de 1 si está vacío

        if (submitter === "addCart") {
          console.log("Agregar al carrito clickeado"); // BORRAR
          dispatch(addToCart(detailedProd.id, detailedProd.price, quantity));
          setActionTaken("addedToCart");
        } else if (submitter === "buyNow") {
          console.log("Comprar ahora clickeado"); // BORRAR
          dispatch(addToCart(detailedProd.id, detailedProd.price, quantity));
          navigate("/cart");
        }
      } else {
        setFormError(
          "Por favor corrija los errores en el formulario antes de continuar."
        );
      }
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setIsProductDeleted(false);
    setActionTaken("");
  };

  const handleQuantityChange = (event) => {
    const property = event.target.name;
    const value =
      event.target.value === "" ? "" : parseInt(event.target.value, 10);
    setQuantityForm({ ...quantityForm, [property]: value });
    validate(
      { ...quantityForm, [property]: value },
      property,
      errors,
      setErrors
    );
  };

  // const precioFormateado = detailedProd.price
  //   ? detailedProd.price.toLocaleString("es-AR", {
  //       style: "currency",
  //       currency: "ARS",
  //     })
  //   : "Precio no disponible";

  if (loading) return <Spinner></Spinner>;

  if (!detailedProd) {
    // Verifica si isProductDeleted es true antes de devolver el mensaje de error
    if (isProductDeleted) {
      return (
        <Dialog
          isOpen={true}
          onClose={handleDialogClose}
          title={dialogContent.title}
          content={dialogContent.content}
          actions={dialogContent.actions}
          redirectPath={dialogContent.redirectPath}
        />
      );
    }

    return (
      <>
        <p>El producto no existe o los datos no están disponibles.</p>
      </>
    );
  }

  return (
    <div className={`${styles.productDetail_container}`}>
      <div className={styles.productDetail_imageContainer}>
        <button onClick={handlePrevImage}>◀</button>
        <img
          src={detailedProd.imageUrl[currentImageIndex]}
          alt={`Imagen del producto ${currentImageIndex + 1}`}
          className={styles.productDetail_image}
        />
        <button onClick={handleNextImage}>▶</button>
      </div>
      <div className={`${styles.productDetail_underImage}`}>
        <span>
          {detailedProd.category} {">"} {detailedProd.subcategory}
        </span>
        <span>Stock disponible: {detailedProd.stock}</span>
        <span className={`${styles.productDetail_price}`}>
          {parseFloat(detailedProd.price).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </span>
      </div>
      <form onSubmit={handleSubmit} className={`${styles.productDetail_form}`}>
        {formError && <div className={styles.formError}>{formError}</div>}
        {userRole === "vendedor" ? (
          <>
            <FilledButton
              buttonType="submit"
              buttonText="Editar"
              buttonName="edit"
              buttonIcon=""
              buttonWidth="auto"
            />
            <OutlinedButton
              buttonType="submit"
              buttonText="Eliminar"
              buttonName="delete"
              buttonIcon=""
              buttonWidth="auto"
            />
          </>
        ) : (
          <>
            <OutlinedTextField
              inputType={"number"}
              inputName={"quantity"}
              inputLabel={"Cantidad"}
              inputPlaceholder={detailedProd.stock}
              inputValue={quantityForm.quantity}
              inputOnChange={handleQuantityChange}
              inputError={errors.quantity}
              inputLeadIcon={"fas fa-user"}
              inputTrailIcon={"fas fa-cancel"}
              inputWidth={"20rem"}
            />
            <FilledButton
              buttonType="submit"
              buttonText="Comprar Ahora"
              buttonName="buyNow"
              buttonIcon=""
              buttonWidth="auto"
            />
            <OutlinedButton
              buttonType="submit"
              buttonText="Agregar al Carrito"
              buttonName="addCart"
              buttonIcon=""
              buttonWidth="auto"
            />
          </>
        )}
        <Dialog
          isOpen={showDialog}
          onClose={handleDialogClose}
          title={dialogContent.title}
          content={dialogContent.content}
          actions={dialogContent.actions}
          redirectPath={dialogContent.redirectPath}
        />
      </form>

      <h3 className={`${styles.data_detailheadline}`}>Descripción</h3>
      <p className={`${styles.data_detail}`}> {detailedProd.description} </p>
    </div>
  );
};

export default ProdDetailData;
