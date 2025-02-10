import { Switch } from "../index";
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  // Lee el tema guardado en localStorage al cargar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.remove("light", "dark"); // Elimina cualquier clase previa
    document.body.classList.add(savedTheme); // Agrega la clase correcta
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.remove("light", "dark"); // Elimina la clase anterior
    document.body.classList.add(newTheme); // Agrega la nueva clase
    localStorage.setItem("theme", newTheme); // Guarda la preferencia en localStorage
  };

  return (
    <Switch
      onClick={toggleTheme}
      // text={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      text="Modo Oscuro"
    ></Switch>
  );
};

export default ThemeToggle;
