import styles from "./ProductDetail.module.css";
import ProductDetailData from "../../components/ProductDetailData/ProductDetailData";
import DetailTopBar from "../../components/DetailTopBar/DetailTopBar";

const ProductDetail = () => {
  return (
    <div>
      <DetailTopBar></DetailTopBar>
      <div>
        <ProductDetailData></ProductDetailData>
      </div>
    </div>
  );
};

export default ProductDetail;
