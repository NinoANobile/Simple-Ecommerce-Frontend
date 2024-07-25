import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OutlinedTextField from "../../components/TextField/OutlinedTextField";
import FilledButton from "../../components/Buttons/FilledButton";
import LogStateButton from "../../components/Develop/LogStateButton";
import { loginUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const validate = (loginForm, setErrors, errors, property) => {
  switch (property) {
    case "loginEmail":
      if (!loginForm.loginEmail.trim()) {
        setErrors({
          ...errors,
          loginEmail: "Este campo no puede estar vacío.",
        });
      } else if (
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(loginForm.loginEmail)
      ) {
        setErrors({
          ...errors,
          loginEmail: "Email no válido.",
        });
      } else {
        setErrors({
          ...errors,
          loginEmail: "",
        });
      }
      break;

    case "loginPassword":
      if (loginForm.loginPassword.length < 8) {
        setErrors({
          ...errors,
          loginPassword: "Este campo no puede estar vacío.",
        });
      } else {
        setErrors({
          ...errors,
          loginPassword: "",
        });
      }
      break;

    default:
      setErrors({
        ...errors,
      });
      break;
  }
  return;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [loginForm, setLoginForm] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  const [errors, setErrors] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setLoginForm({ ...loginForm, [property]: value });
    validate({ ...loginForm, [property]: value }, setErrors, errors, property);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.values(errors).every((error) => error === "")) {
      const userData = {
        email: loginForm.loginEmail,
        password: loginForm.loginPassword,
      };
      dispatch(loginUser(userData));
    } else {
      console.log("Hay errores en el formulario.");
    }
  };

  return (
    <div className={`${styles.loginForm_container}`} onSubmit={submitHandler}>
      Ingresar
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
      <LogStateButton></LogStateButton>
    </div>
  );
};

export default Login;
