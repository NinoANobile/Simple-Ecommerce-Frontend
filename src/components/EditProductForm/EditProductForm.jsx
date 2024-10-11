// import styles from "./EditProductForm.module.css";
// import { FilledButton, OutlinedTextField, Checkbox, Dialog } from "../index";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { resetProductCreationFlag } from "../../redux/actions";

// const validate = (editProductForm, setErrors, errors, property) => {
//   const value = editProductForm[property];
//   let newErrors = { ...errors };

//   switch (property) {
//     case "editProductName":
//       newErrors.editProductName = value.trim()
//         ? ""
//         : "El nombre del producto no puede estar vacío.";
//       break;

//     case "editProductDescription":
//       newErrors.editProductDescription = value.trim()
//         ? ""
//         : "La descripción no puede estar vacía.";
//       break;

//     case "editProductBrand":
//       newErrors.editProductBrand = value.trim()
//         ? ""
//         : "La marca no puede estar vacía.";
//       break;

//     case "editProductPrice":
//       if (!value.trim()) {
//         newErrors.editProductPrice = "El precio no puede estar vacío.";
//       } else if (isNaN(value) || parseFloat(value) <= 0) {
//         newErrors.editProductPrice = "Ingrese un precio válido (mayor a 0).";
//       } else {
//         newErrors.editProductPrice = "";
//       }
//       break;

//     case "editProductStock":
//       if (!value.trim()) {
//         newErrors.editProductStock = "El stock no puede estar vacío.";
//       } else if (isNaN(value) || parseInt(value) < 0) {
//         newErrors.editProductStock = "El stock debe ser un número no negativo.";
//       } else {
//         newErrors.editProductStock = "";
//       }
//       break;

//     case "editProductCategory":
//       newErrors.editProductCategory = value.trim()
//         ? ""
//         : "La categoría no puede estar vacía.";
//       break;

//     case "editProductSubCategory":
//       newErrors.editProductSubCategory = value.trim()
//         ? ""
//         : "La subcategoría no puede estar vacía.";
//       break;

//     default:
//       break;
//   }

//   setErrors(newErrors);
// };

// const EditProductForm = ({ product, onSave }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const currentImages = product.imageUrl || [];

//   const productState = useSelector((state) => state.products);

//   const [showDialog, setShowDialog] = useState(false);
//   const [dialogContent, setDialogContent] = useState({});

//   const [isFeatured, setIsFeatured] = useState(product.featured);
//   const [files, setFiles] = useState([]);

//   // const [currentImages, setCurrentImages] = useState(product.imageUrl || []);
//   const [imagesToDelete, setImagesToDelete] = useState([]);

//   const [editProductForm, setEditProductForm] = useState({
//     editProductName: product.name,
//     editProductDescription: product.description,
//     editProductBrand: product.brand,
//     editProductPrice: product.price,
//     editProductStock: product.stock,
//     editProductCategory: product.category,
//     editProductSubCategory: product.subcategory,
//   });
//   const [errors, setErrors] = useState({
//     editProductName: "",
//     editProductDescription: "",
//     editProductBrand: "",
//     editProductPrice: "",
//     editProductStock: "",
//     editProductCategory: "",
//     editProductSubCategory: "",
//   });

//   useEffect(() => {
//     if (productState.isProductCreated) {
//       setDialogContent({
//         title: "Producto editado con éxito",
//         content: "El producto se ha modificado correctamente.",
//         actions: (
//           <>
//             <button
//               onClick={() => {
//                 navigate("/");
//                 dispatch(resetProductCreationFlag());
//               }}
//             >
//               Ir al Home
//             </button>
//           </>
//         ),
//       });
//       setShowDialog(true);
//     } else if (productState.error) {
//       setDialogContent({
//         title: "Error al cargar el producto",
//         content: productState.error,
//         actions: <button onClick={() => setShowDialog(false)}>Cerrar</button>,
//       });
//       setShowDialog(true);
//     }
//   }, [productState.isProductCreated, productState.error, navigate, dispatch]);

