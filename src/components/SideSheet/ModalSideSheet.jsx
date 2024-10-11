// import FilterContainer from "../FilterContainer/FilterContainer";
// import styles from "./ModalSideSheet.module.css";
// import { useRef, useEffect } from "react";

// const ModalSideSheet = ({ isOpen, onClose, title }) => {
//   const dialogRef = useRef(null);

//   useEffect(() => {
//     const dialog = dialogRef.current;
//     if (isOpen && dialog) {
//       dialog.addEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       if (dialog) {
//         dialog.removeEventListener("keydown", handleKeyDown);
//       }
//     };
//   }, [isOpen]);

//   const handleKeyDown = (e) => {
//     // Close the dialog when "Esc" is pressed
//     if (e.key === "Escape") {
//       onClose();
//     }

//     if (e.key === "Tab") {
//       const focusableElements = dialogRef.current.querySelectorAll(
//         'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
//       );
//       const firstElement = focusableElements[0];
//       const lastElement = focusableElements[focusableElements.length - 1];

//       if (e.shiftKey) {
//         // Shift + Tab: Focus the last element if focus is on the first element
//         if (document.activeElement === firstElement) {
//           e.preventDefault();
//           lastElement.focus();
//         }
//       } else {
//         // Tab: Focus the first element if focus is on the last element
//         if (document.activeElement === lastElement) {
//           e.preventDefault();
//           firstElement.focus();
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <div
//         className={`${styles.sideSheet_backdrop} ${
//           isOpen ? "" : styles.sideSheet_backdrop__hidden
//         }`}
//         onClick={onClose}
//       ></div>
//       <dialog open={isOpen} ref={dialogRef}>
//         <div className={styles.sideSheet_header}>
//           <h2 className={`${styles.sideSheet_headline} material--rounded`}>
//             {title}
//           </h2>
//           <button
//             tabIndex={0}
//             className={`${styles.sideSheet_icon} material-symbols-rounded`}
//             onClick={onClose}
//           >
//             close
//           </button>
//         </div>
//         <div className={styles.sideSheet_content}>
//           <FilterContainer />
//         </div>
//       </dialog>
//     </>
//   );
// };

// export default ModalSideSheet;

import { useEffect, useRef, useState } from "react";
import FilterContainer from "../FilterContainer/FilterContainer";
import styles from "./ModalSideSheet.module.css";

const ModalSideSheet = ({ isOpen, onClose, title }) => {
  const dialogRef = useRef(null);
  const [isVanishing, setIsVanishing] = useState(false);

  // useEffect(() => {
  //   const dialog = dialogRef.current;

  //   if (isOpen && dialog) {
  //     dialog.showModal();
  //   } else if (!isOpen && dialog) {
  //     dialog.close();
  //   }
  // }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && dialog) {
      dialog.showModal(); // Mostrar el modal cuando está abierto
    } else if (!isOpen && dialog) {
      setIsVanishing(true); // Inicia la animación de desaparición
      setTimeout(() => {
        dialog.close(); // Cierra el modal después de la animación
        setIsVanishing(false); // Reinicia el estado de desaparición
      }, 300); // Tiempo de la duración de la animación
    }
  }, [isOpen]);

  const handleDialogClick = (event) => {
    const rect = dialogRef.current.getBoundingClientRect();
    const isInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInDialog) {
      onClose();
    }
  };

  console.log(isOpen);

  return (
    <dialog
      className={`${styles.modalSideSheet_container} ${
        isVanishing ? styles.vanishing : ""
      }`}
      role="dialog"
      ref={dialogRef}
      onClick={handleDialogClick}
    >
      <div className={styles.sideSheet_header}>
        <h2 className={`${styles.sideSheet_headline}`}>{title}</h2>
        <button
          className={`${styles.sideSheet_icon} material-symbols-rounded`}
          onClick={onClose}
        >
          close
        </button>
      </div>
      <div className={styles.sideSheet_content}>
        <FilterContainer />
      </div>
    </dialog>
  );
};

export default ModalSideSheet;
