import styles from "./FilterContainer.module.css";
import { FilterCheckBox, Checkbox } from "../index";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  activateFilter,
  deactivateFilter,
  toggleFeaturedFilter,
  updateSearchQuery,
} from "../../app/features/productFilter/productFilterSlice";

const FilterContainer = () => {
  const dispatch = useDispatch();

  // Seleccionar las categorías, subcategorías y marcas del estado global
  const allCategories = useSelector((state) => state.products.byCategory);
  const allSubCategories = useSelector((state) => state.products.bySubcategory);
  const allBrands = useSelector((state) => state.products.byBrand);
  const selectedCategories = useSelector(
    (state) => state.productFilter.category
  );
  const selectedSubCategories = useSelector(
    (state) => state.productFilter.subcategory
  );
  const selectedBrands = useSelector((state) => state.productFilter.brand);

  const isFeatured = useSelector((state) => state.productFilter.featured);
  const query = useSelector((state) => state.productFilter.query);

  const [allCategoriesChecked, setAllCategoriesChecked] = useState(false);
  const [indeterminateCategories, setIndeterminateCategories] = useState(false);
  const [showCategories, setShowCategories] = useState(true); // true muestra, false oculta

  const [allSubCategoriesChecked, setAllSubCategoriesChecked] = useState(false);
  const [indeterminateSubCategories, setIndeterminateSubCategories] =
    useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);

  const [allBrandsChecked, setAllBrandsChecked] = useState(false);
  const [indeterminateBrands, setIndeterminateBrands] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  // Efecto para manejar el checkbox padre de categorías
  useEffect(() => {
    const totalCategories = Object.keys(allCategories).length;
    const selectedCount = selectedCategories.length;

    if (selectedCount === 0) {
      setAllCategoriesChecked(false);
      setIndeterminateCategories(false);
    } else if (selectedCount === totalCategories) {
      setAllCategoriesChecked(false);
      setIndeterminateCategories(true);
    } else {
      setAllCategoriesChecked(false);
      setIndeterminateCategories(true);
    }
  }, [allCategories, selectedCategories]);

  // Efecto para manejar el checkbox padre de subcategorías
  useEffect(() => {
    const totalSubCategories = Object.keys(allSubCategories).length;
    const selectedCount = selectedSubCategories.length;

    if (selectedCount === 0) {
      setAllSubCategoriesChecked(false);
      setIndeterminateSubCategories(false);
    } else if (selectedCount === totalSubCategories) {
      setAllSubCategoriesChecked(false);
      setIndeterminateSubCategories(true);
    } else {
      setAllSubCategoriesChecked(false);
      setIndeterminateSubCategories(true);
    }
  }, [allSubCategories, selectedSubCategories]);

  // Efecto para manejar el checkbox padre de marcas
  useEffect(() => {
    const totalBrands = Object.keys(allBrands).length;
    const selectedCount = selectedBrands.length;

    if (selectedCount === 0) {
      setAllBrandsChecked(false);
      setIndeterminateBrands(false);
    } else if (selectedCount === totalBrands) {
      setAllBrandsChecked(false);
      setIndeterminateBrands(true);
    } else {
      setAllBrandsChecked(false);
      setIndeterminateBrands(true);
    }
  }, [allBrands, selectedBrands]);

  // Funciones para manejar el cambio en los checkboxes padres
  const handleParentCategoriesChange = () => {
    if (indeterminateCategories || allCategoriesChecked) {
      Object.keys(allCategories).forEach((cat) => {
        dispatch(deactivateFilter("category", cat));
      });
    }
  };

  const handleParentSubCategoriesChange = () => {
    if (indeterminateSubCategories || allSubCategoriesChecked) {
      Object.keys(allSubCategories).forEach((subcat) => {
        dispatch(deactivateFilter("subcategory", subcat));
      });
    }
  };

  const handleParentBrandsChange = () => {
    if (indeterminateBrands || allBrandsChecked) {
      Object.keys(allBrands).forEach((brand) => {
        dispatch(deactivateFilter("brand", brand));
      });
    }
  };

  return (
    <div className={`${styles.filter_container}`}>
      {/* Para el filtro de productos destacados */}
      <Checkbox
        id="featuredFilter"
        label="Destacados"
        checked={isFeatured}
        onChange={() => dispatch(toggleFeaturedFilter())}
      ></Checkbox>

      <div className={`${styles.filter_search}`}>
        {/* Para el filtro de búsqueda por texto */}
        <label htmlFor="searchQuery">Buscar productos</label>
        <input
          id="searchQuery" // Añade un id único
          type="text"
          value={query}
          onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
        />
      </div>

      {/* Checkbox padre para categorías */}
      <div className={`${styles.filter_parentCategory}`}>
        <Checkbox
          id="allCategories"
          label="Categorías"
          checked={allCategoriesChecked}
          indeterminate={indeterminateCategories}
          onChange={handleParentCategoriesChange}
          disabled={!allCategoriesChecked && !indeterminateCategories}
        />
        <button
          className={`material-symbols-rounded ${styles.filter_showButton}`}
          onClick={() => setShowCategories(!showCategories)}
        >
          {showCategories ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </button>
      </div>

      {/* Checkboxes hijos (categorías) */}
      {showCategories && (
        <div className={`${styles.filter_category}`}>
          {Object.keys(allCategories).map((cat) => (
            <FilterCheckBox
              key={`Cat:${cat}`}
              filterName={cat}
              filterType={"category"}
            />
          ))}
        </div>
      )}

      {/* Checkbox padre para subcategorías */}
      <div className={`${styles.filter_parentCategory}`}>
        <Checkbox
          id="allSubCategories"
          label="Subcategorías"
          checked={allSubCategoriesChecked}
          indeterminate={indeterminateSubCategories}
          onChange={handleParentSubCategoriesChange}
          disabled={!allSubCategoriesChecked && !indeterminateSubCategories}
        />
        <button
          className={`material-symbols-rounded ${styles.filter_showButton}`}
          onClick={() => setShowSubCategories(!showSubCategories)}
        >
          {showSubCategories ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </button>
      </div>

      {/* Checkboxes hijos (subcategorías) */}
      {showSubCategories && (
        <div className={`${styles.filter_category}`}>
          {Object.keys(allSubCategories).map((subcat) => (
            <FilterCheckBox
              key={`Subcat:${subcat}`}
              filterName={subcat}
              filterType={"subcategory"}
            />
          ))}
        </div>
      )}

      {/* Checkbox padre para marcas */}
      <div className={`${styles.filter_parentCategory}`}>
        <Checkbox
          id="allBrands"
          label="Marcas"
          checked={allBrandsChecked}
          indeterminate={indeterminateBrands}
          onChange={handleParentBrandsChange}
          disabled={!allBrandsChecked && !indeterminateBrands}
        />
        <button
          className={`material-symbols-rounded ${styles.filter_showButton}`}
          onClick={() => setShowBrands(!showBrands)}
        >
          {showBrands ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </button>
      </div>

      {/* Checkboxes hijos (marcas) */}
      {showBrands && (
        <div className={`${styles.filter_category}`}>
          {Object.keys(allBrands).map((brand) => (
            <FilterCheckBox
              key={`Brand:${brand}`}
              filterName={brand}
              filterType={"brand"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterContainer;
