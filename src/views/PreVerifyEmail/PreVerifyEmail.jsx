import styles from "./PreVerifyEmail.module.css";
import { TextButton, OutlinedButton } from "../../components/index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PreVerifyEmail = () => {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setShowDialog(true);
    }
  }, [error]);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  if (loading) return <Spinner></Spinner>;

  if (error) {
    return (
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
    );
  }

  return (
    <div className={styles.preVerifyEmail_container}>
      <h1 className={styles.preVerifyEmail_headline}>
        ¡Gracias por registrarte!
      </h1>
      <p className={styles.preVerifyEmail_body}>
        Tu cuenta ha sido creada con exito. Revisa tu bandeja de entrada para
        verificar tu correo antes de realizar un pedido.
      </p>
      <OutlinedButton
        // type="button"
        // name="backToHome-PreVerifyEmail"
        // text="Regresar al inicio"
        // onClick={() => navigate("/")}
        buttonType="button"
        buttonName="backToHome-PreVerifyEmail"
        buttonText="Regresar al inicio"
        buttonOnClick={() => navigate("/")}
      ></OutlinedButton>
    </div>
  );
};

export default PreVerifyEmail;
