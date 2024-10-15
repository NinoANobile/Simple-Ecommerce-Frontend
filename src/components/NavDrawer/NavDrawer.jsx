import styles from "./NavDrawer.module.css";
import { Dialog, TextButton } from "../index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../app/features/auth/authSlice";
import {
  deleteAccount,
  clearUserError,
} from "../../app/features/users/usersSlice";

const NavDrawer = ({ isFixed, isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.userId);
  const error = useSelector((state) => state.users.error);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  const [isUserDeleted, setIsUserDeleted] = useState();
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setForceRender((prev) => !prev);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isUserDeleted) {
      setDialogContent({
        title: "Usuario eliminado",
        content: "El usuario se ha borrado correctamente.",
        actions: (
          <TextButton
            name="userDeleteDialogClose"
            text="Cerrar"
            icon="close"
            onClick={() => {
              setIsUserDeleted(false);
              setShowDialog(false);
              navigate("/login");
            }}
          ></TextButton>
        ),
      });
      setShowDialog(true);
    }
  }, [isUserDeleted]);

  useEffect(() => {
    if (error) {
      setShowDialog(true);
    }
  }, [error]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setIsUserDeleted(false);
    dispatch(clearUserError()); // Limpiar el error en el estado global
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
    );

    if (confirmed) {
      // console.log("Eliminando cuenta de usuario:", userId, userRole); // Log para verificar datos
      try {
        // Despachar la acción y esperar a que se resuelva
        await dispatch(deleteAccount({ userId, role: userRole })).unwrap();

        // Si llega aquí, la eliminación fue exitosa, proceder a desloguear
        dispatch(logoutUser());
        setIsUserDeleted(true);
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    }
  };

  // console.log(isOpen);

  if (error) {
    return (
      <Dialog
        isOpen={showDialog}
        title="Error"
        content={error}
        actions={
          <TextButton
            text="Cerrar"
            icon="close"
            onClick={handleCloseDialog}
          ></TextButton>
        }
      />
    );
  }

  if (isUserDeleted) {
    return (
      <Dialog
        isOpen={true}
        title={dialogContent.title}
        content={dialogContent.content}
        actions={dialogContent.actions}
      />
    );
  }

  return (
    <>
      {/* Overlay que cubre el fondo cuando el menú está abierto */}
      <div
        className={`${styles.navDrawer_backdrop} ${
          isOpen ? "" : styles.navDrawer_backdrop__hidden
        }`}
        onClick={onClose}
      ></div>
      {/* Menu fijo */}
      <div
        className={`${styles.navDrawer_containerFixed} ${
          isFixed ? styles.navDrawer_container__visible : ""
        }`}
      >
        <nav>
          <Link to="/" aria-label="Home">
            <img
              src="logo.png"
              alt="Logo"
              className={styles.navDrawer_headLogo}
            />
          </Link>

          {/* <h2 className={styles.navDrawer_headline}>Headline for branding</h2> */}
          <ul>
            {!isAuthenticated && (
              <>
                {/* Home */}
                <li>
                  <NavLink
                    to="/"
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "/"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      home
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "/"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Home
                    </span>
                  </NavLink>
                </li>
                {/* Login */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/login"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/login"
                  >
                    <i
                      className={`${styles.navDrawer_icon} material-symbols-rounded`}
                    >
                      login
                    </i>
                    <span className={styles.navDrawer_labelText}>Ingresar</span>
                  </NavLink>
                </li>
                {/* Register */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/register"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/register"
                  >
                    <i
                      className={`${styles.navDrawer_icon} material-symbols-rounded`}
                    >
                      how_to_reg
                    </i>
                    <span className={styles.navDrawer_labelText}>
                      Registrarse
                    </span>
                  </NavLink>
                </li>
                {/* Carrito */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/cart"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/cart"
                  >
                    <i
                      className={`${styles.navDrawer_icon} material-symbols-rounded`}
                    >
                      shopping_cart
                    </i>
                    <span className={styles.navDrawer_labelText}>Carrito</span>
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && userRole === "usuario" && (
              <>
                {/* Home */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/"
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "/"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      home
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "/"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Home
                    </span>
                  </NavLink>
                </li>
                {/* Carrito */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/cart"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/cart"
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "/cart"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      shopping_cart
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "/cart"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Carrito
                    </span>
                  </NavLink>
                </li>
                {/* Pedidos */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/history"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/history"
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "/history"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      history
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "/history"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Historial de pedidos
                    </span>
                  </NavLink>
                </li>
                {/* Borrar cuenta */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "#"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="#"
                    onClick={handleDeleteAccount}
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "#"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      backspace
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "#"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Eliminar Cuenta
                    </span>
                  </NavLink>
                </li>
                {/* Logout */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "#"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="#"
                    onClick={handleLogout}
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "#"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      logout
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "#"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Desconectarse
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && userRole === "vendedor" && (
              <>
                {/* Home */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/"
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "/"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      home
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "/"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Home
                    </span>
                  </NavLink>
                </li>
                {/* Cargar Prod */}
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/loadproduct"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/loadproduct"
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "/loadproduct"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      add_circle
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "/loadproduct"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Cargar Producto
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "/orders"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="/orders"
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "/orders"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      history
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "/orders"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Todos los pedidos
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "#"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="#"
                    onClick={handleDeleteAccount}
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "#"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      backspace
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "#"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Eliminar Cuenta
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`${styles.navDrawer_indicator} ${
                      location.pathname === "#"
                        ? styles.navDrawer_indicator__active
                        : ""
                    }`}
                    to="#"
                    onClick={handleLogout}
                  >
                    <i
                      className={`${styles.navDrawer_icon} ${
                        location.pathname === "#"
                          ? styles.navDrawer_icon__active
                          : ""
                      } material-symbols-rounded`}
                    >
                      logout
                    </i>
                    <span
                      className={`${styles.navDrawer_labelText} ${
                        location.pathname === "#"
                          ? styles.navDrawer_labelText__active
                          : ""
                      }`}
                    >
                      Desconectarse
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {/* Menu modal */}
      {!isFixed && (
        <div
          className={`${styles.navDrawer_containerModal} ${
            isOpen ? styles.navDrawer_container__open : ""
          }`}
        >
          <nav>
            <div className={styles.navDrawer_headline}>
              <Link to="/" aria-label="Home">
                <img
                  src="logo.png"
                  alt="Logo"
                  className={styles.navDrawer_headLogo}
                />
              </Link>
              <button
                className={`${styles.navDrawer_headIcon} material-symbols-rounded`}
                onClick={onClose}
              >
                close
              </button>
            </div>
            {/* <h2 className={styles.navDrawer_headline}>Headline for branding</h2> */}
            <ul>
              {!isAuthenticated && (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "/"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        home
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "/"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Home
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/login"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/login"
                    >
                      <i
                        className={`${styles.navDrawer_icon} material-symbols-rounded`}
                      >
                        login
                      </i>
                      <span className={styles.navDrawer_labelText}>
                        Ingresar
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/register"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/register"
                    >
                      <i
                        className={`${styles.navDrawer_icon} material-symbols-rounded`}
                      >
                        how_to_reg
                      </i>
                      <span className={styles.navDrawer_labelText}>
                        Registrarse
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/cart"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/cart"
                    >
                      <i
                        className={`${styles.navDrawer_icon} material-symbols-rounded`}
                      >
                        shopping_cart
                      </i>
                      <span className={styles.navDrawer_labelText}>
                        Carrito
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {isAuthenticated && userRole === "usuario" && (
                <>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/"
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "/"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        home
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "/"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Home
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/cart"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/cart"
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "/cart"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        shopping_cart
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "/cart"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Carrito
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/history"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/history"
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "/history"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        history
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "/history"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Historial de pedidos
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "#"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="#"
                      onClick={handleDeleteAccount}
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "#"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        backspace
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "#"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Eliminar Cuenta
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "#"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="#"
                      onClick={handleLogout}
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "#"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        logout
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "#"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Desconectarse
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {isAuthenticated && userRole === "vendedor" && (
                <>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/"
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "/"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        home
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "/"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Home
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/loadproduct"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/loadproduct"
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "/loadproduct"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        add_circle
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "/loadproduct"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Cargar Producto
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "/orders"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="/orders"
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "/orders"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        history
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "/orders"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Todos los pedidos
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "#"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="#"
                      onClick={handleDeleteAccount}
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "#"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        backspace
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "#"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Eliminar Cuenta
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`${styles.navDrawer_indicator} ${
                        location.pathname === "#"
                          ? styles.navDrawer_indicator__active
                          : ""
                      }`}
                      to="#"
                      onClick={handleLogout}
                    >
                      <i
                        className={`${styles.navDrawer_icon} ${
                          location.pathname === "#"
                            ? styles.navDrawer_icon__active
                            : ""
                        } material-symbols-rounded`}
                      >
                        logout
                      </i>
                      <span
                        className={`${styles.navDrawer_labelText} ${
                          location.pathname === "#"
                            ? styles.navDrawer_labelText__active
                            : ""
                        }`}
                      >
                        Desconectarse
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default NavDrawer;
