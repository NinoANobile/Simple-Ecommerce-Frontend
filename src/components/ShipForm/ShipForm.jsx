import FilledButton from "../Buttons/FilledButton";
import OutlinedTextField from "../TextField/OutlinedTextField";
import styles from "./ShipForm.module.css";
import { useState, useEffect } from "react";

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

export const ShipForm = ({ setShipFormValid }) => {
  const [shippingMethod, setShippingMethodState] = useState("pickup");
  const [shipForm, setShipForm] = useState({
    CartAdress: "",
    CartAdressNumber: "",
    CartProvince: "",
    CartCP: "",
  });

  const [errors, setErrors] = useState({
    CartAdress: "",
    CartAdressNumber: "",
    CartProvince: "",
    CartCP: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setShipForm({ ...shipForm, [property]: value });
    validate({ ...shipForm, [property]: value }, setErrors, errors, property);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      Object.values(errors).filter((value) => value !== "").length === 0 &&
      Object.values(shipForm).filter((value) => value !== "").length !== 0
    ) {
      setShipFormValid(true);
      dispatch(setShippingMethod(shippingMethod));
    } else if (shippingMethod !== "ship") {
      setShipFormValid(true);
      dispatch(setShippingMethod(shippingMethod));
    } else {
      setShipFormValid(false);
    }
  };

  const isDisabled = shippingMethod !== "ship";

  return (
    <div className={`${styles.shipform_container}`}>
      <h3>Método de Entrega</h3>
      <div className={styles.shippingMethod}>
        <label>
          <input
            type="radio"
            name="shippingMethod"
            value="pickup"
            checked={shippingMethod === "pickup"}
            onChange={() => setShippingMethodState("pickup")}
          />
          Retiro en Persona
        </label>
        <label>
          <input
            type="radio"
            name="shippingMethodMethod"
            value="ship"
            checked={shippingMethod === "ship"}
            onChange={() => setShippingMethodState("ship")}
          />
          Envío
        </label>
      </div>
      <>
        <span>
          El precio del envío se establece en función del lugar de entrega y del
          contenido del carrito.
        </span>
        <form onSubmit={submitHandler} className={`${styles.shipform_form}`}>
          <div className={`${styles.grid_col_span_3}`}>
            <OutlinedTextField
              inputType={"text"}
              inputName={"CartAdress"}
              inputLabel={"Calle*"}
              inputPlaceholder={"*Required"}
              inputValue={shipForm.CartAdress}
              inputOnChange={handleChange}
              inputDisabled={isDisabled}
              inputError={errors.CartAdress}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_2}`}>
            <OutlinedTextField
              inputType={"number"}
              inputName={"CartAdressNumber"}
              inputLabel={"Número*"}
              inputPlaceholder={"*Required"}
              inputValue={shipForm.CartAdressNumber}
              inputOnChange={handleChange}
              inputDisabled={isDisabled}
              inputError={errors.CartAdressNumber}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_3}`}>
            <OutlinedTextField
              inputType={"text"}
              inputName={"CartProvince"}
              inputLabel={"Provincia*"}
              inputPlaceholder={"*Required"}
              inputValue={shipForm.CartProvince}
              inputOnChange={handleChange}
              inputDisabled={isDisabled}
              inputError={errors.CartProvince}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_2}`}>
            <OutlinedTextField
              inputType={"number"}
              inputName={"CartCP"}
              inputLabel={"CPostal*"}
              inputPlaceholder={"*Required"}
              inputValue={shipForm.CartCP}
              inputOnChange={handleChange}
              inputDisabled={isDisabled}
              inputError={errors.CartCP}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_2}`}>
            <FilledButton
              buttonType="submit"
              buttonText="Siguiente"
              buttonName="goToPaymentForm"
            ></FilledButton>
          </div>
        </form>
      </>
    </div>
  );
};

export default ShipForm;
