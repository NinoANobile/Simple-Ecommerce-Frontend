import styles from "./ForgotPassword.module.css";
import {
  OutlinedTextField,
  TextButton,
  FilledButton,
  Dialog,
  Spinner,
} from "../../components/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  requestPasswordReset,
  clearAuthError,
} from "../../app/features/auth/authSlice";

const validate = (forgotPasswordForm) => {
  let errors = {};
  // Validar email
  if (!forgotPasswordForm.forgotEmail.trim()) {
    errors.forgotEmail = "Este campo no puede estar vacío.";
  } else if (
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(forgotPasswordForm.forgotEmail)
  ) {
    errors.forgotEmail = "Email no válido.";
  } else {
    errors.forgotEmail = "";
  }

  return errors;
};

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Estado para manejar los diálogos
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false); // Nuevo estado para el éxito

  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    forgotEmail: "",
  });

  const [errors, setErrors] = useState({
    forgotEmail: "",
  });

  useEffect(() => {
    if (error) {
      setShowDialog(true); // Mostrar el diálogo de error si hay error
    }
  }, [error]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Actualizar el formulario con el nuevo valor
    setForgotPasswordForm((prevState) => ({ ...prevState, [name]: value }));

    // Validar el campo actualizado y actualizar el estado de errores para ese campo
    const currentFieldErrors = validate({
      ...forgotPasswordForm,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: currentFieldErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      requestPasswordReset({ email: forgotPasswordForm.forgotEmail })
    ).unwrap();
    if (!error) {
      setShowSuccessDialog(true); // Mostrar el diálogo de éxito si el correo se envía correctamente
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    dispatch(clearAuthError());
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    navigate("/"); // Redirigir al home
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className={styles.forgotPassword_container}>
      <h1 className={styles.forgotPassword_headline}>Recuperar Contraseña</h1>
      <form onSubmit={handleSubmit} className={styles.forgotPassword_form}>
        <OutlinedTextField
          inputType="email"
          inputName="forgotEmail"
          inputLabel="Email"
          inputPlaceholder="Introduce tu correo"
          inputValue={forgotPasswordForm.forgotEmail}
          inputError={errors.forgotEmail}
          inputOnChange={handleChange}
        ></OutlinedTextField>
        <FilledButton
          buttonType="submit"
          buttonText={loading ? "Enviando..." : "Enviar correo de recuperación"}
          buttonName="sendPasswordRecoveryEmail-forgotPassword"
        ></FilledButton>
      </form>

      {/* Diálogo de éxito */}
      {showSuccessDialog && (
        <Dialog
          isOpen={showSuccessDialog}
          title="Correo enviado"
          content="El correo de recuperación ha sido enviado con éxito. Revisa tu bandeja de entrada para continuar."
          actions={
            <>
              <FilledButton
                buttonType="button"
                buttonText="Ir al home"
                buttonOnClick={handleCloseSuccessDialog}
              />
              <FilledButton
                buttonType="button"
                buttonText="Cerrar"
                buttonOnClick={handleCloseSuccessDialog}
              />
            </>
          }
        />
      )}

      {/* Diálogo de error */}
      {error && (
        <Dialog
          isOpen={showDialog}
          title="Error"
          content={error}
          actions={
            <>
              <TextButton
                text="Home"
                icon="home"
                onClick={() => navigate("/")}
              ></TextButton>
              <TextButton
                text="Cerrar"
                icon="close"
                onClick={handleCloseDialog}
              ></TextButton>
            </>
          }
        />
      )}
    </div>
  );
};

export default ForgotPassword;