//   const handleChange = (event) => {
//     const property = event.target.name;
//     const value = event.target.value;
//     setEditProductForm({ ...editProductForm, [property]: value });
//     validate(
//       { ...editProductForm, [property]: value },
//       setErrors,
//       errors,
//       property
//     );
//   };

//   const handleFileChange = (event) => {
//     setFiles([...event.target.files]);
//   };

//   const handleCheckboxChange = (isChecked) => {
//     setIsFeatured(isChecked);
//     console.log("Checkbox is now: ", isChecked);
//   };

//   const handleDialogClose = () => {
//     dispatch(resetProductCreationFlag());
//     setShowDialog(false);
//   };

//   const toggleImageToDelete = (url) => {
//     const currentIndex = imagesToDelete.indexOf(url);
//     const newImagesToDelete = [...imagesToDelete];

//     if (currentIndex === -1) {
//       newImagesToDelete.push(url);
//     } else {
//       newImagesToDelete.splice(currentIndex, 1);
//     }

//     setImagesToDelete(newImagesToDelete);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (Object.values(errors).every((error) => error === "")) {
//       const formData = new FormData();

//       Array.from(files).forEach((file) => {
//         formData.append("images", file);
//       });

//       // Añadir imágenes para eliminar
//       imagesToDelete.forEach((imageUrl) => {
//         formData.append("imagesToDelete", imageUrl);
//       });

//       formData.append("id", product.id);
//       formData.append("name", editProductForm.editProductName);
//       formData.append("description", editProductForm.editProductDescription);
//       formData.append("brand", editProductForm.editProductBrand);
//       formData.append("price", editProductForm.editProductPrice);
//       formData.append("stock", editProductForm.editProductStock);
//       formData.append("category", editProductForm.editProductCategory);
//       formData.append("subcategory", editProductForm.editProductSubCategory);
//       formData.append("featured", isFeatured);

//       console.log("Datos a enviar:", Object.fromEntries(formData));
//       console.log("Datos a enviar:", formData);

//       onSave(formData);
//     }
//   };

//   return (
//     <div>
//       <div>
//         {currentImages.map((url, index) => (
//           <div key={index}>
//             <img
//               src={url}
//               alt={`Product Image ${index + 1}`}
//               style={{ width: "100px", height: "100px" }}
//             />
//             <button type="button" onClick={() => toggleImageToDelete(url)}>
//               {imagesToDelete.includes(url)
//                 ? "Cancelar Eliminación"
//                 : "Eliminar"}
//             </button>
//           </div>
//         ))}
//       </div>
//       <form>
//         <OutlinedTextField
//           inputType="text"
//           inputName="editProductName"
//           inputLabel="Nombre"
//           inputPlaceholder="Ingrese nombre del producto"
//           inputValue={editProductForm.editProductName}
//           inputOnChange={handleChange}
//           inputError={errors.editProductName}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="text"
//           inputName="editProductDescription"
//           inputLabel="Descripción"
//           inputPlaceholder="¿Que es este producto?"
//           inputValue={editProductForm.editProductDescription}
//           inputOnChange={handleChange}
//           inputError={errors.editProductDescription}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="text"
//           inputName="editProductBrand"
//           inputLabel="Marca"
//           inputPlaceholder="Marca del producto"
//           inputValue={editProductForm.editProductBrand}
//           inputOnChange={handleChange}
//           inputError={errors.editProductBrand}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="number"
//           inputName="editProductPrice"
//           inputLabel="Precio"
//           inputPlaceholder="Ingrese precio unitario"
//           inputValue={editProductForm.editProductPrice}
//           inputOnChange={handleChange}
//           inputError={errors.editProductPrice}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="number"
//           inputName="editProductStock"
//           inputLabel="Stock"
//           inputPlaceholder="Ingrese unidades disponibles"
//           inputValue={editProductForm.editProductStock}
//           inputOnChange={handleChange}
//           inputError={errors.editProductStock}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="text"
//           inputName="editProductCategory"
//           inputLabel="Categoria"
//           inputPlaceholder="Ej: Hogar"
//           inputValue={editProductForm.editProductCategory}
//           inputOnChange={handleChange}
//           inputError={errors.editProductCategory}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="text"
//           inputName="editProductSubCategory"
//           inputLabel="Subcategoria"
//           inputPlaceholder="Ej: Muebles"
//           inputValue={editProductForm.editProductSubCategory}
//           inputOnChange={handleChange}
//           inputError={errors.editProductSubCategory}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="file"
//           inputName="editProductImage"
//           inputLabel="" // Sin etiqueta
//           inputPlaceholder="Seleccione las imagenes"
//           inputOnChange={handleFileChange}
//           //   inputError={errors.editProductImage}
//           inputAccept="image/*"
//           inputMultiple={true}
//         ></OutlinedTextField>
//         <Checkbox
//           label="Destacado"
//           defaultChecked={product.featured}
//           onChange={handleCheckboxChange}
//         ></Checkbox>
//         <FilledButton
//           buttonType="submit"
//           buttonText="Guardar Cambios"
//           buttonName="editProductButton"
//           buttonIcon=""
//           buttonOnClick={handleSubmit}
//           buttonWidth="auto"
//         ></FilledButton>
//         {files.length > 0 && (
//           <ul>
//             {Array.from(files).map((file, index) => (
//               <li key={index}>{file.name}</li>
//             ))}
//           </ul>
//         )}
//       </form>
//       <Dialog
//         isOpen={showDialog}
//         onClose={() => handleDialogClose()}
//         title={dialogContent.title}
//         content={dialogContent.content}
//         actions={dialogContent.actions}
//       />
//     </div>
//   );
// };

