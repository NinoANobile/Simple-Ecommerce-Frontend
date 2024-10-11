import styles from "./ResetPassword.module.css";
import {
  OutlinedTextField,
  FilledButton,
  Dialog,
  Spinner,
} from "../../components/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  resetPassword,
} from "../../app/features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const validate = (resetPasswordForm) => {
  let errors = {};

  if (!resetPasswordForm.newPassword.trim()) {
    errors.newPassword = "Este campo no puede estar vacío.";
  } else if (resetPasswordForm.newPassword.length < 8) {
    errors.newPassword = "La contraseña debe tener al menos 8 caracteres.";
  } else {
    errors.newPassword = "";
  }

  if (!resetPasswordForm.confirmPassword.trim()) {
    errors.confirmPassword = "Este campo no puede estar vacío.";
  } else if (
    resetPasswordForm.newPassword !== resetPasswordForm.confirmPassword
  ) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  } else {
    errors.confirmPassword = "";
  }

  return errors;
};

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);

  // Estados para manejar los diálogos
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false); // Nuevo estado para el diálogo de error

  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (error) {
      setShowErrorDialog(true); // Mostrar el diálogo de error si hay error
    }
  }, [error]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResetPasswordForm((prevState) => ({ ...prevState, [name]: value }));

    const currentFieldErrors = validate({
      ...resetPasswordForm,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: currentFieldErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errors.newPassword && !errors.confirmPassword) {
      console.log(
        "Este es el nuevo passoword: ",
        resetPasswordForm.newPassword
      );
      console.log("Este es el token: ", token);

      try {
        await dispatch(
          resetPassword({
            password: resetPasswordForm.newPassword,
            token,
          })
        ).unwrap();
        setShowSuccessDialog(true); // Mostrar el diálogo de éxito si la acción fue exitosa
      } catch (error) {
        setShowErrorDialog(true); // Mostrar el diálogo de error si la acción falla
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    navigate("/login"); // Redirigir al login al cerrar el diálogo de éxito
  };

  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false); // Cerrar el diálogo de error
    dispatch(clearAuthError);
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className={styles.resetPassword_container}>
      <h1 className={styles.resetPassword_headline}>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit} className={styles.resetPassword_form}>
        <OutlinedTextField
          inputType="password"
          inputName="newPassword"
          inputLabel="Nueva Contraseña"
          inputPlaceholder="Introduce tu nueva contraseña"
          inputValue={resetPasswordForm.newPassword}
          inputError={errors.newPassword}
          inputOnChange={handleChange}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="password"
          inputName="confirmPassword"
          inputLabel="Confirmar Contraseña"
          inputPlaceholder="Confirma tu nueva contraseña"
          inputValue={resetPasswordForm.confirmPassword}
          inputError={errors.confirmPassword}
          inputOnChange={handleChange}
        ></OutlinedTextField>
        <FilledButton
          buttonType="submit"
          buttonText={loading ? "Enviando..." : "Restablecer Contraseña"}
          buttonName="resetPasswordButton"
        ></FilledButton>
      </form>

      {/* Diálogo de éxito */}
      {showSuccessDialog && (
        <Dialog
          isOpen={showSuccessDialog}
          title="Contraseña restablecida"
          content="Tu contraseña ha sido restablecida correctamente. Ahora puedes iniciar sesión con tu nueva contraseña."
          actions={
            <FilledButton
              buttonType="button"
              buttonText="Ir al login"
              buttonOnClick={handleCloseSuccessDialog}
            />
          }
        />
      )}

      {/* Diálogo de error */}
      {showErrorDialog && (
        <Dialog
          isOpen={showErrorDialog}
          title="Error"
          content={error || "Hubo un error al restablecer tu contraseña."}
          actions={
            <FilledButton
              buttonType="button"
              buttonText="Cerrar"
              buttonOnClick={handleCloseErrorDialog}
            />
          }
        />
      )}
    </div>
  );
};

export default ResetPassword;
