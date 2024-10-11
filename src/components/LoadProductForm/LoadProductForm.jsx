// import styles from "./LoadProductForm.module.css";
// import {
//   FilledButton,
//   OutlinedTextField,
//   Checkbox,
//   Dialog,
// } from "../../components/index";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createProduct, resetProductCreationFlag } from "../../redux/actions";

// const validate = (loadProductForm, setErrors, errors, property) => {
//   const value = loadProductForm[property];
//   let newErrors = { ...errors };

//   switch (property) {
//     case "loadProductName":
//       newErrors.loadProductName = value.trim()
//         ? ""
//         : "El nombre del producto no puede estar vacío.";
//       break;

//     case "loadProductDescription":
//       newErrors.loadProductDescription = value.trim()
//         ? ""
//         : "La descripción no puede estar vacía.";
//       break;

//     case "loadProductBrand":
//       newErrors.loadProductBrand = value.trim()
//         ? ""
//         : "La marca no puede estar vacía.";
//       break;

//     case "loadProductPrice":
//       if (!value.trim()) {
//         newErrors.loadProductPrice = "El precio no puede estar vacío.";
//       } else if (isNaN(value) || parseFloat(value) <= 0) {
//         newErrors.loadProductPrice = "Ingrese un precio válido (mayor a 0).";
//       } else {
//         newErrors.loadProductPrice = "";
//       }
//       break;

//     case "loadProductStock":
//       if (!value.trim()) {
//         newErrors.loadProductStock = "El stock no puede estar vacío.";
//       } else if (isNaN(value) || parseInt(value) < 0) {
//         newErrors.loadProductStock = "El stock debe ser un número no negativo.";
//       } else {
//         newErrors.loadProductStock = "";
//       }
//       break;

//     case "loadProductCategory":
//       newErrors.loadProductCategory = value.trim()
//         ? ""
//         : "La categoría no puede estar vacía.";
//       break;

//     case "loadProductSubCategory":
//       newErrors.loadProductSubCategory = value.trim()
//         ? ""
//         : "La subcategoría no puede estar vacía.";
//       break;

//     default:
//       break;
//   }

//   setErrors(newErrors);
// };

// const LoadProductForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const productState = useSelector((state) => state.products);

//   const [showDialog, setShowDialog] = useState(false);
//   const [dialogContent, setDialogContent] = useState({});

//   const [files, setFiles] = useState([]);
//   const [isFeatured, setIsFeatured] = useState(false);
//   const [loadProductForm, setLoadProductForm] = useState({
//     loadProductName: "",
//     loadProductDescription: "",
//     loadProductBrand: "",
//     loadProductPrice: "",
//     loadProductStock: "",
//     loadProductCategory: "",
//     loadProductSubCategory: "",
//   });
//   const [errors, setErrors] = useState({
//     loadProductName: "",
//     loadProductDescription: "",
//     loadProductBrand: "",
//     loadProductPrice: "",
//     loadProductStock: "",
//     loadProductCategory: "",
//     loadProductSubCategory: "",
//   });

//   useEffect(() => {
//     if (productState.isProductCreated) {
//       setDialogContent({
//         title: "Producto cargado con éxito",
//         content: "El producto se ha cargado correctamente.",
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
//             <button
//               onClick={() => {
//                 setShowDialog(false);
//                 dispatch(resetProductCreationFlag());
//               }}
//             >
//               Cargar Otro Producto
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
//     setLoadProductForm({ ...loadProductForm, [property]: value });
//     validate(
//       { ...loadProductForm, [property]: value },
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

//   const submitHandler = (event) => {
//     event.preventDefault();
//     if (Object.values(errors).every((error) => error === "")) {
//       const formData = new FormData();
//       Array.from(files).forEach((file) => {
//         formData.append("images", file);
//       });

//       formData.append("name", loadProductForm.loadProductName);
//       formData.append("description", loadProductForm.loadProductDescription);
//       formData.append("brand", loadProductForm.loadProductBrand);
//       formData.append("price", loadProductForm.loadProductPrice);
//       formData.append("stock", loadProductForm.loadProductStock);
//       formData.append("category", loadProductForm.loadProductCategory);
//       formData.append("subcategory", loadProductForm.loadProductSubCategory);
//       formData.append("featured", isFeatured);

