import {
  //Productos
  //FETCH
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  //CREATE
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  //UPDATE
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  //DELETE
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  //USO GENERAL
  CLEAR_PRODUCT_ERROR,
  //Autenticacion
  //LOGIN
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  //LOGUT
  LOGOUT,
  //Usuarios
  //CREATE
  REGISTER_USER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  //DELETE
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  //Ordenes y detalles
  //FETCH
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  REQUEST_ORDER_HISTORY,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAILURE,
  //CREATE
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  //Carrito
  //ADD
  ADD_TO_CART,
  //UPDATE
  UPDATE_CART_ITEM,
  //DELETE
  REMOVE_FROM_CART,
  CLEAR_CART,
  //Filtros
  //ACTIVATE
  ACTIVATE_FILTER,
  TOGGLE_FEATURED_FILTER,
  UPDATE_SEARCH_QUERY,
  //DEACTIVATE
  DEACTIVATE_FILTER,
} from "./actions";

const initialState = {
  users: {
    byId: {},
    allIds: [],
    loading: false,
    error: false,
  },
  products: {
    byId: {},
    allIds: [],
    byCategory: {},
    bySubcategory: {},
    byBrand: {},
    featured: [],
    loading: false,
    error: false,
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
    error: false,
  },
  orderDetails: {
    byId: {},
    allIds: [],
    loading: false,
    error: false,
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
    error: false,
  },
  search: {
    query: "",
    filters: {
      category: [],
      subcategory: [],
      brand: [],
      // priceRange: [], //[0, 100],
      featured: false,
    },
    results: [],
  },
};

const rootReducer = (state = initialState, action) => {
  let filterType, filterName;
  let newItems, newTotalAmount;
  switch (action.type) {
    //Usuarios
    //CREATE
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
    case REGISTER_FAILURE:
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
    //DELETE
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
          error: null,
        },
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        auth: initialState.auth, // Restablecer solo el estado de autenticación
        users: {
          ...state.users,
          byId: Object.keys(state.users.byId).reduce((acc, key) => {
            if (key !== action.userId) {
              acc[key] = state.users.byId[key];
            }
            return acc;
          }, {}),
          allIds: state.users.allIds.filter((id) => id !== action.userId),
        },
        orders: initialState.orders, // Restablecer el estado de órdenes
        orderDetails: initialState.orderDetails, // Restablecer el estado de detalles de órdenes
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: action.payload,
        },
      };

    //Productos
    //FETCH
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        },
      };
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

      const byBrand = action.payload.reduce((acc, product) => {
        const brand = product.brand;
        if (!acc[brand]) {
          acc[brand] = [];
        }
        acc[brand].push(product.id);
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
          byBrand: byBrand,
          featured: featured,
          loading: false,
          error: null,
        },
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.payload,
        },
      };
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        },
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          byId: {
            ...state.products.byId,
            [action.payload.id]: action.payload,
          },
          loading: false,
        },
      };
    case PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.payload,
        },
      };
    //CREATE
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
          error: null,
          isProductCreated: false,
        },
      };
    case CREATE_PRODUCT_SUCCESS:
      const newProduct = action.payload;
      return {
        ...state,
        products: {
          ...state.products,
          byId: { ...state.products.byId, [newProduct.id]: newProduct },
          allIds: [...state.products.allIds, newProduct.id],
          byCategory: {
            ...state.products.byCategory,
            [newProduct.category]: [
              ...(state.products.byCategory[newProduct.category] || []),
              newProduct.id,
            ],
          },
          bySubcategory: {
            ...state.products.bySubcategory,
            [newProduct.subcategory]: [
              ...(state.products.bySubcategory[newProduct.subcategory] || []),
              newProduct.id,
            ],
          },
          featured: newProduct.featured
            ? [...state.products.featured, newProduct.id]
            : state.products.featured,
          loading: false,
          isProductCreated: true,
        },
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.payload,
          isProductCreated: false,
        },
      };
    //UPDATE
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        },
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          byId: {
            ...state.products.byId,
            [action.payload.id]: {
              ...state.products.byId[action.payload.id],
              ...action.payload,
            },
          },
          loading: false,
        },
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.payload,
        },
      };
    //DELETE
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        },
      };
    case DELETE_PRODUCT_SUCCESS:
      // Aca deberia borrar el producto eliminado.
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: null,
        },
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.payload,
        },
      };
    //USO GENERAL
    case CLEAR_PRODUCT_ERROR:
      return {
        ...state,
        products: {
          ...state.products,
          error: null,
        },
      };

    //Ordenes y detalle
    //FETCH
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
      const { orders: updatedOrders, orderDetails: updatedOrderDetails } =
        action.payload.reduce(
          (acc, order) => {
            acc.orders.byId[order.id] = { ...order }; // Copia del pedido sin detalles
            acc.orders.allIds.push(order.id);

            // Reorganizar los detalles del pedido en el objeto orderDetails
            order.OrderDetails.forEach((detail) => {
              acc.orderDetails.byId[detail.id] = detail;
            });

            return acc;
          },
          {
            orders: { byId: {}, allIds: [] },
            orderDetails: { byId: {} },
          }
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
        orderDetails: {
          byId: updatedOrderDetails.byId,
          allIds: Object.keys(updatedOrderDetails.byId),
          loading: false,
          error: null,
        },
      };
    case FETCH_ORDERS_FAILURE:
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
    case REQUEST_ORDER_HISTORY:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: true,
        },
      };
    case ORDER_HISTORY_SUCCESS:
      const byId = {};
      const allOrdersIds = [];

      action.payload.forEach((order) => {
        byId[order.id] = order;
        allOrdersIds.push(order.id);
      });

      return {
        ...state,
        orders: {
          ...state.orders,
          byId,
          allOrdersIds,
          loading: false,
          error: null,
        },
      };
    case ORDER_HISTORY_FAILURE:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
          error: action.payload,
        },
      };
    //CREATE
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

    //Carrito
    //ADD
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
    //UPDATE
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
    //DELETE
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

    // Auth
    //LOGIN
    case LOGIN_REQUEST:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
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
          loading: false,
          error: null, // Reseteamos el error en caso de éxito
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: false,
          userId: null,
          role: null,
          token: null,
          error: action.payload, // Guardamos el mensaje de error
          loading: false,
        },
      };
    //LOGUT
    case LOGOUT:
      return {
        ...state,
        auth: {
          ...initialState.auth,
        },
        orders: initialState.orders, // Restablecer el estado de órdenes
        orderDetails: initialState.orderDetails, // Restablecer el estado de detalles de órdenes
      };

    //Filtros
    //ACTIVATE
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
    case TOGGLE_FEATURED_FILTER:
      return {
        ...state,
        search: {
          ...state.search,
          filters: {
            ...state.search.filters,
            featured: !state.search.filters.featured,
          },
        },
      };
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        search: {
          ...state.search,
          query: action.payload,
        },
      };
    //DEACTIVATE
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

    default:
      return state;
  }
};

export default rootReducer;
