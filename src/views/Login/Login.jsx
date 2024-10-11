import styles from "./Login.module.css";
import {
  TextButton,
  OutlinedTextField,
  FilledButton,
} from "../../components/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/index";
import { loginUser } from "../../app/features/auth/authSlice";

const validate = (loginForm) => {
  let errors = {};
  // Validar email
  if (!loginForm.loginEmail.trim()) {
    errors.loginEmail = "Este campo no puede estar vacío.";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginForm.loginEmail)) {
    errors.loginEmail = "Email no válido.";
  } else {
    errors.loginEmail = "";
  }

  // Validar contraseña
  if (loginForm.loginPassword.length < 8) {
    errors.loginPassword = "La contraseña debe tener al menos 8 caracteres.";
  } else {
    errors.loginPassword = "";
  }

  return errors;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useAuthRedirect();

  const [formError, setFormError] = useState("");
  const [loginForm, setLoginForm] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const [errors, setErrors] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  // const handleChange = (event) => {
  //   const property = event.target.name;
  //   const value = event.target.value;
  //   setLoginForm({ ...loginForm, [property]: value });
  //   validate({ ...loginForm, [property]: value }, setErrors, errors, property);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Actualizar el formulario con el nuevo valor
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));

    // Validar el campo actualizado y actualizar el estado de errores para ese campo
    const currentFieldErrors = validate({ ...loginForm, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: currentFieldErrors[name],
    }));
  };

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   validate(loginForm, setErrors, errors, "loginEmail");
  //   validate(loginForm, setErrors, errors, "loginPassword");
  //   if (Object.values(errors).every((error) => error === "")) {
  //     const userData = {
  //       email: loginForm.loginEmail,
  //       password: loginForm.loginPassword,
  //     };
  //     dispatch(loginUser(userData));
  //   } else {
  //     setFormError(
  //       "Por favor corrija los errores en el formulario antes de continuar."
  //     );
  //   }
  // };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Obtener errores para todo el formulario
    const newErrors = validate(loginForm);
    setErrors(newErrors); // Actualizar el estado de errores con los nuevos errores

    // Comprobar si hay errores
    if (Object.values(newErrors).every((error) => error === "")) {
      const userData = {
        email: loginForm.loginEmail,
        password: loginForm.loginPassword,
      };
      try {
        await dispatch(loginUser(userData)).unwrap();
      } catch (error) {
        setFormError(error); // El action me devuelve error.message, estos son los errores del servidor.
      }
    }
  };

  return (
    <div className={`${styles.loginForm_background}`}>
      <div className={`${styles.loginForm_container}`} onSubmit={submitHandler}>
        Ingresar
        {formError && (
          <div className={styles.loginForm_formError}>{formError}</div>
        )}
        <form className={`${styles.loginForm}`}>
          <OutlinedTextField
            inputType="email"
            inputName="loginEmail"
            inputLabel="Email"
            inputPlaceholder="Ingrese un Email"
            inputValue={loginForm.loginEmail}
            inputOnChange={handleChange}
            inputError={errors.loginEmail}
            inputWidth={"16.75rem"}
          ></OutlinedTextField>
          <OutlinedTextField
            inputType="password"
            inputName="loginPassword"
            inputLabel="Contraseña"
            inputPlaceholder="Ingrese una contraseña"
            inputValue={loginForm.loginPassword}
            inputOnChange={handleChange}
            inputError={errors.loginPassword}
            inputWidth={"16.75rem"}
          ></OutlinedTextField>
          <FilledButton
            buttonType="submit"
            buttonText="Ingresar"
            buttonName="loginSbumit"
            buttonIcon=""
            buttonOnClick={null}
            buttonWidth="auto"
          ></FilledButton>
        </form>
        <h2 className={`${styles.loginForm_question}`}>
          ¿Aun no tienes una cuenta?
        </h2>
        <div className={styles.loginForm_buttonContainer}>
          <TextButton
            text="Crear cuenta"
            name="createAccount"
            icon=""
            onClick={() => navigate("/register")}
          />
          <TextButton
            text="Recuperar password"
            name="passRecovery"
            icon=""
            onClick={() => navigate("/passrecovery")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
