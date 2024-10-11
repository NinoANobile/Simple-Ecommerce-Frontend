import axios from "axios";
//Usuario
//CREATE
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});
export const registerUserSuccess = (userData) => ({
  type: REGISTER_SUCCESS,
  payload: userData, // axios envuelve la respuesta bajo el atributo `data`
});
export const registerUserFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error.response?.data?.message || error.message,
});
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerUserRequest());
    const response = await axios.post("http://localhost:3000/users", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(registerUserSuccess(response.data));
  } catch (error) {
    dispatch(registerUserFailure(error));
  }
};

//DELETE
export const DELETE_ACCOUNT_REQUEST = "DELETE_ACCOUNT_REQUEST";
export const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";
export const DELETE_ACCOUNT_FAILURE = "DELETE_ACCOUNT_FAILURE";

export const deleteAccountRequest = () => ({
  type: DELETE_ACCOUNT_REQUEST,
});
export const deleteAccountSuccess = () => ({
  type: DELETE_ACCOUNT_SUCCESS,
});
export const deleteAccountFailure = (error) => ({
  type: DELETE_ACCOUNT_FAILURE,
  payload: error,
});
export const deleteAccount = (userId, role) => async (dispatch) => {
  dispatch(deleteAccountRequest());
  try {
    await axios({
      method: "delete",
      url: `http://localhost:3000/users/delete/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        role,
      },
    });
    dispatch(deleteAccountSuccess(userId));
  } catch (error) {
    dispatch(
      deleteAccountFailure(error.response?.data?.message || error.message)
    );
  }
};

//Productos:
//FETCH
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAILURE = "PRODUCT_DETAILS_FAIL";

const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });
const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});
const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error.response?.data?.message || error.message,
});
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get("http://localhost:3000/products");
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error));
  }
};
export const productDetailsRequest = () => ({
  type: PRODUCT_DETAILS_REQUEST,
});
export const productDetailsSuccess = (productDetail) => ({
  type: PRODUCT_DETAILS_SUCCESS,
  payload: productDetail,
});
export const productDetailsFail = (error) => ({
  type: PRODUCT_DETAILS_FAILURE,
  payload: error,
});
// Acción para obtener detalles de un producto específico
export const fetchProductDetails = (productId) => async (dispatch) => {
  dispatch(productDetailsRequest());
  try {
    const response = await axios.get(
      `http://localhost:3000/products/${productId}`
    );
    dispatch(productDetailsSuccess(response.data));
  } catch (error) {
    dispatch(productDetailsFail(error));
  }
};

//CREATE
export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});
export const createProductSuccess = (productData) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: productData,
});
export const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error.response?.data?.message || error.message,
});
export const createProduct = (formData) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/products/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(createProductSuccess(response.data));
  } catch (error) {
    dispatch(createProductFailure(error));
  }
};

// UPDATE
export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const updateProductRequest = () => ({ type: UPDATE_PRODUCT_REQUEST });
export const updateProductSuccess = (productData) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: productData,
});
export const updateProductFailure = (error) => ({
  type: UPDATE_PRODUCT_FAILURE,
  payload: error.response?.data?.message || error.message,
});
export const updateProduct = (productData) => async (dispatch) => {
  dispatch(updateProductRequest());
  try {
    console.log(
      "Enviando a URL:",
      `http://localhost:3000/products/${productData.get("id")}`
    );

    const response = await axios.put(
      `http://localhost:3000/products/${productData.get("id")}`, // Asegúrate de obtener el ID correctamente
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Esto es necesario para FormData
        },
      }
    );
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    console.error("Error en updateProduct:", error.message);
    dispatch(updateProductFailure(error));
  }
};

//DELETE
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const deleteProductRequest = () => ({ type: DELETE_PRODUCT_REQUEST });
export const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: productId,
});
export const deleteProductFailure = () => ({
  type: DELETE_PRODUCT_FAILURE,
  payload: error.response?.data?.message || error.message,
});
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(deleteProductRequest());
  try {
    const response = await axios.delete(
      `http://localhost:3000/products/${productId}`
    );
    dispatch(deleteProductSuccess(productId));
    return response; // Propaga la respuesta para uso posterior
  } catch (error) {
    dispatch(deleteProductFailure(error));
  }
};

