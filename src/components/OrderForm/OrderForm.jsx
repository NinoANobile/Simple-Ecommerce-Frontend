import styles from "./OrderForm.module.css";
import { FilledButton, OutlinedButton, OutlinedTextField } from "../index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, checkStock } from "../../app/features/orders/ordersSlice";
import { clearCart as clearShoppingCart } from "../../app/features/cart/cartSlice";

const validate = (shipForm, setErrors, errors, property) => {
  const provinces = [
    "Buenos Aires",
    "Córdoba",
    "Santa Fe",
    "Mendoza",
    "Tucumán",
  ];
  switch (property) {
    case "CartAdress":
      if (!shipForm.CartAdress)
        setErrors({
          ...errors,
          CartAdress: "Este campo no puede estar vacío.",
        });
      else setErrors({ ...errors, CartAdress: "" });
      break;

    case "CartAdressNumber":
      if (
        !shipForm.CartAdressNumber ||
        isNaN(shipForm.CartAdressNumber) ||
        shipForm.CartAdressNumber <= 0
      )
        setErrors({
          ...errors,
          CartAdressNumber: "Debe ser un número positivo.",
        });
      else setErrors({ ...errors, CartAdressNumber: "" });
      break;

    case "CartProvince":
      if (!shipForm.CartProvince)
        setErrors({
          ...errors,
          CartProvince: "Este campo no puede estar vacío.",
        });
      else if (!provinces.includes(shipForm.CartProvince))
        setErrors({
          ...errors,
          CartProvince: "Debe ser una provincia válida de Argentina.",
        });
      else setErrors({ ...errors, CartProvince: "" });
      break;

    case "CartCP":
      if (!shipForm.CartCP || !/^\d{4}$/.test(shipForm.CartCP))
        setErrors({
          ...errors,
          CartCP: "Debe ser un código postal válido de 4 dígitos.",
        });
      else setErrors({ ...errors, CartCP: "" });
      break;

    default:
      setErrors({ ...errors });
      break;
  }
  return;
};

