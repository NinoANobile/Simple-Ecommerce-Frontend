import styles from "./ProdCardItem.module.css";
import { NavLink } from "react-router-dom";
import FilledButton from "../Buttons/FilledButton";

const ProdCardItem = ({
  // props del producto
  id,
  name,
  description,
  brand,
  price,
  stock,
  images,
  stars,
  category,
  subcategory,
  // prop para el boton
  buttonEnable,
  buttonText,
  buttonName,
  buttonOnClick,
  buttonIcon,
  buttonWidth,
}) => {
  return (
    <div className={`${styles.carditem_container}`}>
      <div className={`${styles.carditem}`} tabIndex="0">
        <div className={`${styles.carditem_imagecontainer}`}>
          <img
            className={`${styles.carditem_image}`}
            src={images[0]}
            alt={name}
          />
        </div>
        <div className={`${styles.carditem_body}`}>
          <div className={`${styles.carditem_bodytop}`}>
            <NavLink
              to={`/proddetail/${id}`}
              className={`${styles.carditem_headline}`}
            >
              <span>{name}</span>
            </NavLink>
          </div>
          <div className={`${styles.carditem_bodymid}`}>
            <span className={`${styles.carditem_price}`}>ARS {price}</span>
          </div>
          <div className={`${styles.carditem_bodybot}`}>
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
    </div>
  );
};

export default ProdCardItem;
