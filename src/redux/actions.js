import axios from "axios";

// export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAILURE";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const ACTIVATE_FILTER = "ACTIVATE_FILTER";
export const DEACTIVATE_FILTER = "DEACTIVATE_FILTER";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const SET_SHIPPING_METHOD = "SET_SHIPPING_METHOD";
export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";
export const FETCH_ORDER_DETAILS_SUCCESS = "FETCH_ORDER_DETAILS_SUCCESS";
export const FETCH_ORDER_DETAILS_FAILURE = "FETCH_ORDER_DETAILS_FAILURE";

// const fetchProductsRequest = () => ({
//   type: FETCH_PRODUCTS_REQUEST,
// });

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Esto es response", response);
      console.log("Esto es data", response.data);
      return dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data, // axios envuelve la respuesta bajo el atributo `data`
      });
    } catch (error) {
      // Con axios, `error.response` contiene la respuesta HTTP que causó el error
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      return dispatch({
        type: REGISTER_FAIL,
        payload: errorMessage,
      });
      // Adicionalmente, podrías manejar errores específicos según el status de la respuesta
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
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
      console.log("Esto es response", response);
      console.log("Esto es data", response.data);
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data, // axios envuelve la respuesta bajo el atributo `data`
      });
    } catch (error) {
      // Con axios, `error.response` contiene la respuesta HTTP que causó el error
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      return dispatch({
        type: LOGIN_FAIL,
        payload: errorMessage,
      });
      // Adicionalmente, podrías manejar errores específicos según el status de la respuesta
    }
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAIL,
  payload: error,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    // dispatch(fetchProductsRequest());
    try {
      const response = await axios.get("http://localhost:3000/products");
      return dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      return dispatch(fetchProductsFailure(error.message));
    }
  };
};

export const activateFilter = (filterType, filterName) => ({
  type: ACTIVATE_FILTER,
  payload: { filterType, filterName },
});

export const deactivateFilter = (filterType, filterName) => ({
  type: DEACTIVATE_FILTER,
  payload: { filterType, filterName },
});

// Action para agregar un producto al carrito
export const addToCart = (productId, quantity) => ({
  type: ADD_TO_CART,
  payload: { productId, quantity },
});

// Action para actualizar la cantidad de un producto en el carrito
export const updateCartItem = (productId, quantity) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, quantity },
});

// Action para remover un producto del carrito
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: { productId },
});

// Acción para limpiar el carrito
export const clearCart = () => ({
  type: CLEAR_CART,
});

// Acciones para crear la orden
export const createOrderRequest = () => ({
  type: CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

export const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
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
      dispatch(createOrderFailure(error.message));
      console.log(error.message);
    }
  };
};

export const fetchOrdersRequest = () => ({
  type: FETCH_ORDERS_REQUEST,
});

export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  error,
});

export const fetchOrderDetailsSuccess = (orderDetails) => ({
  type: FETCH_ORDER_DETAILS_SUCCESS,
  payload: orderDetails,
});

export const fetchOrderDetailsFailure = (error) => ({
  type: FETCH_ORDER_DETAILS_FAILURE,
  error,
});

// Función Thunk para fetch de órdenes
export const fetchOrders = () => {
  return async (dispatch) => {
    dispatch(fetchOrdersRequest());
    try {
      const response = await axios.get("http://localhost:3000/orders");
      const orders = response.data;
      const orderDetails = {};

      orders.forEach((order) => {
        order.OrderDetails.forEach((detail) => {
          orderDetails[detail.id] = detail;
        });
        // Eliminar los OrderDetails del objeto order para no duplicar datos
        delete order.OrderDetails;
      });

      dispatch(fetchOrdersSuccess(orders));
      dispatch(fetchOrderDetailsSuccess(orderDetails));
    } catch (error) {
      dispatch(fetchOrdersFailure(error.message));
      dispatch(fetchOrderDetailsFailure(error.message));
    }
  };
};
