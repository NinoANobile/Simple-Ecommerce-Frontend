// import styles from "./FilterCheckBox.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   activateFilter,
//   deactivateFilter,
// } from "../../app/features/productFilter/productFilterSlice";

// const FilterCheckBox = ({ filterName, filterType }) => {
//   const dispatch = useDispatch();
//   const isActive = useSelector((state) =>
//     state.productFilter[filterType]?.includes(filterName)
//   );

//   const handleClick = (event) => {
//     if (event.target.checked) {
//       dispatch(activateFilter(filterType, filterName));
//     } else {
//       dispatch(deactivateFilter(filterType, filterName));
//     }
//   };

//   return (
//     <div className={`${styles.checkbox_container} `}>
//       <input
//         className={`${styles.filter_checkbox} `}
//         id={`${filterType}:${filterName}`}
//         name={`${filterName}`}
//         type="checkbox"
//         checked={isActive}
//         onChange={handleClick}
//       />
//       <label htmlFor={`${filterType}:${filterName}`}> {filterName} </label>
//     </div>
//   );
// };

// export default FilterCheckBox;

import styles from "./FilterCheckBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  activateFilter,
  deactivateFilter,
} from "../../app/features/productFilter/productFilterSlice";

const FilterCheckBox = ({ filterName, filterType }) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) =>
    state.productFilter[filterType]?.includes(filterName)
  );

  const handleClick = (event) => {
    const checked = event.target.checked;

    if (checked) {
      dispatch(activateFilter(filterType, filterName));
    } else {
      dispatch(deactivateFilter(filterType, filterName));
    }
  };

  return (
    <div className={`${styles.checkbox_container}`}>
      <input
        className={`${styles.filter_checkbox}`}
        id={`${filterType}:${filterName}`}
        name={`${filterName}`}
        type="checkbox"
        checked={isActive}
        onChange={handleClick}
        role="checkbox"
      />
      <label htmlFor={`${filterType}:${filterName}`}>{filterName}</label>
    </div>
  );
};

export default FilterCheckBox;
