import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  ACTIVATE_FILTER,
  DEACTIVATE_FILTER,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDER_DETAILS_SUCCESS,
  FETCH_ORDER_DETAILS_FAILURE,
} from "./actions";

const initialState = {
  users: {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
  },
  products: {
    byId: {},
    allIds: [],
    byCategory: {},
    bySubcategory: {},
    featured: [],
    loading: false,
    error: null,
  },
  orders: {
    byId: {},
    allIds: [],
    filters: {
      status: null,
      paymentMethod: null,
      shippingMethod: null,
    },
    loading: false,
    error: null,
  },
  orderDetails: {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
  },
  cart: {
    items: {},
    totalAmount: "",
  },
  auth: {
    isAuthenticated: false,
    userId: null,
    role: null,
    token: null,
    loading: false,
    error: null,
  },
  search: {
    query: "",
    filters: {
      category: [],
      subcategory: [],
      priceRange: [], //[0, 100],
      featured: false,
    },
    results: [],
  },
};

const rootReducer = (state = initialState, action) => {
  let filterType, filterName;
  let newItems, newTotalAmount;
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          byId: {
            ...state.users.byId,
            [action.payload.id]: action.payload,
          },
          allIds: [...state.users.allIds, action.payload.id],
        },
        auth: {
          isAuthenticated: true,
          userId: action.payload.id,
          role: action.payload.role,
          token: action.payload.loginToken, // Asumiendo que el token viene en la respuesta
        },
      };

    case REGISTER_FAIL:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: false,
          userId: null,
          role: null,
          token: null,
        },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          userId: action.payload.id, // Asumiendo que el payload tiene un usuario
          role: action.payload.role, // y su rol
          token: action.payload.token, // y un token de autenticación
          error: null, // Reseteamos el error en caso de éxito
        },
      };

    case LOGIN_FAIL:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: false,
          userId: null,
          role: null,
          token: null,
          error: action.payload, // Guardamos el mensaje de error
        },
      };

    case LOGOUT:
      return initialState;

    case FETCH_PRODUCTS_SUCCESS:
      const productsById = action.payload.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});

      const allIds = action.payload.map((product) => product.id);

      const byCategory = action.payload.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product.id);
        return acc;
      }, {});

      const bySubcategory = action.payload.reduce((acc, product) => {
        const subcategory = product.subcategory;
        if (!acc[subcategory]) {
          acc[subcategory] = [];
        }
        acc[subcategory].push(product.id);
        return acc;
      }, {});

      const featured = action.payload
        .filter((product) => product.featured)
        .map((product) => product.id);

      return {
        ...state,
        products: {
          ...state.products,
          byId: productsById,
          allIds: allIds,
          byCategory: byCategory,
          bySubcategory: bySubcategory,
          featured: featured,
          loading: false,
          error: null,
        },
      };

    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTIVATE_FILTER:
      filterType = action.payload.filterType;
      filterName = action.payload.filterName;
      // Añade el filtro sin necesidad de comprobar si el arreglo existe
      return {
        ...state,
        search: {
          ...state.search,
          filters: {
            ...state.search.filters,
            [filterType]: state.search.filters[filterType].includes(filterName)
              ? state.search.filters[filterType]
              : [...state.search.filters[filterType], filterName],
          },
        },
      };

    case DEACTIVATE_FILTER:
      filterType = action.payload.filterType;
      filterName = action.payload.filterName;
      return {
        ...state,
        search: {
          ...state.search,
          filters: {
            ...state.search.filters,
            [filterType]: state.search.filters[filterType].filter(
              (item) => item !== filterName
            ),
          },
        },
      };

    case ADD_TO_CART:
      const { productId, quantity } = action.payload;
      const productDetails = state.products.byId[productId];
      const existingCartItem = state.cart.items[productId];

      if (existingCartItem) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        newItems = {
          ...state.cart.items,
          [productId]: {
            ...existingCartItem,
            quantity: existingCartItem.quantity + quantity,
          },
        };
      } else {
        // Si el producto no está en el carrito, añádelo
        newItems = {
          ...state.cart.items,
          [productId]: {
            quantity: quantity,
            price: productDetails.price,
          },
        };
      }

      // Recalcular el total
      newTotalAmount = Object.keys(newItems).reduce((total, id) => {
        return total + newItems[id].quantity * newItems[id].price;
      }, 0);

      return {
        ...state,
        cart: {
          ...state.cart,
          items: newItems,
          totalAmount: newTotalAmount,
        },
      };

    case UPDATE_CART_ITEM:
      newItems = {
        ...state.cart.items,
        [action.payload.productId]: {
          ...state.cart.items[action.payload.productId],
          quantity: action.payload.quantity,
        },
      };

      newTotalAmount = Object.keys(newItems).reduce((total, id) => {
        return total + newItems[id].quantity * newItems[id].price;
      }, 0);

      return {
        ...state,
        cart: {
          ...state.cart,
          items: newItems,
          totalAmount: newTotalAmount,
        },
      };

    case REMOVE_FROM_CART:
      console.log("Current cart items:", state.cart.items);
      console.log("Product ID to remove:", action.payload.productId);

      newItems = { ...state.cart.items };
      console.log("Before delete:", newItems);

      delete newItems[action.payload.productId];
      console.log("After delete:", newItems);

      newTotalAmount = Object.keys(newItems).reduce((total, id) => {
        return (
          total +
          (newItems[id] ? newItems[id].quantity * newItems[id].price : 0)
        );
      }, 0);

      console.log("New total amount:", newTotalAmount);

      return {
        ...state,
        cart: {
          ...state.cart,
          items: newItems,
          totalAmount: newTotalAmount,
        },
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [],
          totalAmount: 0,
        },
      };

    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: true,
          error: null,
        },
      };

    case CREATE_ORDER_SUCCESS:
      const { order, orderDetails } = action.payload;
      if (!order.id) {
        console.error("Received order without ID:", order);
        return {
          ...state,
          orders: {
            ...state.orders,
            loading: false,
            error: "Received order without valid ID",
          },
        };
      }

      const newOrderDetails = orderDetails.reduce(
        (acc, detail) => ({
          ...acc,
          [detail.id]: detail,
        }),
        {}
      );

      return {
        ...state,
        orders: {
          ...state.orders,
          byId: {
            ...state.orders.byId,
            [order.id]: {
              ...order,
              orderDetails: orderDetails.map((detail) => detail.id),
            },
          },
          allIds: [...state.orders.allIds, order.id],
        },
        orderDetails: {
          ...state.orderDetails,
          byId: {
            ...state.orderDetails.byId,
            ...newOrderDetails,
          },
          allIds: [
            ...state.orderDetails.allIds,
            ...orderDetails.map((detail) => detail.id),
          ],
          loading: false,
          error: null,
        },
      };

    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
          error: action.payload,
        },
      };

    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: true,
          error: null,
        },
        orderDetails: {
          ...state.orderDetails,
          loading: true,
          error: null,
        },
      };
    case FETCH_ORDERS_SUCCESS:
      const updatedOrders = action.payload.reduce(
        (acc, order) => {
          acc.byId[order.id] = order;
          acc.allIds.push(order.id);
          return acc;
        },
        { byId: {}, allIds: [] }
      );

      return {
        ...state,
        orders: {
          ...state.orders,
          byId: updatedOrders.byId,
          allIds: updatedOrders.allIds,
          loading: false,
          error: null,
        },
      };
    case FETCH_ORDER_DETAILS_SUCCESS:
      const fetchedOrderDetails = action.payload;

      return {
        ...state,
        orderDetails: {
          byId: fetchedOrderDetails,
          allIds: Object.keys(fetchedOrderDetails),
          loading: false,
          error: null,
        },
      };
    case FETCH_ORDERS_FAILURE:
    case FETCH_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
          error: action.error,
        },
        orderDetails: {
          ...state.orderDetails,
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
