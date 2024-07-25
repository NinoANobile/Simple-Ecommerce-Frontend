import styles from "./PaymentForm.module.css";
import OutlinedTextField from "../TextField/OutlinedTextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilledButton from "../Buttons/FilledButton";
import { createOrder } from "../../redux/actions";

export const PaymentForm = ({ setPaymentFormValid }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.userId);

  const [paymentMethod, setPaymentMethod] = useState("person");
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setPaymentForm({ ...paymentForm, [property]: value });
    validate(
      { ...paymentForm, [property]: value },
      setErrors,
      errors,
      property
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      Object.values(errors).filter((value) => value !== "").length === 0 &&
      Object.values(paymentForm).filter((value) => value !== "").length !== 0
    ) {
      const orderData = {
        order: {
          userId,
          paymentReference: `ref${Date.now()}`, // Puedes generar una referencia única aquí
          phone: "123-456-7890",
          orderStatus: "pending",
          paymentMethod,
          shippingMethod,
          notes: "Leave at front door",
          totalAmount: cart.totalAmount,
        },
        orderDetails: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
      dispatch(createOrder(orderData));
      setPaymentFormValid(true);
    } else {
      setPaymentFormValid(false);
    }
  };

  const isDisabled = paymentMethod !== "card";

  return (
    <div className={`${styles.paymentform_container}`}>
      <h3>Método de Pago</h3>
      <div className={styles.paymentform_paymentmethod}>
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
      </div>
      <>
        <span></span>
        <form onSubmit={submitHandler} className={`${styles.paymentform_form}`}>
          <div className={`${styles.grid_col_span_3}`}>
            <OutlinedTextField
              inputDisabled={isDisabled}
              inputType={"number"}
              inputName={"cardNumber"}
              inputLabel={"cardNumber*"}
              inputPlaceholder={"*Required"}
              inputValue={paymentForm.cardNumber}
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
              inputDisabled={isDisabled}
              inputType={"date"}
              inputName={"expirationDate"}
              inputLabel={"Exp.Date*"}
              inputPlaceholder={"*Required"}
              inputValue={paymentForm.expirationDate}
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
              inputDisabled={isDisabled}
              inputType={"number"}
              inputName={"cvv"}
              inputLabel={"cvv*"}
              inputPlaceholder={"*Required"}
              inputValue={paymentForm.cvv}
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
              inputDisabled={isDisabled}
              inputType={"text"}
              inputName={"cardHolderName"}
              inputLabel={"cardHolderName*"}
              inputPlaceholder={"*Required"}
              inputValue={paymentForm.cardHolderName}
              inputOnChange={handleChange}
              inputError={errors.cardHolderName}
              inputLeadIcon={""}
              inputTrailIcon={""}
              inputWidth={null}
              inputHeight={null}
            ></OutlinedTextField>
          </div>
          <div className={`${styles.grid_col_span_2}`}>
            <FilledButton
              buttonType="submit"
              buttonText="Finalizar"
              buttonName="endBuyProcess"
            ></FilledButton>
          </div>
        </form>
      </>
    </div>
  );
};

export default PaymentForm;
