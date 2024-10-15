import styles from "./Switch.module.css";

function Switch({ onClick = null, text = "Switch" }) {
  return (
    <div className={styles.switch_container}>
      <label className={styles.switch}>
        <input type="checkbox" onClick={onClick} />
        <span className={`${styles.switch_slider} `}></span>
      </label>
      <span className={styles.switch_text}>{text}</span>
    </div>
  );
}

export default Switch;
