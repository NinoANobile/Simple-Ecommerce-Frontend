import styles from "./OutlinedTextField.module.css";
import { useState, useRef, useEffect } from "react";

const OutlinedTextField = ({
  inputType = "text",
  inputName = "outlinedTextField",
  inputLabel = "OutlinedTextField",
  inputPlaceholder = "*Required",
  inputValue = "",
  inputOnChange = undefined,
  inputDisabled = false,
  inputAccept = null,
  inputMultiple = false,
  inputError = "",
  inputLeadIcon = "",
  inputTrailIcon = "",
  inputWidth = null,
  inputHeight = null,
}) => {
  const errorId = `error-${inputName}`;
  const labelRef = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    let timeoutId; // Declara la variable fuera de los bloques if/else

    if (labelRef.current && inputLabel && inputValue) {
      // Establece un retraso antes de medir
      timeoutId = setTimeout(() => {
        setLabelWidth(labelRef.current.offsetWidth + 8);
      }, 100); // Retraso de 100ms, ajusta según sea necesario
    } else if (labelRef.current && inputLabel) {
      // Este bloque se ejecuta si sólo labelRef.current e inputLabel son verdaderos
      timeoutId = setTimeout(() => {
        setLabelWidth(labelRef.current.offsetWidth * 0.75 + 8);
      }, 100); // Retraso de 100ms, ajusta según sea necesario
    }

    // Limpia el timeout si el componente se desmonta antes de que el retraso termine
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [inputLabel]);
  // }, [inputLabel, inputValue]); Esto pareceria ser lo correcto pero no quiero que se actualice cuando cambie el inputValue.

  return (
    <div
      className={styles.textfield_container}
      style={{
        "--textfield-width": inputWidth,
        "--textfield-height": inputHeight,
        "--label-width": labelWidth > 0 ? `${labelWidth}px` : "0",
      }}
    >
      <div
        className={`${styles.textfield_outlined} ${
          inputError ? styles.textfield_outlined__error : ""
        }`}
      >
        {inputLeadIcon && (
          <span className={`${styles.textfield_leadicon} ${inputLeadIcon}`} />
        )}
        <div className={styles.textfield_inputwrapper}>
          <input
            type={inputType}
            name={inputName}
            id={inputName}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={inputOnChange}
            disabled={inputDisabled}
            accept={inputAccept}
            multiple={inputMultiple}
            className={styles.textfield_input}
            aria-invalid={!!inputError}
            aria-describedby={inputError ? errorId : undefined}
          />
          {inputLabel && (
            <label
              ref={labelRef}
              htmlFor={inputName}
              className={`${styles.textfield_label} ${
                inputError ? styles.textfield_label__error : ""
              }`}
            >
              {inputLabel}
            </label>
          )}
        </div>
        {inputTrailIcon && (
          <span
            className={`${styles.textfield_trailicon} ${inputTrailIcon} ${
              inputError ? styles.textfield_trailicon__error : ""
            }`}
          />
        )}
      </div>
      <div className={styles.textfield_suptextcontainer}>
        <span
          id={errorId}
          className={`${styles.textfield_suptext} ${
            inputError ? styles.textfield_suptext__error : ""
          }`}
        >
          {inputError ? inputError : inputPlaceholder}
        </span>
      </div>
    </div>
  );
};

export default OutlinedTextField;
