import styles from "./ProductDetailData.module.css";
import { OutlinedButton, Dialog } from "../index";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions";

const ProdDetailData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  console.log("Renderizando ProdDetailData2");

  const prodDetail = useSelector((state) => state.products.byId[id]);

  // const [isProductDeleted, setIsProductDeleted] = useState(false);
  const isProductDeletedRef = useRef(false);

  console.log(
    "Esto es isProductDeletedRef acaba de nacer: ",
    isProductDeletedRef.current
  );

  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({});

  // Manejo de efectos laterales
  useEffect(() => {
    console.log(
      "Esto es isProductDeletedRef en useEffect: ",
      isProductDeletedRef.current
    );

    if (isProductDeletedRef.current) {
      setDialogContent({
        title: "Producto eliminado con éxito",
        content: "El producto se ha borrado correctamente.",
        redirectPath: "/",
        actions: (
          <>
            <button
              onClick={() => {
                navigate("/");
                isProductDeletedRef.current = false; // Restablecer isProductDeletedRef
              }}
            >
              Ir al Home
            </button>
          </>
        ),
      });
      setShowDialog(true);
      console.log("showDialog", showDialog);
      console.log("dialogContent", dialogContent);
    }
  }, [navigate, showDialog, dialogContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Eliminar producto clickeado");
    dispatch(deleteProduct(prodDetail.id))
      .then(() => {
        isProductDeletedRef.current = true; // Usar useRef para mantener el estado
        console.log(
          "Esto es isProductDeletedRef en handleSubmit: ",
          isProductDeletedRef.current
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    if (isProductDeletedRef.current) {
      navigate("/"); // Navega al home si el producto fue eliminado
      isProductDeletedRef.current = false; // Restablece el estado local
    }
  };

  return (
    <div className={`${styles.datacontainer}`}>
      <div className={`${styles.data_category}`}>
        {"asd"} {">"} {"asd"}
      </div>
      <div className={`${styles.data_calstock}`}>
        <h2 className={`${styles.data_cal}`}>Stock disponible: {10}</h2>
      </div>
      <form onSubmit={handleSubmit} className={`${styles.data_form}`}>
        <OutlinedButton
          buttonType="submit"
          buttonText="Eliminar"
          buttonName="delete"
          buttonIcon=""
          buttonWidth="auto"
        />
        <Dialog
          isOpen={showDialog}
          onClose={handleDialogClose}
          title={dialogContent.title}
          content={dialogContent.content}
          actions={dialogContent.actions}
        />
      </form>
    </div>
  );
};

export default ProdDetailData;
