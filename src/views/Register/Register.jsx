import styles from "./Register.module.css";
import OutlinedTextField from "../../components/TextField/OutlinedTextField";
import FilledButton from "../../components/Buttons/FilledButton";
import LogStateButton from "../../components/Develop/LogStateButton";
import { useState, useEffect } from "react";
import { registerUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const validate = (registerForm, setErrors, errors, property) => {
  const roles = ["cliente", "vendedor"];

  switch (property) {
    case "registerName":
      if (!registerForm.registerName.trim()) {
        setErrors({
          ...errors,
          registerName: "Este campo no puede estar vacío.",
        });
      } else if (!/^[a-zA-Z\s]+$/.test(registerForm.registerName)) {
        setErrors({
          ...errors,
          registerName: "Solo se permiten letras y espacios.",
        });
      } else {
        setErrors({
          ...errors,
          registerName: "",
        });
      }
      break;

    case "registerLastName":
      if (!registerForm.registerLastName.trim()) {
        setErrors({
          ...errors,
          registerLastName: "Este campo no puede estar vacío.",
        });
      } else if (!/^[a-zA-Z\s]+$/.test(registerForm.registerLastName)) {
        setErrors({
          ...errors,
          registerLastName: "Solo se permiten letras y espacios.",
        });
      } else {
        setErrors({
          ...errors,
          registerLastName: "",
        });
      }
      break;

    case "registerRole":
      if (!roles.includes(registerForm.registerRole)) {
        setErrors({
          ...errors,
          registerRole: "Debe seleccionar 'cliente' o 'vendedor'.",
        });
      } else {
        setErrors({
          ...errors,
          registerRole: "",
        });
      }
      break;

    case "registerEmail":
      if (!registerForm.registerEmail.trim()) {
        setErrors({
          ...errors,
          registerEmail: "Este campo no puede estar vacío.",
        });
      } else if (
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerForm.registerEmail)
      ) {
        setErrors({
          ...errors,
          registerEmail: "Email no válido.",
        });
      } else {
        setErrors({
          ...errors,
          registerEmail: "",
        });
      }
      break;

    case "registerPassword":
      if (registerForm.registerPassword.length < 8) {
        setErrors({
          ...errors,
          registerPassword: "La contraseña debe tener al menos 8 caracteres.",
        });
      } else if (
        !/[A-Z]/.test(registerForm.registerPassword) ||
        !/[a-z]/.test(registerForm.registerPassword) ||
        (!/\d/.test(registerForm.registerPassword) &&
          !/[!@#\$%\^&\*]/.test(registerForm.registerPassword))
      ) {
        setErrors({
          ...errors,
          registerPassword:
            "La contraseña debe contener al menos una letra mayúscula, una minúscula, y un número o símbolo.",
        });
      } else {
        setErrors({
          ...errors,
          registerPassword: "",
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [registerForm, setRegisterForm] = useState({
    registerName: "",
    registerLastName: "",
    registerRole: "",
    registerEmail: "",
    registerPassword: "",
  });
  const [errors, setErrors] = useState({
    registerName: "",
    registerLastName: "",
    registerRole: "",
    registerEmail: "",
    registerPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setRegisterForm({ ...registerForm, [property]: value });
    validate(
      { ...registerForm, [property]: value },
      setErrors,
      errors,
      property
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.values(errors).every((error) => error === "")) {
      const userData = {
        name: registerForm.registerName,
        lastName: registerForm.registerLastName,
        role: registerForm.registerRole,
        email: registerForm.registerEmail,
        password: registerForm.registerPassword,
      };
      dispatch(registerUser(userData));
      navigate("/login");
    } else {
      console.log("Hay errores en el formulario.");
    }
  };

  return (
    <div
      className={`${styles.registerForm_container}`}
      onSubmit={submitHandler}
    >
      Cuenta nueva
      <form className={`${styles.registerForm}`}>
        <OutlinedTextField
          inputType="text"
          inputName="registerName"
          inputLabel="Nombre"
          inputPlaceholder="Ingrese su nombre"
          inputValue={registerForm.registerName}
          inputOnChange={handleChange}
          inputError={errors.registerName}
          inputWidth={"16.75rem"}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="registerLastName"
          inputLabel="Apellido"
          inputPlaceholder="Ingrese su apellido"
          inputValue={registerForm.registerLastName}
          inputOnChange={handleChange}
          inputError={errors.registerLastName}
          inputWidth={"16.75rem"}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="registerRole"
          inputLabel="Rol"
          inputPlaceholder="Solo se ve en una cuenta admin"
          inputValue={registerForm.registerRole}
          inputOnChange={handleChange}
          inputError={errors.registerRole}
          inputWidth={"16.75rem"}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="email"
          inputName="registerEmail"
          inputLabel="Email"
          inputPlaceholder="Ingrese un Email"
          inputValue={registerForm.registerEmail}
          inputOnChange={handleChange}
          inputError={errors.registerEmail}
          inputWidth={"16.75rem"}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="password"
          inputName="registerPassword"
          inputLabel="Contraseña"
          inputPlaceholder="Ingrese una contraseña"
          inputValue={registerForm.registerPassword}
          inputOnChange={handleChange}
          inputError={errors.registerPassword}
          inputWidth={"16.75rem"}
        ></OutlinedTextField>
        <FilledButton
          buttonType="submit"
          buttonText="Suscribirse"
          buttonName="registerSbumit"
          buttonIcon=""
          buttonOnClick={null}
          buttonWidth="auto"
        ></FilledButton>
      </form>
      <LogStateButton></LogStateButton>
    </div>
  );
};

export default Register;
