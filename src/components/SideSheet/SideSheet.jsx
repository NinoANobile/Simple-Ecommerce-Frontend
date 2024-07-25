import FilterContainer from "../FilterContainer/FilterContainer";
import styles from "./SideSheet.module.css";

const SideSheet = ({ isFixed, isOpen, onClose, title }) => {
  return (
    <div
      className={`${
        isFixed ? styles.sideSheet_container__fixed : styles.sideSheet_container
      } ${isOpen ? styles.sideSheet_container__open : ""}`}
    >
      <div className={styles.sideSheet_header}>
        <h2>{title}</h2>
        {isOpen && <button onClick={onClose}>Close</button>}
      </div>
      <div className={styles.sideSheet_content}>
        <FilterContainer></FilterContainer>
      </div>
    </div>
  );
};

export default SideSheet;
