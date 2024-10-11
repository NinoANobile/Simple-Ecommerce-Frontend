// import { useState, useEffect } from "react";
// import styles from "./Checkbox.module.css";

// // Opción de generar un ID único
// let checkboxId = 0;
// const generateId = () => `checkbox-${checkboxId++}`;

// const Checkbox = ({
//   label = "checkbox",
//   id = null,
//   checked = false,
//   onChange = null,
// }) => {
//   // Si no se provee un `id`, generar uno automáticamente
//   const [checkboxId] = useState(id || generateId());

//   // Estado local para manejar el 'checked' si no se controla desde fuera
//   const [isChecked, setIsChecked] = useState(checked);

//   useEffect(() => {
//     setIsChecked(checked);
//   }, [checked]);

//   // Función de cambio predeterminada si no se provee una externa
//   const handleOnChange = (event) => {
//     const checked = event.target.checked;

//     if (!onChange) {
//       setIsChecked(checked);
//     }

//     if (onChange) {
//       onChange(checked);
//     }
//   };

//   return (
//     <div className={`${styles.checkbox_container} `}>
//       <input
//         className={`${styles.filter_checkbox} `}
//         name={label}
//         id={checkboxId}
//         type="checkbox"
//         checked={isChecked}
//         onChange={handleOnChange}
//       />
//       <label htmlFor={checkboxId}>{label}</label>
//     </div>
//   );
// };

// export default Checkbox;

import { useState, useEffect, useRef } from "react";
import styles from "./Checkbox.module.css";

// Opción de generar un ID único
let checkboxId = 0;
const generateId = () => `checkbox-${checkboxId++}`;

const Checkbox = ({
  label = "checkbox",
  id = null,
  checked = false,
  indeterminate = false,
  onChange = null,
  disabled = false,
}) => {
  const [checkboxId] = useState(id || generateId());
  const [isChecked, setIsChecked] = useState(checked);
  const checkboxRef = useRef(null); // Referencia para manejar el atributo indeterminate

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleOnChange = (event) => {
    const checked = event.target.checked;

    if (!onChange) {
      setIsChecked(checked);
    }

    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className={`${styles.checkbox_container} `}>
      <input
        ref={checkboxRef}
        className={`${styles.filter_checkbox} `}
        name={label}
        id={checkboxId}
        type="checkbox"
        checked={isChecked}
        onChange={handleOnChange}
        disabled={disabled}
        role="checkbox"
      />
      <label htmlFor={checkboxId}>{label}</label>
    </div>
  );
};

export default Checkbox;