// export default EditProductForm;

import styles from "./EditProductForm.module.css";
import {
  FilledButton,
  OutlinedTextField,
  TextButton,
  Checkbox,
  Dialog,
  Spinner,
} from "../index";
import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../app/features/products/productsSlice";
// import { updateProduct } from "../../redux/actions";

function getInitialState(product) {
  console.log(product);
  return {
    values: {
      editProductId: product.id,
      editProductName: product.name,
      editProductDescription: product.description,
      editProductBrand: product.brand,
      editProductPrice: product.price,
      editProductStock: product.stock,
      editProductCategory: product.category,
      editProductSubCategory: product.subcategory,
      isFeatured: product.featured,
    },
    errors: {
      editProductName: "",
      editProductDescription: "",
      editProductBrand: "",
      editProductPrice: "",
      editProductStock: "",
      editProductCategory: "",
      editProductSubCategory: "",
      files: "",
    },
    generalErrors: "",
    loadFiles: product.imageUrl || [],
    files: [],
    imagesToDelete: [],
    showDialog: false,
    dialogContent: {
      title: "",
      content: "",
      actions: null,
    },
    isProductUpdated: false,
  };
}

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      const updatedValues = { ...state.values, [action.field]: action.value };
      const updatedState = { ...state, values: updatedValues }; // Actualizamos todo el estado
      const updatedErrors = {
        ...state.errors,
        [action.field]: validateField(updatedState, action.field), // Pasa el estado completo
      };
      return { ...updatedState, errors: updatedErrors };

    case "TOGGLE_FEATURED":
      return {
        ...state,
        values: { ...state.values, isFeatured: !state.values.isFeatured },
      };

    case "SET_ERRORS":
      return { ...state, errors: action.errors };

    case "SET_GENERAL_ERRORS":
      return { ...state, generalErrors: action.errors };

    case "UPDATE_FILES":
      // Directamente actualizar la lista de archivos en el estado
      const filesErrors = validateField(
        { ...state, files: action.files },
        "files"
      ); // Asegúrate de pasar todo el estado
      // Actualizar el estado con los nuevos archivos y cualquier error asociado
      return {
        ...state,
        files: action.files,
        errors: { ...state.errors, files: filesErrors },
      };

    case "TOGGLE_IMAGE_TO_DELETE":
      const currentIndex = state.imagesToDelete.indexOf(action.imageUrl);
      let newImagesToDelete = [...state.imagesToDelete];

      if (currentIndex === -1) {
        newImagesToDelete.push(action.imageUrl);
      } else {
        newImagesToDelete.splice(currentIndex, 1);
      }

      // Revalida los errores de archivo tras actualizar las imágenes a eliminar
      const deleteFilesErrors = validateFiles(
        state.files,
        state.loadFiles,
        newImagesToDelete
      );
      return {
        ...state,
        imagesToDelete: newImagesToDelete,
        errors: { ...state.errors, files: deleteFilesErrors }, // Actualiza el error de archivos
      };

    case "UPDATE_DIALOG":
      return { ...state, showDialog: true, dialogContent: action.content };

    case "CLOSE_DIALOG":
      return {
        ...state,
        showDialog: false,
        dialogContent: { title: "", content: "", actions: null },
        isProductUpdated: false,
      };
    case "PRODUCT_UPDATED":
      return {
        ...state,
        isProductUpdated: true,
      };

    default:
      return state;
  }
};