//       dispatch(createProduct(formData));
//       // navigate("/"); // Descomenta y ajusta esta línea según sea necesario
//     } else {
//       console.log("Hay errores en el formulario.");
//     }
//   };
//   return (
//     <div className={`${styles.loadProductForm_container}`}>
//       <form className={`${styles.loadProductForm}`}>
//         <OutlinedTextField
//           inputType="text"
//           inputName="loadProductName"
//           inputLabel="Nombre"
//           inputPlaceholder="Ingrese nombre del producto"
//           inputValue={loadProductForm.loadProductName}
//           inputOnChange={handleChange}
//           inputError={errors.loadProductName}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="text"
//           inputName="loadProductDescription"
//           inputLabel="Descripción"
//           inputPlaceholder="¿Que es este producto?"
//           inputValue={loadProductForm.loadProductDescription}
//           inputOnChange={handleChange}
//           inputError={errors.loadProductDescription}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="text"
//           inputName="loadProductBrand"
//           inputLabel="Marca"
//           inputPlaceholder="Marca del producto"
//           inputValue={loadProductForm.loadProductBrand}
//           inputOnChange={handleChange}
//           inputError={errors.loadProductBrand}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="number"
//           inputName="loadProductPrice"
//           inputLabel="Precio"
//           inputPlaceholder="Ingrese precio unitario"
//           inputValue={loadProductForm.loadProductPrice}
//           inputOnChange={handleChange}
//           inputError={errors.loadProductPrice}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="number"
//           inputName="loadProductStock"
//           inputLabel="Stock"
//           inputPlaceholder="Ingrese unidades disponibles"
//           inputValue={loadProductForm.loadProductStock}
//           inputOnChange={handleChange}
//           inputError={errors.loadProductStock}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="text"
//           inputName="loadProductCategory"
//           inputLabel="Categoria"
//           inputPlaceholder="Ej: Hogar"
//           inputValue={loadProductForm.loadProductCategory}
//           inputOnChange={handleChange}
//           inputError={errors.loadProductCategory}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="text"
//           inputName="loadProductSubCategory"
//           inputLabel="Subcategoria"
//           inputPlaceholder="Ej: Muebles"
//           inputValue={loadProductForm.loadProductSubCategory}
//           inputOnChange={handleChange}
//           inputError={errors.loadProductSubCategory}
//         ></OutlinedTextField>
//         <OutlinedTextField
//           inputType="file"
//           inputName="loadProductImage"
//           inputLabel="" // Sin etiqueta
//           inputPlaceholder="Seleccione las imagenes"
//           //   inputValue={loadProductForm.loadProductImage}
//           inputOnChange={handleFileChange}
//           //   inputError={errors.loadProductImage}
//           inputAccept="image/*"
//           inputMultiple={true}
//         ></OutlinedTextField>
//         {/* <div className={`${styles.loadProductForm_preview}`}>
//         {files.map((file, index) => (
//           <img
//             key={index}
//             src={URL.createObjectURL(file)}
//             alt={`preview ${index}`}
//           />
//         ))}
//       </div> */}
//         <Checkbox label="Destacado" onChange={handleCheckboxChange}></Checkbox>
//         <FilledButton
//           buttonType="submit"
//           buttonText="Cargar"
//           buttonName="loadProductButton"
//           buttonIcon=""
//           buttonOnClick={submitHandler}
//           buttonWidth="auto"
//         ></FilledButton>
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

import styles from "./LoadProductForm.module.css";
import {
  OutlinedTextField,
  FilledButton,
  OutlinedButton,
  TextButton,
  Checkbox,
  Dialog,
  Spinner,
} from "../index";
import { useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../app/features/products/productsSlice";

const initialState = {
  values: {
    loadProductName: "",
    loadProductDescription: "",
    loadProductBrand: "",
    loadProductPrice: "",
    loadProductStock: "",
    loadProductCategory: "",
    loadProductSubCategory: "",
    isFeatured: false,
  },
  errors: {
    loadProductName: "",
    loadProductDescription: "",
    loadProductBrand: "",
    loadProductPrice: "",
    loadProductStock: "",
    loadProductCategory: "",
    loadProductSubCategory: "",
    files: "",
  },
  generalErrors: "",
  files: [],
  showDialog: false,
  dialogContent: {
    title: "",
    content: "",
    actions: null,
  },
  isProductCreated: false,
};

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

    case "RESET_FORM":
      return {
        ...initialState,
        isProductCreated: false,
      };

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

    case "UPDATE_DIALOG":
      return { ...state, showDialog: true, dialogContent: action.content };

    case "CLOSE_DIALOG":
      return {
        ...state,
        showDialog: false,
        dialogContent: { title: "", content: "", actions: null },
        isProductCreated: false,
      };
    case "PRODUCT_CREATED":
      return {
        ...state,
        isProductCreated: true,
      };

    default:
      return state;
  }
};