export const OrderForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.userId);
  const loading = useSelector((state) => state.productFilter.loading);

  const [shippingMethod, setShippingMethod] = useState("pickup");
  const [paymentMethod, setPaymentMethod] = useState("person");

  const [generalError, setGeneralError] = useState("");
  const [orderForm, setOrderForm] = useState({
    orderAdress: "",
    orderAdressNumber: "",
    orderProvince: "",
    orderCP: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const [errors, setErrors] = useState({
    orderAdress: "",
    orderAdressNumber: "",
    orderProvince: "",
    orderCP: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setOrderForm({ ...orderForm, [property]: value });
    validate({ ...orderForm, [property]: value }, setErrors, errors, property);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      (Object.values(errors).filter((value) => value !== "").length === 0 &&
        Object.values(orderForm).filter((value) => value !== "").length !==
          0) ||
      (shippingMethod === "pickup" && paymentMethod === "person")
    ) {
      // Preparación de los datos de la orden
      const orderDetails = Object.entries(cart.items).map(
        ([productId, item]) => ({
          productId,
          quantity: item.quantity,
        })
      );

      try {
        // Despachamos checkStock antes de crear la orden
        console.log("Checking stock with data:", orderDetails);
        const stockResult = await dispatch(checkStock(orderDetails)).unwrap();
        console.log("Stock check result:", stockResult);

        // Si el stock es suficiente, creamos la orden
        const orderData = {
          order: {
            userId,
            paymentReference: `ref${Date.now()}`,
            phone: "123-456-7890",
            orderStatus: "pending",
            paymentMethod,
            shippingMethod,
            notes: "Leave at front door",
            totalAmount: cart.totalAmount,
          },
          orderDetails,
        };

        console.log("Dispatching createOrder with data:", orderData);

        // Despachamos createOrder
        const result = await dispatch(createOrder(orderData)).unwrap();
        console.log("createOrder result:", result);

        // Limpiar el carrito solo si createOrder fue exitoso
        console.log("Dispatching clearCart");
        dispatch(clearShoppingCart());

        // Navegar a la página de "gracias"
        console.log("Navigating to /thanks");
        navigate("/thanks", { state: { fromPurchase: true } });
      } catch (error) {
        // Si checkStock o createOrder fallan, mostramos el error
        console.error("Error en el proceso de la orden:", error);
        setGeneralError(error); // Aquí muestras el error en el formulario
      }
    } else {
      setGeneralError(
        "Por favor, corrija los errores en el formulario antes de continuar."
      );
    }
  };

  const shipIsDisabled = shippingMethod !== "ship";
  const payISsDisabled = paymentMethod !== "card";

  if (loading) return <p>Cargando...</p>;

  return (
    <div className={`${styles.orderForm_container}`}>
      {generalError && <div className={styles.error}>{generalError}</div>}
      <div className={styles.orderForm_shippingMethod}>
        <h3>Método de Entrega</h3>
        <label>
          <input
            type="radio"
            name="shippingMethod"
            value="pickup"
            checked={shippingMethod === "pickup"}
            onChange={() => setShippingMethod("pickup")}
          />
          Retiro en Persona
        </label>
        <label>
          <input
            type="radio"
            name="shippingMethodMethod"
            value="ship"
            checked={shippingMethod === "ship"}
            onChange={() => setShippingMethod("ship")}
          />
          Envío
        </label>

        <span>
          El precio del envío se establece en función del lugar de entrega y del
          contenido del carrito.
        </span>
        <form onSubmit={handleSubmit} className={`${styles.orderForm}`}>
          <div className={`${styles.grid_col_span_3}`}>
            <OutlinedTextField
              inputType={"text"}
              inputName={"orderAdress"}
              inputLabel={"Calle*"}
              inputPlaceholder={"*Required"}
              inputValue={orderForm.orderAdress}
              inputOnChange={handleChange}
              inputDisabled={shipIsDisabled}
              inputError={errors.orderAdress}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_2}`}>
            <OutlinedTextField
              inputType={"number"}
              inputName={"orderAdressNumber"}
              inputLabel={"Número*"}
              inputPlaceholder={"*Required"}
              inputValue={orderForm.orderAdressNumber}
              inputOnChange={handleChange}
              inputDisabled={shipIsDisabled}
              inputError={errors.orderAdressNumber}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_3}`}>
            <OutlinedTextField
              inputType={"text"}
              inputName={"orderProvince"}
              inputLabel={"Provincia*"}
              inputPlaceholder={"*Required"}
              inputValue={orderForm.orderProvince}
              inputOnChange={handleChange}
              inputDisabled={shipIsDisabled}
              inputError={errors.orderProvince}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_2}`}>
            <OutlinedTextField
              inputType={"number"}
              inputName={"orderCP"}
              inputLabel={"CPostal*"}
              inputPlaceholder={"*Required"}
              inputValue={orderForm.orderCP}
              inputOnChange={handleChange}
              inputDisabled={shipIsDisabled}
              inputError={errors.orderCP}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
        </form>
      </div>
      <div className={styles.orderForm_paymentmethod}>
        <h3>Método de Pago</h3>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="person"
            checked={paymentMethod === "person"}
            onChange={() => setPaymentMethod("person")}
          />
          Pago en Persona
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Tarjeta de Credito/Debito
        </label>

        <form onSubmit={handleSubmit} className={`${styles.orderForm}`}>
          <div className={`${styles.grid_col_span_3}`}>
            <OutlinedTextField
              inputDisabled={payISsDisabled}
              inputType={"number"}
              inputName={"cardNumber"}
              inputLabel={"cardNumber*"}
              inputPlaceholder={"*Required"}
              inputValue={orderForm.cardNumber}
              inputOnChange={handleChange}
              inputError={errors.cardNumber}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_2}`}>
            <OutlinedTextField
              inputDisabled={payISsDisabled}
              inputType={"date"}
              inputName={"expirationDate"}
              inputLabel={"Exp.Date*"}
              inputPlaceholder={"*Required"}
              inputValue={orderForm.expirationDate}
              inputOnChange={handleChange}
              inputError={errors.expirationDate}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_3}`}>
            <OutlinedTextField
              inputDisabled={payISsDisabled}
              inputType={"number"}
              inputName={"cvv"}
              inputLabel={"cvv*"}
              inputPlaceholder={"*Required"}
              inputValue={orderForm.cvv}
              inputOnChange={handleChange}
              inputError={errors.cvv}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_2}`}>
            <OutlinedTextField
              inputDisabled={payISsDisabled}
              inputType={"text"}
              inputName={"cardHolderName"}
              inputLabel={"cardHolderName*"}
              inputPlaceholder={"*Required"}
              inputValue={orderForm.cardHolderName}
              inputOnChange={handleChange}
              inputError={errors.cardHolderName}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
        </form>
        <div className={`${styles.orderForm_buttons}`}>
          <OutlinedButton
            buttonType="button"
            buttonText="Volver"
            buttonName="backToBasket"
            buttonOnClick={props.onButtonClick}
          />
          <FilledButton
            buttonType="submit"
            buttonText="Finalizar Compra"
            buttonName="completePurchase"
            buttonOnClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
