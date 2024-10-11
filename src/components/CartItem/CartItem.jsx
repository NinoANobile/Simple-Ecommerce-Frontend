import styles from "./CartItem.module.css";
import { NavLink } from "react-router-dom";
import OutlinedTextField from "../TextField/OutlinedTextField";
import FilledButton from "../Buttons/FilledButton";

const CartItem = ({
  id,
  name,
  description,
  brand,
  price,
  stock,
  imageUrl,
  stars,
  category,
  subcategory,
  inputEnable,
  inputType,
  inputName,
  inputLabel,
  inputPlaceholder,
  inputValue,
  inputOnChange,
  inputError,
  inputLeadIcon,
  inputTrailIcon,
  inputWidth,
  inputHeight,
  buttonEnable,
  buttonText,
  buttonName,
  buttonOnClick,
  buttonIcon,
  buttonWidth,
}) => {
  return (
    // <div className={`${styles.carditem_container}`}>
    <>
      <div className={`${styles.carditem}`}>
        {/* <div className={`${styles.carditem_imagecontainer}`}> */}
        <img
          tabIndex="-1"
          className={`${styles.carditem_image}`}
          src={imageUrl[0]}
          alt={name}
        />
        {/* </div> */}
        <div className={`${styles.carditem_body}`}>
          <div className={`${styles.carditem_bodytop}`}>
            <NavLink
              to={`/proddetail/${id}`}
              className={`${styles.carditem_headline}`}
            >
              {name}
            </NavLink>
            <span className={`${styles.carditem_price}`}>
              {parseFloat(price).toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>
            <span className={`${styles.carditem_stock}`}>{stock} Un.</span>
          </div>
          <div className={`${styles.carditem_bodymid}`}></div>
          <div className={`${styles.carditem_bodybot}`}>
            {/* {inputEnable && (
              <OutlinedTextField
                inputType={inputType}
                inputName={inputName}
                inputLabel={inputLabel}
                inputPlaceholder={inputPlaceholder}
                inputValue={inputValue}
                inputOnChange={inputOnChange}
                inputError={inputError}
                inputLeadIcon={inputLeadIcon}
                inputTrailIcon={inputTrailIcon}
                inputWidth={inputWidth}
                inputHeight={inputHeight}
              />
            )} */}
            {inputEnable && (
              <OutlinedTextField
                inputType={inputType}
                inputName={inputName}
                inputLabel={inputLabel}
                inputPlaceholder={inputPlaceholder}
                inputValue={inputValue}
                inputOnChange={inputOnChange}
                inputError={inputError}
                inputLeadIcon={inputLeadIcon}
                inputTrailIcon={inputTrailIcon}
                inputWidth={inputWidth}
                inputHeight={inputHeight}
              />
            )}
            {buttonEnable && (
              <FilledButton
                buttonText={buttonText}
                buttonName={buttonName}
                buttonIcon={buttonIcon}
                buttonOnClick={buttonOnClick}
                buttonWidth={buttonWidth}
              />
            )}
          </div>
        </div>
      </div>
    </>
    // </div>
  );
};

export default CartItem;
