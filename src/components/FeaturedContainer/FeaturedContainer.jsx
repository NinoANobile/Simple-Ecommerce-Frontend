import styles from "./FeaturedContainer.module.css";
import ProdCardItem from "../ProdCardItem/ProdCardItem";
import { useSelector } from "react-redux";

const FeaturedContainer = () => {
  const productsById = useSelector((state) => state.products.byId);
  const featuredIds = useSelector((state) => state.products.featured);

  const featuredProducts = featuredIds.map((id) => productsById[id]);

  return (
    <section className={`${styles.cardscontainer}`}>
      {featuredProducts.length === 0 ? (
        <p>No featured products available.</p>
      ) : (
        featuredProducts.map((prod) => (
          <ProdCardItem
            key={prod.id}
            id={prod.id}
            name={prod.name}
            description={prod.description}
            brand={prod.brand}
            price={prod.price}
            stock={prod.stock}
            images={prod.imageUrl}
            buttonEnable={true}
            buttonText={"X"}
            buttonName={`${prod.name} ${"Delete"}`}
            buttonIcon={null}
            buttonOnClick={() => handleRemove(prod.id)}
            buttonWidth={null}
            onChange={(e) => handleQuantityChange(e, prod.id)}
          />
        ))
      )}
    </section>
  );
};

export default FeaturedContainer;
