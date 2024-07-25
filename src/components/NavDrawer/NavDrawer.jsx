import styles from "./NavDrawer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { persistor } from "../../redux/store";
import { NavLink } from "react-router-dom";

const NavDrawer = ({ isFixed, isOpen, onClose }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    persistor.purge();
  };

  return (
    <div
      className={`${
        isFixed ? styles.navDrawer_container__fixed : styles.navDrawer_container
      } ${isOpen ? styles.navDrawer_container__open : ""}`}
    >
      {!isFixed && isOpen && <button onClick={onClose}>X</button>}
      <nav>
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/login" activeClassName={styles.activeLink}>
                  Ingresar
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" activeClassName={styles.activeLink}>
                  Suscribirse
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" activeClassName={styles.activeLink}>
                  Carrito
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated && userRole === "cliente" && (
            <>
              <li>
                <NavLink to="/cart" activeClassName={styles.activeLink}>
                  Carro/Cesta
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" activeClassName={styles.activeLink}>
                  Pedidos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/delete-account"
                  activeClassName={styles.activeLink}
                >
                  Eliminar Cuenta
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={handleLogout}
                  activeClassName={styles.activeLink}
                >
                  Desconectarse
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated && userRole === "vendedor" && (
            <>
              <li>
                <NavLink to="/add-product" activeClassName={styles.activeLink}>
                  Cargar Producto
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders" activeClassName={styles.activeLink}>
                  Pedidos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/delete-account"
                  activeClassName={styles.activeLink}
                >
                  Eliminar Cuenta
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  onClick={handleLogout}
                  activeClassName={styles.activeLink}
                >
                  Desconectarse
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavDrawer;
