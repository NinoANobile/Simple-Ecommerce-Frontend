import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div
      className={`${styles.spinner_container}`}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div className={`${styles.spinner}`}></div>
      <h1 className={`${styles.spinner_headline}`}>Cargando...</h1>
    </div>
  );
};

export default Spinner;
