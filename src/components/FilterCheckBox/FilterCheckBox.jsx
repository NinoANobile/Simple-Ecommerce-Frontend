import styles from "./FilterCheckBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { activateFilter, deactivateFilter } from "../../redux/actions";

const FilterCheckBox = ({ filterName, filterType }) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) =>
    state.search.filters[filterType]?.includes(filterName)
  );
  // Aca tengo que despachar el filtro activado y ponerlo en el estado global

  const handleClick = (event) => {
    console.log(event.target.checked, filterType, filterName);
    if (event.target.checked) {
      // Despacha una acción cuando el checkbox es marcado
      dispatch(activateFilter(filterType, filterName));
    } else {
      // Despacha una acción cuando el checkbox es desmarcado
      dispatch(deactivateFilter(filterType, filterName));
    }
  };

  return (
    <div>
      <input type="checkbox" checked={isActive} onChange={handleClick}></input>
      <label>{filterName}</label>
    </div>
  );
};

export default FilterCheckBox;
