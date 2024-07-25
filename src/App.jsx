import styles from "./App.module.css";
import { Routes, Route, useParams } from "react-router-dom";
import {
  Home,
  Register,
  Cart,
  Login,
  ProductDetail,
  Thanks,
  Orders,
  LoadProduct,
} from "./views/index"; // Usar exportación con nombre
import { store, persistor } from "./redux/store"; // tus configuracion

function App() {
  const handleClearState = () => {
    persistor.purge();
  };
  let { prodId } = useParams();
  return (
    <div className={`${styles.main}`}>
      <button onClick={handleClearState}>Clear State</button>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/loadproduct" element={<LoadProduct />} />
        <Route path="/proddetail/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
