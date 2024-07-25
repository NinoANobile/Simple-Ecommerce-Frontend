import styles from "./TopAppBar.module.css";

const TopAppBar = ({
  areMenuIcon,
  areFilterIcon,
  onMenuClick,
  onFilterClick,
}) => {
  return (
    <header className={`${styles.topAppBar_container} `}>
      <div className={`${styles.topAppBar}`}>
        <div className={`${styles.topAppBar_left}`}>
          {areMenuIcon && (
            <button
              className={`${styles.topAppBar_iconButton}`}
              onClick={onMenuClick}
            >
              ☰ {/* Icono de menú */}
            </button>
          )}
          <h1 className={`${styles.topAppBar_headLine}`}>Logo</h1>
        </div>
        {areFilterIcon && (
          <button
            className={`${styles.topAppBar_iconButton}`}
            onClick={onFilterClick}
          >
            🔍 {/* Icono de filtro */}
          </button>
        )}
      </div>
    </header>
  );
};

export default TopAppBar;
