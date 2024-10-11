import FilterContainer from "../FilterContainer/FilterContainer";
import styles from "./StandardSideSheet.module.css";

const StandardSideSheet = ({ isOpen, onClose, title }) => {
  return (
    <div
      role="dialog"
      className={`${styles.sideSheet_container} ${
        isOpen ? styles.sideSheet_container__open : ""
      }`}
    >
      <div className={styles.sideSheet_header}>
        <h2 className={`${styles.sideSheet_headline} `}>{title}</h2>
        <button
          className={`${styles.sideSheet_icon} material-symbols-rounded`}
          onClick={onClose}
        >
          close
        </button>
      </div>
      <div className={styles.sideSheet_content}>
        <FilterContainer></FilterContainer>
      </div>
    </div>
  );
};

export default StandardSideSheet;