const validateField = (state, field) => {
  let error = "";
  const values = state.values;

  switch (field) {
    case "loadProductName":
      error = values.loadProductName.trim()
        ? ""
        : "El nombre del producto no puede estar vacío.";
      break;
    case "loadProductDescription":
      error = values.loadProductDescription.trim()
        ? ""
        : "La descripción no puede estar vacía.";
      break;
    case "loadProductBrand":
      error = values.loadProductBrand.trim()
        ? ""
        : "La marca no puede estar vacía.";
      break;
    case "loadProductPrice":
      error = !values.loadProductPrice.trim()
        ? "El precio no puede estar vacío."
        : isNaN(values.loadProductPrice) ||
          parseFloat(values.loadProductPrice) <= 0
        ? "Ingrese un precio válido (mayor a 0)."
        : "";
      break;
    case "loadProductStock":
      error = !values.loadProductStock.trim()
        ? "El stock no puede estar vacío."
        : isNaN(values.loadProductStock) ||
          parseInt(values.loadProductStock) < 0
        ? "El stock debe ser un número no negativo."
        : "";
      break;
    case "loadProductCategory":
      error = values.loadProductCategory.trim()
        ? ""
        : "La categoría no puede estar vacía.";
      break;
    case "loadProductSubCategory":
      error = values.loadProductSubCategory.trim()
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
  } else {
    return "El campo de imagenes no puede estar vacio.";
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

  // Valida 'files' pasando el estado completo
  errors["files"] = validateField(state, "files");

  return errors;
};

const LoadProductForm = () => {
  const [state, formDispatch] = useReducer(formReducer, initialState);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Este es el valor de isFeatured", state.values.isFeatured);
    if (state.isProductCreated && !error) {
      formDispatch({
        type: "UPDATE_DIALOG",
        content: {
          title: "Producto cargado con éxito",
          content: "El producto se ha cargado correctamente.",
          actions: (
            <>
              <TextButton
                text="Ir al Home"
                onClick={() => {
                  navigate("/");
                  formDispatch({ type: "CLOSE_DIALOG" });
                  formDispatch({ type: "RESET_FORM" }); // Resetea el formulario y la bandera
                }}
              ></TextButton>
              <TextButton
                text="Cargar otro producto"
                onClick={() => formDispatch({ type: "RESET_FORM" })}
              ></TextButton>
            </>
          ),
        },
      });
    }
  }, [state.isProductCreated, navigate, state.values.isFeatured]);

  const handleDialogClose = () => {
    formDispatch({ type: "CLOSE_DIALOG" });
    formDispatch({ type: "RESET_FORM" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formDispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  // const handleFileChange = (event) => {
  //   const { files } = event.target;
  //   formDispatch({ type: "UPDATE_FILES", files });
  // };

  const handleFileChange = (event) => {
    formDispatch({ type: "UPDATE_FILES", files: [...event.target.files] });
  };

  const handleCheckboxChange = () => {
    formDispatch({ type: "TOGGLE_FEATURED" });
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = state.files.filter(
      (_, index) => index !== indexToRemove
    );
    formDispatch({ type: "UPDATE_FILES", files: updatedFiles });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newErrors = validate(state);
    const noErrors = Object.values(newErrors).every((error) => error === "");

    // Comprueba si todos los valores del formulario y los archivos están vacíos
    const isFormCompletelyEmpty =
      Object.values(state.values).every(
        (value) => value === "" || value === false
      ) && state.files.length === 0;

    if (isFormCompletelyEmpty) {
      formDispatch({
        type: "SET_GENERAL_ERRORS",
        errors: "Complete los campos obligatorios antes de continuar.",
      });
    } else if (noErrors) {
      const formData = new FormData();
      Array.from(state.files).forEach((file) => {
        formData.append("images", file);
      });
      formData.append("name", state.values.loadProductName);
      formData.append("description", state.values.loadProductDescription);
      formData.append("brand", state.values.loadProductBrand);
      formData.append("price", state.values.loadProductPrice);
      formData.append("stock", state.values.loadProductStock);
      formData.append("category", state.values.loadProductCategory);
      formData.append("subcategory", state.values.loadProductSubCategory);
      formData.append("featured", state.values.isFeatured);

      await dispatch(createProduct(formData)).unwrap();
      formDispatch({ type: "PRODUCT_CREATED" });
    } else {
      formDispatch({ type: "SET_ERRORS", errors: newErrors });
    }
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className={`${styles.loadProductForm_container}`}>
      {state.generalErrors && (
        <div className={styles.formError}>{state.generalErrors}</div>
      )}
      <form className={`${styles.loadProductForm}`}>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductName"
          inputLabel="Nombre"
          inputPlaceholder="Ingrese nombre del producto"
          inputValue={state.values.loadProductName}
          inputOnChange={handleChange}
          inputError={state.errors.loadProductName}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductDescription"
          inputLabel="Descripción"
          inputPlaceholder="¿Que es este producto?"
          inputValue={state.values.loadProductDescription}
          inputOnChange={handleChange}
          inputError={state.errors.loadProductDescription}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductBrand"
          inputLabel="Marca"
          inputPlaceholder="Marca del producto"
          inputValue={state.values.loadProductBrand}
          inputOnChange={handleChange}
          inputError={state.errors.loadProductBrand}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="number"
          inputName="loadProductPrice"
          inputLabel="Precio"
          inputPlaceholder="Ingrese precio unitario"
          inputValue={state.values.loadProductPrice}
          inputOnChange={handleChange}
          inputError={state.errors.loadProductPrice}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="number"
          inputName="loadProductStock"
          inputLabel="Stock"
          inputPlaceholder="Ingrese unidades disponibles"
          inputValue={state.values.loadProductStock}
          inputOnChange={handleChange}
          inputError={state.errors.loadProductStock}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductCategory"
          inputLabel="Categoria"
          inputPlaceholder="Ej: Hogar"
          inputValue={state.values.loadProductCategory}
          inputOnChange={handleChange}
          inputError={state.errors.loadProductCategory}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductSubCategory"
          inputLabel="Subcategoria"
          inputPlaceholder="Ej: Muebles"
          inputValue={state.values.loadProductSubCategory}
          inputOnChange={handleChange}
          inputError={state.errors.loadProductSubCategory}
        ></OutlinedTextField>

        {/* <OutlinedTextField
          inputType="file"
          inputName="loadProductImage"
          inputLabel="" // Sin etiqueta
          inputPlaceholder="Seleccione las imagenes"
          inputOnChange={handleFileChange}
          inputAccept="image/*"
          inputMultiple={true}
          inputError={state.errors.files}
        ></OutlinedTextField> */}

        <input
          type="file"
          name="loadProductImage"
          placeholder="Seleccione las imágenes"
          onChange={handleFileChange}
          accept="image/*"
          multiple
          style={{ borderColor: state.errors.files ? "red" : "inherit" }} // Indica error si hay
        />
        {state.errors.files && (
          <div style={{ color: "red", fontSize: "0.75rem" }}>
            {state.errors.files}
          </div>
        )}

        <div className={`${styles.loadProductForm_previewContainer}`}>
          {state.files.map((file, index) => (
            <div key={index} className={styles.loadProductForm_preview}>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                className={styles.loadProductForm_previewImage}
              />
              <TextButton
                text="Borrar"
                icon="close"
                onClick={() => handleRemoveFile(index)}
              />
            </div>
          ))}
        </div>
        <Checkbox
          label="¿Es un producto destacado?"
          onChange={handleCheckboxChange}
          checked={state.values.isFeatured}
        />
        <FilledButton
          buttonType="submit"
          buttonText="Cargar producto"
          buttonName="loadProductButton"
          buttonIcon=""
          buttonOnClick={submitHandler}
          buttonWidth="auto"
        ></FilledButton>
      </form>

      <Dialog
        isOpen={state.showDialog}
        onClose={handleDialogClose}
        title={state.dialogContent.title}
        content={state.dialogContent.content}
        actions={state.dialogContent.actions}
      />
    </div>
  );
};

export default LoadProductForm;
