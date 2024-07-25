// Este componente se corresponde con un Large top app bar
import styles from "./DetailTopBar.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DetailTopBar = () => {
  const prods = useSelector((state) => state.products.byId);
  const { id } = useParams();
  const [prodDetail, setProdDetail] = useState({});

  useEffect(() => {
    const filteredProd = Object.values(prods).find((prod) => prod.id === id);
    if (filteredProd) {
      setProdDetail(filteredProd);
    } else {
      console.log("Producto no encontrado con el ID:", id);
    }
  }, [id, prods]);

  return (
    <div className={`${styles.topbarcontainer}`}>
      <div className={`${styles.topbar_iconcontainer}`}>
        <div className={`${styles.topbar_leadicon}`}>
          <NavLink to="/">
            <i className="fa fa-arrow-left"></i>
          </NavLink>
        </div>
        <div className={`${styles.topbar_trailcon}`}>
          <i className="fa fa-ellipsis-v"></i>
        </div>
      </div>
      <h1 className={`${styles.topbar_headline}`}>
        {prodDetail.name} by {prodDetail.brand}
      </h1>
    </div>
  );
};

export default DetailTopBar;