//USO GENERAL
export const CLEAR_PRODUCT_ERROR = "CLEAR_PRODUCT_ERROR";

export const clearProductError = () => {
  return {
    type: CLEAR_PRODUCT_ERROR,
  };
};

//Ordenes y detalles
//FETCH
export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const fetchOrdersRequest = () => ({
  type: FETCH_ORDERS_REQUEST,
});
export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});
export const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  error: error.response?.data?.message || error.message,
});
export const fetchOrders = () => {
  return async (dispatch) => {
    dispatch(fetchOrdersRequest());
    try {
      const response = await axios.get("http://localhost:3000/orders");
      dispatch(fetchOrdersSuccess(response.data)); // Incluye orders y orderDetails en el reducer
    } catch (error) {
      dispatch(fetchOrdersFailure(error));
    }
  };
};

export const REQUEST_ORDER_HISTORY = "REQUEST_ORDER_HISTORY";
export const ORDER_HISTORY_SUCCESS = "ORDER_HISTORY_SUCCESS";
export const ORDER_HISTORY_FAILURE = "ORDER_HISTORY_FAILURE";

const requestOrderHistory = () => {
  return {
    type: REQUEST_ORDER_HISTORY,
  };
};
const orderHistorySuccess = (orders) => {
  return {
    type: ORDER_HISTORY_SUCCESS,
    payload: orders,
  };
};
const orderHistoryFailure = (error) => {
  return {
    type: ORDER_HISTORY_FAILURE,
    payload: error.response?.data?.message || error.message,
  };
};
export const fetchOrdersHistory = (userId) => {
  return async (dispatch) => {
    dispatch(requestOrderHistory());
    try {
      const response = await axios.get(
        `http://localhost:3000/orders/history?userId=${userId}`
      );
      dispatch(orderHistorySuccess(response.data));
    } catch (error) {
      dispatch(orderHistoryFailure(error));
    }
  };
};

//CREATE
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";

export const createOrderRequest = () => ({
  type: CREATE_ORDER_REQUEST,
});
export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});
export const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error.response?.data?.message || error.message,
});
export const createOrder = (orderData) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      console.log(orderData);
      const response = await axios.post(
        "http://localhost:3000/orders",
        orderData
      );
      dispatch(createOrderSuccess(response.data));
      dispatch(clearCart()); // Despachar acción para limpiar el carrito
    } catch (error) {
      dispatch(createOrderFailure(error));
    }
  };
};

//Carrito
//ADD
export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (productId, quantity) => ({
  type: ADD_TO_CART,
  payload: { productId, quantity },
});

//UPDATE
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";

export const updateCartItem = (productId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, quantity },
});

//DELETE
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: { productId },
});
export const clearCart = () => ({
  type: CLEAR_CART,
});

//Autenticacion:
//LOGIN
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = (loginData) => ({
  type: LOGIN_SUCCESS,
  payload: loginData,
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error.response?.data?.message || error.message,
});
export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:3000/users/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
//LOGOUT
export const LOGOUT = "LOGOUT";

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

//Filtros
//ACTIVATE
export const ACTIVATE_FILTER = "ACTIVATE_FILTER";

export const activateFilter = (filterType, filterName) => ({
  type: ACTIVATE_FILTER,
  payload: { filterType, filterName },
});

//DEACTIVATE
export const DEACTIVATE_FILTER = "DEACTIVATE_FILTER";
export const TOGGLE_FEATURED_FILTER = "TOGGLE_FEATURED_FILTER";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";

export const deactivateFilter = (filterType, filterName) => ({
  type: DEACTIVATE_FILTER,
  payload: { filterType, filterName },
});
export const toggleFeaturedFilter = () => {
  return {
    type: TOGGLE_FEATURED_FILTER,
  };
};
export const updateSearchQuery = (query) => {
  return {
    type: UPDATE_SEARCH_QUERY,
    payload: query,
  };
};
