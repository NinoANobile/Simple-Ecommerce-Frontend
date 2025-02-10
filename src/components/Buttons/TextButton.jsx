import styles from "../Buttons/TextButton.module.css";

// Este boton siempre debe llevar texto y opcional un icono.
// Soporta iconos de google y de font awesome.
// Para un boton con un icono sin texto usar IconButton.

const TextButton = ({
  type = "button",
  text = "Click Me",
  name = "TextButton",
  icon = "",
  onClick = null,
  //   width = "auto",
}) => {
  return (
    // <div
    //   className={`${styles.textButton_conteiner} `}
    //   style={{ "--button-width": width }}
    // >
    <button
      className={`${styles.textButton} ${icon ? styles.textButton__icon : ""}`}
      type={type}
      name={name}
      onClick={onClick}
      aria-label={name}
      role="button"
    >
      {icon && (
        <span
          className={`${styles.textButton_icon} ${icon} material-symbols-rounded`}
        >
          {icon}
        </span>
      )}
      {text && <span className={`${styles.textButton_text}`}> {text}</span>}
    </button>
    // </div>
  );
};

export default TextButton;
