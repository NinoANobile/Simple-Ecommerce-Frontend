import styles from "./FilledIconButton.module.css";

const FilledIconButton = ({
  isToggle = false,
  icon = "favorite",
  name = "FilledIconButton",
  onClick = null,
  checked = false,
  disabled = false,
}) => {
  return isToggle ? (
    <label className={styles.iconButton_label}>
      <input
        type="checkbox"
        name={name}
        onChange={onClick}
        // checked={checked}
        className={styles.iconButton_checkbox}
        aria-label={icon}
        disabled={disabled}
        role="button"
      />
      <span className={`${styles.iconButton_icon}  material-symbols-rounded`}>
        {icon}
      </span>
    </label>
  ) : (
    <button
      type="button"
      name={name}
      onClick={onClick}
      className={`${styles.iconButton_button}  material-symbols-rounded`}
      aria-label={icon}
      disabled={disabled}
      role="button"
    >
      {icon}
    </button>
  );

  //   return (
  //     <label className={styles.iconButton_container}>
  //       <input
  //         type={isToggle ? "checkbox" : "button"}
  //         onClick={onClick}
  //         className={styles.iconButton}
  //         name={name}
  //         aria-label={icon}
  //         disabled={disabled}
  //         role="button"
  //       />
  //       <span
  //         className={`${styles.material_symbols_outlined} ${styles.iconButton_icon} material-symbols-rounded`}
  //       >
  //         {icon}
  //       </span>
  //     </label>
  //   );
};

export default FilledIconButton;
