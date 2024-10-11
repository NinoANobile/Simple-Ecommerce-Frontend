/*
 * TopAppBar Component
 *
 * Propósito:
 * Este componente actúa como la barra de navegación superior en la aplicación. Se adapta
 * a las dimensiones de la pantalla y a las configuraciones pasadas a través de props,
 * ofreciendo una interfaz flexible para mostrar íconos (que pueden ser menus) y logos.
 *
 * Funcionalidades:
 * - En el lado izquierdo, puede mostrar un ícono (por ejemplo, menú o regresar) o un logo,
 *   dependiendo del comportamiento especificado en las props.
 * - En el lado derecho, puede mostrar un logo, un ícono de menú o ambos, configurado a través de props.
 *
 * Props:
 *  - `title` (string): El título que se muestra en el centro del TopAppBar.
 *  - `leftBehavior` (object): Controla el comportamiento del lado izquierdo.
 *     - `type` (string): "icon", "logo" o "both" (ícono + logo).
 *     - `icon` (string): El ícono a mostrar (usando Material Symbols).
 *     - `iconAction` (function): Acción ejecutada al hacer clic en el ícono.
 *     - `logo` (string): Ruta de la imagen del logo.
 *     - `logoAction` (string): URL o ruta a la que redirige el logo.
 *  - `rightBehavior` (object): Controla el comportamiento del lado derecho.
 *     - `type` (string): "icon", "logo" o "both" (ícono + logo).
 *     - `icon` (string): Ícono para el menú u otra acción.
 *     - `iconAction` (function): Acción para el ícono de la derecha.
 *     - `logo` (string): Ruta de la imagen del logo.
 *     - `logoAction` (string): Ruta a la que redirige el logo.
 *
 * Dependencias:
 * - `Material Symbols` de Google para los íconos.
 *
 * Notas:
 * - Asegúrate de integrar correctamente los estilos y librerías de íconos como Material Symbols.
 * - Los logos o íconos se pueden ajustar fácilmente según el diseño.
 */

import { Link } from "react-router-dom";
import styles from "./TopAppBar.module.css";
import { useState, useEffect } from "react";

// Repensar la navegacion: si pongo un icono de carrito lo saco de navDrawer?
// Puedo poner un icono mas de lupa para el filtro de busqueda y otro icono para el carrito.
// Cambiar la imagen de logo por un svg.
// Cuando se achica la pantalla el logo con el nombre puede cambiar al logo solo.

// Función auxiliar para renderizar los comportamientos del lado izquierdo y derecho
const renderBehavior = (
  {
    type,
    logo,
    logoAction,
    icon,
    iconAction,
    icon2,
    iconAction2,
    icon3,
    iconAction3,
  },
  side
) => {
  return (
    <>
      {type === "both" && ( // Icono y logo
        <>
          <button
            onClick={iconAction}
            className={`${
              styles[`iconButton${side}`]
            } material-symbols-rounded`}
            aria-label={icon}
          >
            {icon}
          </button>
          <Link tabIndex={-1} to={logoAction} aria-label="Home">
            <img src={logo} alt="Logo" className={styles.logoImage} />
          </Link>
        </>
      )}
      {type === "icon" && ( // Solo icono
        <>
          {icon && (
            <button
              onClick={iconAction}
              className={`${
                styles[`iconButton${side}`]
              } material-symbols-rounded`}
              aria-label={icon}
            >
              {icon}
            </button>
          )}
          {icon2 && (
            <button
              onClick={iconAction2}
              className={`${
                styles[`iconButton${side}`]
              } material-symbols-rounded`}
              aria-label={icon2}
            >
              {icon2}
            </button>
          )}
          {icon3 && (
            <button
              onClick={iconAction3}
              className={`${
                styles[`iconButton${side}`]
              } material-symbols-rounded`}
              aria-label={icon3}
            >
              {icon3}
            </button>
          )}
        </>
      )}
      {type === "logo" && ( // Solo logo
        <Link tabIndex={-1} to={logoAction} aria-label="Home">
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </Link>
      )}
    </>
  );
};

const TopAppBar = ({
  title = "",
  leftBehavior = {
    type: "logo",
    icon: null,
    logo: "logo.png",
    iconAction: null,
    logoAction: "/",
  },
  rightBehavior = {
    type: "icon",
    logo: null,
    logoAction: null,
    icon: "arrow_back",
    iconAction: () => {},
    icon2: "arrow_back",
    iconAction2: () => {},
    icon3: "arrow_back",
    iconAction3: () => {},
  },
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detecta si el usuario ha desplazado más de 50 píxeles
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Solo se ejecuta una vez, cuando el componente se monta

  return (
    <header
      className={`${styles.topAppBar_container} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <div className={styles.topAppBar}>
        {leftBehavior.type && (
          <div className={styles.topAppBar_left}>
            {renderBehavior(leftBehavior, "Left")}
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
        {rightBehavior.type && (
          <div className={styles.topAppBar_right}>
            {renderBehavior(rightBehavior, "Right")}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopAppBar;
