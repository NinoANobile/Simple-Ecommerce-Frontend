import styles from "./Register.module.css";
import {
  OutlinedTextField,
  FilledButton,
  TextButton,
  Spinner,
} from "../../components/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/index";
import { registerUser } from "../../app/features/users/usersSlice";
import { loginUser } from "../../app/features/auth/authSlice";

const validate = (registerForm) => {
  let errors = {};
  const roles = ["cliente", "vendedor"];

  // Validar nombre
  if (!registerForm.registerName.trim()) {
    errors.registerName = "Este campo no puede estar vacío.";
  } else if (!/^[a-zA-Z\s]+$/.test(registerForm.registerName)) {
    errors.registerName = "Solo se permiten letras y espacios.";
  } else {
    errors.registerName = "";
  }

  // Validar apellido
  if (!registerForm.registerLastName.trim()) {
    errors.registerLastName = "Este campo no puede estar vacío.";
  } else if (!/^[a-zA-Z\s]+$/.test(registerForm.registerLastName)) {
    errors.registerLastName = "Solo se permiten letras y espacios.";
  } else {
    errors.registerLastName = "";
  }

  // // Validar rol
  // if (!roles.includes(registerForm.registerRole)) {
  //   errors.registerRole = "Debe seleccionar 'cliente' o 'vendedor'.";
  // } else {
  //   errors.registerRole = "";
  // }

  // Validar email
  if (!registerForm.registerEmail.trim()) {
    errors.registerEmail = "Este campo no puede estar vacío.";
  } else if (
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registerForm.registerEmail)
  ) {
    errors.registerEmail = "Email no válido.";
  } else {
    errors.registerEmail = "";
  }

  // Validar contraseña
  if (registerForm.registerPassword.length < 8) {
    errors.registerPassword = "La contraseña debe tener al menos 8 caracteres.";
  } else if (
    !/[A-Z]/.test(registerForm.registerPassword) ||
    !/[a-z]/.test(registerForm.registerPassword) ||
    (!/\d/.test(registerForm.registerPassword) &&
      !/[!@#\$%\^&\*]/.test(registerForm.registerPassword))
  ) {
    errors.registerPassword =
      "La contraseña debe contener al menos una letra mayúscula, una minúscula, y un número o símbolo.";
  } else {
    errors.registerPassword = "";
  }

  // Validar confirmación de contraseña vacía
  if (!registerForm.registerConfirmPassword.trim()) {
    errors.registerConfirmPassword = "Este campo no puede estar vacío.";
  }
  // Validar que las contraseñas coincidan
  else if (
    registerForm.registerPassword !== registerForm.registerConfirmPassword
  ) {
    errors.registerConfirmPassword = "Las contraseñas no coinciden.";
  } else {
    errors.registerConfirmPassword = "";
  }

  return errors;
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.users.loading);
  useAuthRedirect();

  const [registerForm, setRegisterForm] = useState({
    registerName: "",
    registerLastName: "",
    // registerRole: "",
    registerEmail: "",
    registerPassword: "",
    registerConfirmPassword: "",
  });
  const [errors, setErrors] = useState({
    registerName: "",
    registerLastName: "",
    // registerRole: "",
    registerEmail: "",
    registerPassword: "",
    registerConfirmPassword: "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Actualizar el formulario con el nuevo valor
    setRegisterForm((prevState) => ({ ...prevState, [name]: value }));

    // Validar el campo actualizado y actualizar el estado de errores para ese campo
    const currentFieldErrors = validate({ ...registerForm, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: currentFieldErrors[name],
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const newErrors = validate(registerForm);
    setErrors(newErrors); // Actualizar el estado de errores con los nuevos errores

    // Comprobar si hay errores
    if (Object.values(newErrors).every((error) => error === "")) {
      const userData = {
        name: registerForm.registerName,
        lastName: registerForm.registerLastName,
        role: "usuario",
        email: registerForm.registerEmail,
        password: registerForm.registerPassword,
      };

      try {
        // Crear la cuenta
        await dispatch(registerUser(userData)).unwrap();

        // Iniciar sesión automáticamente después del registro
        await dispatch(
          loginUser({
            email: userData.email,
            password: userData.password,
          })
        ).unwrap();

        // Redirigir al home
        navigate("/pre-verify-email");
      } catch (error) {
        console.error("Error:", error.message);
        setFormError(error); // El action me devuelve error.message, estos son los errores del servidor.
      }
    } else {
      setFormError(
        "Por favor corrija los errores en el formulario antes de continuar."
      );
    }
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={`${styles.registerForm_background}`}>
      <div
        className={`${styles.registerForm_container}`}
        onSubmit={submitHandler}
      >
        Cuenta nueva
        {formError && <div className={styles.formError}>{formError}</div>}
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
          {/*         
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
         */}
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
          <OutlinedTextField
            inputType="password"
            inputName="registerConfirmPassword"
            inputLabel="Confirmar contraseña"
            inputPlaceholder="Ingrese una contraseña"
            inputValue={registerForm.registerConfirmPassword}
            inputOnChange={handleChange}
            inputError={errors.registerConfirmPassword}
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
        <div>
          <h2 className={`${styles.registerForm_question}`}>
            ¿Aun no tienes una cuenta?
          </h2>
          <div className={styles.registerForm_buttonContainer}>
            <TextButton
              text="Iniciar sesión"
              onClick={() => navigate("/login")}
            ></TextButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
