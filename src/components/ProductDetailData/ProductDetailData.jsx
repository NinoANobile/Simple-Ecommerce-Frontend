import styles from "./ProductDetailData.module.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions";
import OutlinedButton from "../Buttons/OutlinedButton";
import FilledButton from "../Buttons/FilledButton";
import OutlinedTextField from "../TextField/OutlinedTextField";

const ProdDetailData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prods = useSelector((state) => state.products.byId);

  const { id } = useParams();
  const [prodDetail, setProdDetail] = useState({});
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const filteredProd = Object.values(prods).find((prod) => prod.id === id);
    if (filteredProd) {
      setProdDetail(filteredProd);
    } else {
      console.log("Producto no encontrado con el ID:", id);
    }
    console.log(filteredProd);
  }, [id, prods]);

  console.log("Esto es prodDetail :", prodDetail);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado (evento prevenido)");

    const submitter = e.nativeEvent.submitter;

    if (submitter.name === "addCart") {
      console.log("Agregar al carrito clickeado");

      dispatch(addToCart(prodDetail.id, quantity));
    } else if (submitter.name === "buyNow") {
      console.log("Comprar ahora clickeado");
      dispatch(addToCart(prodDetail.id, quantity));
      navigate("/cart");
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Asegurarse de que la cantidad sea al menos 1
  };

  const precioFormateado = prodDetail.price
    ? prodDetail.price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })
    : "Precio no disponible";

  return (
    <div className={`${styles.datacontainer}`}>
      <div className={`${styles.data_category}`}>
        {prodDetail.category} {">"} {prodDetail.subcategory}
      </div>
      <div className={`${styles.data_calstock}`}>
        <h2 className={`${styles.data_cal}`}>
          Stock disponible: {prodDetail.stock}
        </h2>
      </div>
      <div className={`${styles.data_imagecontainer}`}>
        <img
          className={`${styles.data_image}`}
          src={
            prodDetail.imageUrl && prodDetail.imageUrl.length > 0
              ? prodDetail.imageUrl[0]
              : "path_to_default_image.jpg"
          }
        ></img>
      </div>
      <h2 className={`${styles.data_price}`}>{precioFormateado}</h2>
      <form onSubmit={handleSubmit} className={`${styles.data_form}`}>
        <OutlinedTextField
          inputType={"number"}
          inputName={"shopQuantity"}
          inputLabel={"Cantidad"}
          inputPlaceholder={prodDetail.stock}
          inputValue={quantity}
          inputOnChange={handleQuantityChange}
          inputError={null}
          inputLeadIcon={"fas fa-user"}
          inputTrailIcon={"fas fa-cancel"}
        />
        <FilledButton
          buttonType="submit"
          buttonText="Comprar Ahora"
          buttonName="buyNow"
          buttonIcon=""
          buttonOnClick={null}
          buttonWidth="auto"
        ></FilledButton>
        <OutlinedButton
          buttonType="submit"
          buttonText="Agregar al Carrito"
          buttonName="addCart"
          buttonIcon=""
          buttonOnClick={null}
          buttonWidth="auto"
        />
      </form>

      <h3 className={`${styles.data_detailheadline}`}>Descripción</h3>
      <p className={`${styles.data_detail}`}> {prodDetail.description} </p>
    </div>
  );
};

export default ProdDetailData;
