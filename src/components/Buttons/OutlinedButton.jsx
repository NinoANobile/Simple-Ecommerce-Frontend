import styles from "../Buttons/OutlinedButton.module.css";

// Este boton siempre debe llevar texto y opcional un icono.
// Para un boton con un icono sin texto usar IconButton.

const OutlinedButton = ({
  buttonType = "button",
  buttonText = "Click Me",
  buttonName = "FilledButton",
  buttonIcon = "",
  buttonOnClick = null,
  buttonWidth = "auto",
}) => {
  return (
    <div
      className={styles.outlinedbutton_container}
      style={{ "--button-width": buttonWidth }}
    >
      <button
        className={`${styles.outlinedbutton} ${
          buttonIcon ? styles.outlinedbutton__icon : ""
        }`}
        type={buttonType}
        name={buttonName}
        onClick={buttonOnClick}
        aria-label={buttonName}
        role="button"
      >
        {buttonIcon && (
          <span
            className={`${styles.outlinedbutton_icon} ${buttonIcon} material-symbols-rounded`}
          >
            {buttonIcon}
          </span>
        )}
        <span className={styles.outlinedbutton_text}>{buttonText}</span>
      </button>
    </div>
  );
};

export default OutlinedButton;
