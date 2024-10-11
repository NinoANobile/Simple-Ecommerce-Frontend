import styles from "./Snackbar.module.css";
import { useState, useEffect } from "react";

const Snackbar = ({
  message = "Este es un texto de prueba",
  isOpen = false,
  onClose = null,
  duration = null,
  actionName = "action",
  action = null,
  enableCloseButton = null,
}) => {
  const [isVanishing, setIsVanishing] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen && duration) {
      // Solo inicia el temporizador si hay un valor para duration
      timer = setTimeout(() => {
        // Inicia la animación vanish
        setIsVanishing(true);

        // Cierra la snackbar después de la animación
        setTimeout(() => {
          onClose();
          setIsVanishing(false); // Resetea el estado
        }, 300); // Duración de la animación vanish
      }, duration);
    }

    return () => {
      clearTimeout(timer); // Limpia el temporizador si isOpen cambia o el componente se desmonta
    };
  }, [isOpen, duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`${styles.snackbar_container} ${
        isOpen ? styles.snackbar_container__show : ""
      } ${isVanishing ? styles.snackbar_container__vanish : ""}`}
    >
      <p autoFocus className={`${styles.snackbar_supportText}`}>
        {message}
      </p>
      <div className={`${styles.snackbar_actionContainer}`}>
        <button className={`${styles.snackbar_button}`} onClick={action}>
          {actionName}
        </button>
        {enableCloseButton && (
          <button
            onClick={onClose}
            className={`${styles.snackbar_closeButton} material-symbols-rounded`}
          >
            close
          </button>
        )}
      </div>
    </div>
  );
};

export default Snackbar;
