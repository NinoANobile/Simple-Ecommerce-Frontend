import TextButton from "../Buttons/TextButton";
import styles from "./Dialog.module.css";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dialog = ({
  isOpen,
  // onClose,
  title,
  content,
  actions,
  redirectPath = null,
}) => {
  const dialogRef = useRef(null);
  const navigate = useNavigate(); // Hook para manejar la redirección

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      if (dialogRef.current.open) {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog_container}`}
      // onCancel={handleClose}
    >
      <h1 className={`${styles.dialog_headline}`}>{title}</h1>
      <p className={`${styles.dialog_supportingText}`}>{content}</p>
      <div className={`${styles.dialog_buttonsContainer}`}>
        {actions}
        {/* <TextButton onClick={handleClose}>Cerrar</TextButton> */}
      </div>
    </dialog>
  );
};

export default Dialog;
