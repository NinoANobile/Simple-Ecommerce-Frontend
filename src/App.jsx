import styles from "./App.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Register,
  Cart,
  Login,
  ProductDetail,
  Thanks,
  Orders,
  LoadProduct,
  OrderHistory,
  EditProduct,
  VendorRegister,
  NotFound,
  VerifyEmail,
  PreVerifyEmail,
  ForgotPassword,
  ResetPassword,
} from "./views/index";
import { fetchProducts } from "./app/features/products/productsSlice";
// import { clearToken } from "./app/features/auth/authSlice";
// import { persistor } from "./app/store"; // Importa el persistor
import PrivateRoute from "./guards/PrivateRoute";
import InviteRoute from "./guards/InviteRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const handleClearState = () => {
  //   persistor.purge();
  // };

  // const handleClearToken = () => {
  //   dispatch(clearToken());
  // };

  return (
    <div className={`${styles.main}`}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/proddetail/:id" element={<ProductDetail />} />
        {/* Esta pagina te pide el mail */}
        <Route path="/passrecovery" element={<ForgotPassword />} />
        {/* Esta pagina te pide el pass nuevo */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Ruta protegida para el registro de vendedores */}
        <Route element={<InviteRoute />}>
          <Route path="/register-vendedor" element={<VendorRegister />} />
        </Route>

        {/* Rutas privadas existentes */}
        <Route element={<PrivateRoute />}>
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/loadproduct" element={<LoadProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/pre-verify-email" element={<PreVerifyEmail />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <button onClick={handleClearToken}>Borrar Token</button>
      <button onClick={handleClearState}>Clear State</button> */}
    </div>
  );
}

export default App;
