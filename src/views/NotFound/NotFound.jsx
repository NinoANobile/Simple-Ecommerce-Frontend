import { NavLink } from "react-router-dom";
import styles from "./NotFound.module.css"; // Puedes crear este archivo para estilos personalizados

const NotFound = () => {
  return (
    <div className={styles.notFound_container}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <NavLink to="/" className={styles.backHomeButton}>
        Volver al inicio
      </NavLink>
    </div>
  );
};

export default NotFound;
