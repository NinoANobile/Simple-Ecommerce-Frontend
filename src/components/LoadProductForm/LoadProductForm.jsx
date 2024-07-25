import styles from "./LoadProductForm.module.css";
import OutlinedTextField from "../TextField/OutlinedTextField";
import { useState } from "react";
import FilledButton from "../Buttons/FilledButton";
import Checkbox from "../Checkbox/Checkbox";

const LoadProductForm = () => {
  const [files, setFiles] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loadProductForm, setLoadProductForm] = useState({
    loadProductName: "",
    loadProductDescription: "",
    loadProductBrand: "",
    loadProductPrice: "",
    loadProductStock: "",
    loadProductCategory: "",
    loadProductSubCategory: "",
  });
  const [errors, setErrors] = useState({
    loadProductName: "",
    loadProductDescription: "",
    loadProductBrand: "",
    loadProductPrice: "",
    loadProductStock: "",
    loadProductCategory: "",
    loadProductSubCategory: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setLoadProductForm({ ...loadProductForm, [property]: value });
    validate(
      { ...loadProductForm, [property]: value },
      setErrors,
      errors,
      property
    );
  };

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleCheckboxChange = (isChecked) => {
    setIsFeatured(isChecked);
    console.log("Checkbox is now: ", isChecked);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.values(errors).every((error) => error === "")) {
      const productData = {
        name: loadProductForm.loadProductName,
        description: loadProductForm.loadProductDescription,
        brand: loadProductForm.loadProductBrand,
        price: loadProductForm.loadProductPrice,
        stock: loadProductForm.loadProductStock,
        imageUrl: files.map((file) => URL.createObjectURL(file)),
        category: loadProductForm.loadProductCategory,
        subcategory: loadProductForm.loadProductSubCategory,
        featured: isFeatured,
      };
      dispatch(registerUser(userData));
      navigate("/login");
    } else {
      console.log("Hay errores en el formulario.");
    }
  };

  return (
    <div className={`${styles.loadProductForm_container}`}>
      <form className={`${styles.loadProductForm}`}>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductName"
          inputLabel="Nombre"
          inputPlaceholder="Ingrese nombre del producto"
          inputValue={loadProductForm.loadProductName}
          inputOnChange={handleChange}
          inputError={errors.loadProductName}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductDescription"
          inputLabel="Descripción"
          inputPlaceholder="¿Que es este producto?"
          inputValue={loadProductForm.loadProductDescription}
          inputOnChange={handleChange}
          inputError={errors.loadProductDescription}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductBrand"
          inputLabel="Marca"
          inputPlaceholder="Marca del producto"
          inputValue={loadProductForm.loadProductBrand}
          inputOnChange={handleChange}
          inputError={errors.loadProductBrand}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="number"
          inputName="loadProductPrice"
          inputLabel="Precio"
          inputPlaceholder="Ingrese precio unitario"
          inputValue={loadProductForm.loadProductPrice}
          inputOnChange={handleChange}
          inputError={errors.loadProductPrice}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="number"
          inputName="loadProductStock"
          inputLabel="Stock"
          inputPlaceholder="Ingrese unidades disponibles"
          inputValue={loadProductForm.loadProductStock}
          inputOnChange={handleChange}
          inputError={errors.loadProductStock}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductCategory"
          inputLabel="Categoria"
          inputPlaceholder="Ej: Hogar"
          inputValue={loadProductForm.loadProductCategory}
          inputOnChange={handleChange}
          inputError={errors.loadProductCategory}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="text"
          inputName="loadProductSubCategory"
          inputLabel="Subcategoria"
          inputPlaceholder="Ej: Muebles"
          inputValue={loadProductForm.loadProductSubCategory}
          inputOnChange={handleChange}
          inputError={errors.loadProductSubCategory}
        ></OutlinedTextField>
        <OutlinedTextField
          inputType="file"
          inputName="loadProductImage"
          inputLabel="" // Sin etiqueta
          inputPlaceholder="Seleccione las imagenes"
          //   inputValue={loadProductForm.loadProductImage}
          inputOnChange={handleFileChange}
          //   inputError={errors.loadProductImage}
          inputAccept="image/*"
          inputMultiple={true}
        ></OutlinedTextField>
        {/* <div className={`${styles.loadProductForm_preview}`}>
          {files.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`preview ${index}`}
            />
          ))}
        </div> */}
        <Checkbox label="Destacado" onChange={handleCheckboxChange}></Checkbox>
        <FilledButton
          buttonType="submit"
          buttonText="Cargar"
          buttonName="loadProductButton"
          buttonIcon=""
          buttonOnClick={submitHandler}
          buttonWidth="auto"
        ></FilledButton>
      </form>
    </div>
  );
};

export default LoadProductForm;
