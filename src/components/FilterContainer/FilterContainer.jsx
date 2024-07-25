import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import styles from "./FilterContainer.module.css";
import { useSelector } from "react-redux";

const FilterContainer = () => {
  const allCategories = useSelector((state) => state.products.byCategory);
  const allSubCategories = useSelector((state) => state.products.bySubcategory);

  return (
    <div>
      <div>
        <h3>Categorias</h3>
        {Object.keys(allCategories).map((cat) => (
          <FilterCheckBox
            key={cat}
            filterName={cat}
            filterType={"category"}
          ></FilterCheckBox>
        ))}
      </div>
      <div>
        <h3>Subcategorias</h3>
        {Object.keys(allSubCategories).map((subcat) => (
          <FilterCheckBox
            key={subcat}
            filterName={subcat}
            filterType={"subcategory"}
          ></FilterCheckBox>
        ))}
      </div>
    </div>
  );
};

export default FilterContainer;
