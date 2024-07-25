import { useState } from "react";

const Checkbox = ({ label, defaultChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleOnChange = (event) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label>
      <input type="checkbox" checked={isChecked} onChange={handleOnChange} />
      {label}
    </label>
  );
};

export default Checkbox;
