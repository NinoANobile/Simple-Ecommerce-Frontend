import styles from "../Buttons/FilledButton.module.css";

// Este boton siempre debe llevar texto y opcional un icono.
// Para un boton con un icono sin texto usar IconButton.

const FilledButton = ({
  buttonType = "button",
  buttonText = "Click Me",
  buttonName = "FilledButton",
  buttonIcon = "",
  buttonOnClick = null,
  buttonWidth = "auto",
}) => {
  return (
    <div
      className={`${styles.filledbutton_conteiner} `}
      style={{ "--button-width": buttonWidth }}
    >
      <button
        className={`${styles.filledbutton} ${
          buttonIcon ? styles.filledbutton__icon : ""
        }`}
        type={buttonType}
        name={buttonName}
        onClick={buttonOnClick}
        aria-label={buttonName}
        role="button"
      >
        {buttonIcon && (
          <span className={`${styles.filledbutton_icon} ${buttonIcon}`}></span>
        )}
        <span className={`${styles.filledbutton_text}`}> {buttonText}</span>
      </button>
    </div>
  );
};

export default FilledButton;
