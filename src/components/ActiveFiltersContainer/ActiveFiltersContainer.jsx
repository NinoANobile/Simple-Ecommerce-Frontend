import styles from "./ActiveFiltersContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deactivateFilter,
  updateSearchQuery,
} from "../../app/features/productFilter/productFilterSlice";

const ActiveFiltersContainer = () => {
  const dispatch = useDispatch();

  // Obtenemos los filtros activos del estado global en una sola llamada
  const { category, subcategory, brand, featured, query } = useSelector(
    (state) => state.productFilter
  );

  // Función para eliminar un filtro activo
  const handleRemoveFilter = (filterType, filterName) => {
    dispatch(deactivateFilter(filterType, filterName));
  };

  // Función general para renderizar chips de filtros
  const renderFilterChips = (filters, filterType) =>
    filters.map((filter) => (
      <div key={filter} className={styles.chip}>
        {filter}
        <span
          className={styles.chipClose}
          onClick={() => handleRemoveFilter(filterType, filter)}
        >
          &times;
        </span>
      </div>
    ));

  return (
    <div className={styles.chips_container}>
      {/* Renderizamos los chips de categorías, subcategorías y marcas */}
      {renderFilterChips(category, "category")}
      {renderFilterChips(subcategory, "subcategory")}
      {renderFilterChips(brand, "brand")}

      {/* Chip de productos destacados */}
      {featured && (
        <div className={styles.chip}>
          Destacados
          <span
            className={styles.chipClose}
            onClick={() => handleRemoveFilter(true, "featured")}
          >
            &times;
          </span>
        </div>
      )}

      {/* Chip de búsqueda */}
      {query && (
        <div className={styles.chip}>
          Búsqueda: "{query}"
          <span
            className={styles.chipClose}
            onClick={() => dispatch(updateSearchQuery(""))}
          >
            &times;
          </span>
        </div>
      )}
    </div>
  );
};

export default ActiveFiltersContainer;
