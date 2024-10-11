import styles from "./VerifyEmail.module.css";
import {
  OutlinedButton,
  Spinner,
  Dialog,
  TextButton,
} from "../../components/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../app/features/auth/authSlice";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [token, dispatch]);

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
    <div className={styles.verifyEmail_container}>
      <h1 className={styles.preVerifyEmail_headline}>
        ¡Correo verificado exitosamente!
      </h1>
      <p className={styles.preVerifyEmail_body}>
        Ya peudes disfrutar de todas las funciones del ecommerce.
      </p>
      <OutlinedButton
        buttonType="button"
        buttonName="backToHome-VerifyEmail"
        buttonText="Regresar al inicio"
        buttonOnClick={() => navigate("/")}
      ></OutlinedButton>
    </div>
  );
};

export default VerifyEmail;
