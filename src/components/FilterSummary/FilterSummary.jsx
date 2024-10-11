import styles from "./FilterSummary.module.css";

const FilterSummary = ({
  query,
  brands,
  categories,
  subcategories,
  isFeatured,
}) => {
  let description = "Estás viendo productos";

  if (isFeatured) {
    description += " destacados";
  }

  if (brands.length > 0) {
    description += ` de la marca ${brands.join(", ")}`;
  }

  if (query) {
    description += ` que incluyen "${query}" en su nombre o descripción`;
  }

  // Simplificar la descripción de categorías y subcategorías
  let categoryParts = [];
  if (categories.length > 0) {
    categoryParts.push(`categoría/s de ${categories.join(", ")}`);
  }
  if (subcategories.length > 0) {
    categoryParts.push(`subcategoría/s de ${subcategories.join(", ")}`);
  }

  if (categoryParts.length > 0) {
    description += ` en la/s ${categoryParts.join(" o ")}`;
  }

  return <p className={styles.summary}>{description}.</p>;
};

export default FilterSummary;