const validateField = (state, field) => {
  let error = "";
  const values = state.values;

  switch (field) {
    case "editProductName":
      error = values.editProductName.trim()
        ? ""
        : "El nombre del producto no puede estar vacío.";
      break;

    case "editProductDescription":
      error = values.editProductDescription.trim()
        ? ""
        : "La descripción no puede estar vacía.";
      break;

    case "editProductBrand":
      error = values.editProductBrand.trim()
        ? ""
        : "La marca no puede estar vacía.";
      break;

    case "editProductPrice": // ESTO ES UN STRING REVISAR BACK
      error = !values.editProductPrice.trim()
        ? "El precio no puede estar vacío."
        : isNaN(values.editProductPrice) ||
          parseFloat(values.editProductPrice) <= 0
        ? "Ingrese un precio válido (mayor a 0)."
        : "";
      break;

    case "editProductStock": // ESTO ES UN NUMERO REVISAR BACK
      const stock = String(values.editProductStock).trim();
      error = !stock
        ? "El stock no puede estar vacío."
        : isNaN(parseInt(stock)) || parseInt(stock) < 0
        ? "El stock debe ser un número no negativo."
        : "";
      break;

    case "editProductCategory":
      error = values.editProductCategory.trim()
        ? ""
        : "La categoría no puede estar vacía.";
      break;

    case "editProductSubCategory":
      error = values.editProductSubCategory.trim()
        ? ""
        : "La subcategoría no puede estar vacía.";
      break;

    case "files":
      error = validateFiles(state.files);
      break;

    default:
      break;
  }
  return error;
};

function validateFiles(files) {
  // Solo validar archivos si hay archivos presentes
  if (files && files.length > 0) {
    let fileErrors = files
      .map((file) => {
        let errors = [];
        if (!file.type.startsWith("image/")) {
          errors.push("Solo se permiten archivos de imagen.");
        }
        if (file.size > 5000000) {
          // Limitar el tamaño del archivo a 5 MB
          errors.push("El tamaño del archivo no debe superar los 5 MB.");
        }
        return errors.join(", ");
      })
      .filter((error) => error !== "");

    if (fileErrors.length > 0) {
      return fileErrors.join("; "); // Devuelve los errores de validación de archivos
    }
  }

  // No hay errores si no se cumplen las condiciones anteriores
  return "";
}

const validate = (state) => {
  let errors = {};

  // Valida campos comunes en state.values
  Object.keys(state.values).forEach((key) => {
    errors[key] = validateField(state, key); // Pasa el estado completo y el nombre del campo
  });

  // Valida 'files' pasando los datos específicos necesarios
  errors["files"] = validateField(state.files, "files");

  return errors;
};

const EditProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const product = useSelector((state) => state.products.byId[id]);

  const [state, formDispatch] = useReducer(
    formReducer,
    product,
    getInitialState
  );

  const [initialState, setInitialState] = useState();

  useEffect(() => {
    setInitialState(state); // Guarda el estado actual como estado inicial
  }, [product]);

  useEffect(() => {
    if (state.isProductUpdated && !error) {
      formDispatch({
        type: "UPDATE_DIALOG",
        content: {
          title: "Producto actualizado con éxito",
          content: "El producto se ha actualizado correctamente.",
          actions: (
            <>
              <TextButton
                text="Cerrar"
                onClick={() => {
                  // navigate("/");
                  formDispatch({ type: "CLOSE_DIALOG" });
                }}
              ></TextButton>
              <TextButton
                text="Ir a Home"
                onClick={() => {
                  navigate("/");
                  formDispatch({ type: "CLOSE_DIALOG" });
                }}
              ></TextButton>
            </>
          ),
        },
      });
    }
  }, [state.isProductUpdated, navigate]);

  const handleDialogClose = () => {
    formDispatch({ type: "CLOSE_DIALOG" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formDispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleFileChange = (event) => {
    formDispatch({ type: "UPDATE_FILES", files: [...event.target.files] });
  };

  const handleCheckboxChange = () => {
    formDispatch({ type: "TOGGLE_FEATURED" });
  };

  const handleImageDelete = (imageUrl) => {
    formDispatch({ type: "TOGGLE_IMAGE_TO_DELETE", imageUrl });
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = state.files.filter(
      (_, index) => index !== indexToRemove
    );
    formDispatch({ type: "UPDATE_FILES", files: updatedFiles });
  };

  const filterStateForComparison = (state) => {
    const { errors, generalErrors, ...filteredState } = state;
    return filteredState;
  };

  const submitHandler = async (event) => {
    console.log("Este es el ID del producto: ", state.values.editProductId);
    event.preventDefault();

    const newErrors = validate(state); // Valida todos los campos del formulario
    const noErrors = Object.values(newErrors).every((error) => error === "");

    // Verificar si hay suficientes imágenes
    const sufficientImages =
      state.files.length > 0 ||
      state.loadFiles.length > state.imagesToDelete.length;

    // Comparación de estados, excluyendo los errores
    const filteredCurrentState = filterStateForComparison(state);
    const filteredInitialState = filterStateForComparison(initialState);

    const currentStateString = JSON.stringify(filteredCurrentState);
    const originalStateString = JSON.stringify(filteredInitialState);

    // Si no se han hecho cambios en el formulario
    if (currentStateString === originalStateString) {
      formDispatch({
        type: "SET_GENERAL_ERRORS",
        errors: "No se han detectado cambios en el formulario.",
      });
      return;
    } else {
      formDispatch({
        type: "SET_GENERAL_ERRORS",
        errors: "",
      });
    }
    // Si no hay suficientes imágenes, mostrar un error general
    if (!sufficientImages) {
      formDispatch({
        type: "SET_GENERAL_ERRORS",
        errors:
          "Asegúrese de que haya al menos una imagen del producto antes de continuar.",
      });
      return;
    } else {
      formDispatch({
        type: "SET_GENERAL_ERRORS",
        errors: "",
      });
    }

    // Si no hay errores en los inputs y hay suficientes imágenes, proceder
    if (noErrors) {
      const formData = new FormData();
      Array.from(state.files).forEach((file) => {
        formData.append("images", file);
      });

      state.imagesToDelete.forEach((imageUrl) => {
        formData.append("imagesToDelete", imageUrl);
      });

      formData.append("id", state.values.editProductId);
      formData.append("name", state.values.editProductName);
      formData.append("description", state.values.editProductDescription);
      formData.append("brand", state.values.editProductBrand);
      formData.append("price", state.values.editProductPrice);
      formData.append("stock", state.values.editProductStock);
      formData.append("category", state.values.editProductCategory);
      formData.append("subcategory", state.values.editProductSubCategory);
      formData.append("featured", state.values.isFeatured);
      await dispatch(updateProduct(formData)).unwrap();
      formDispatch({ type: "PRODUCT_UPDATED" });
    } else {
      formDispatch({ type: "SET_ERRORS", errors: newErrors });
    }
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <>
      {state.generalErrors && (
        <div className={styles.formError}>{state.generalErrors}</div>
      )}
      <div className={`${styles.editProductForm_container}`}>
        <div className={`${styles.editProductForm_previewContainer}`}>
          <span>Imagenes subidas</span>
          {state.loadFiles.map((url, index) => (
            <div key={index} className={`${styles.editProductForm_preview}`}>
              <img src={url} alt={`Product Image ${index + 1}`} />
              <TextButton
                text={
                  state.imagesToDelete.includes(url)
                    ? "Cancelar Eliminación"
                    : "Eliminar"
                }
                icon="close"
                onClick={() => handleImageDelete(url)}
              />
            </div>
          ))}
        </div>

        <form className={`${styles.editProductForm}`}>
          <OutlinedTextField
            inputType="text"
            inputName="editProductName"
            inputLabel="Nombre"
            inputPlaceholder="Ingrese nombre del producto"
            inputValue={state.values.editProductName}
            inputOnChange={handleChange}
            inputError={state.errors.editProductName}
          ></OutlinedTextField>
          <OutlinedTextField
            inputType="text"
            inputName="editProductDescription"
            inputLabel="Descripción"
            inputPlaceholder="¿Que es este producto?"
            inputValue={state.values.editProductDescription}
            inputOnChange={handleChange}
            inputError={state.errors.editProductDescription}
          ></OutlinedTextField>
          <OutlinedTextField
            inputType="text"
            inputName="editProductBrand"
            inputLabel="Marca"
            inputPlaceholder="Marca del producto"
            inputValue={state.values.editProductBrand}
            inputOnChange={handleChange}
            inputError={state.errors.editProductBrand}
            // inputDisabled
          ></OutlinedTextField>
          <OutlinedTextField
            inputType="number"
            inputName="editProductPrice"
            inputLabel="Precio"
            inputPlaceholder="Ingrese precio unitario"
            inputValue={state.values.editProductPrice}
            inputOnChange={handleChange}
            inputError={state.errors.editProductPrice}
          ></OutlinedTextField>
          <OutlinedTextField
            inputType="number"
            inputName="editProductStock"
            inputLabel="Stock"
            inputPlaceholder="Ingrese unidades disponibles"
            inputValue={state.values.editProductStock}
            inputOnChange={handleChange}
            inputError={state.errors.editProductStock}
          ></OutlinedTextField>
          <OutlinedTextField
            inputType="text"
            inputName="editProductCategory"
            inputLabel="Categoria"
            inputPlaceholder="Ej: Hogar"
            inputValue={state.values.editProductCategory}
            inputOnChange={handleChange}
            inputError={state.errors.editProductCategory}
            // inputDisabled
          ></OutlinedTextField>
          <OutlinedTextField
            inputType="text"
            inputName="editProductSubCategory"
            inputLabel="Subcategoria"
            inputPlaceholder="Ej: Muebles"
            inputValue={state.values.editProductSubCategory}
            inputOnChange={handleChange}
            inputError={state.errors.editProductSubCategory}
            // inputDisabled
          ></OutlinedTextField>
          <OutlinedTextField
            inputType="file"
            inputName="editProductImage"
            inputLabel="" // Sin etiqueta
            inputPlaceholder="Seleccione las imagenes"
            inputOnChange={handleFileChange}
            inputError={state.errors.files}
            inputAccept="image/*"
            inputMultiple={true}
          ></OutlinedTextField>
          <Checkbox
            label="Destacado"
            checked={state.values.isFeatured}
            onChange={handleCheckboxChange}
          />
          <FilledButton
            buttonType="submit"
            buttonText="Guardar Cambios"
            buttonName="editProductButton"
            buttonIcon=""
            buttonOnClick={submitHandler}
            buttonWidth="auto"
          ></FilledButton>
        </form>

        {state.files.length > 0 && (
          <div className={`${styles.editProductForm_previewContainer}`}>
            <span>Imagenes para subir</span>
            {state.files.map((file, index) => (
              <div key={index} className={styles.editProductForm_preview}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview ${index}`}
                  className={styles.editProductForm_previewImage}
                />
                <TextButton
                  text="Borrar"
                  icon="close"
                  onClick={() => handleRemoveFile(index)}
                />
              </div>
            ))}
          </div>
        )}
        <Dialog
          isOpen={state.showDialog}
          onClose={handleDialogClose}
          title={state.dialogContent.title}
          content={state.dialogContent.content}
          actions={state.dialogContent.actions}
        />
      </div>
    </>
  );
};

export default EditProductForm;

{
  /* <div className={`${styles.loadProductForm_preview}`}>
{state.files.map((file, index) => (
  <img
    key={index}
    src={URL.createObjectURL(file)}
    alt={`preview ${index}`}
  />
))}
</div> */
}
