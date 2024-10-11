import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: false,
};

// Async Thunks
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get("http://localhost:3000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchOrderHistory = createAsyncThunk(
  "orders/fetchOrderHistory",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `http://localhost:3000/orders/history?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        "http://localhost:3000/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const checkStock = createAsyncThunk(
  "products/checkStock",
  async (orderDetails, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        "http://localhost:3000/orders/check-stock",
        { orderDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const fetchLastOrder = createAsyncThunk(
  "orders/fetchLastOrder",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token; // Obtén el token del estado global

      // Verificar si el token existe
      if (!token) {
        throw new Error("Token no disponible. Por favor, inicia sesión.");
      }

      const response = await axios.get(
        `http://localhost:3000/orders/lastOrder?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        const byId = {};
        const allOrdersIds = [];

        action.payload.forEach((order) => {
          byId[order.id] = order;
          allOrdersIds.push(order.id);
        });

        state.byId = byId;
        state.allIds = allOrdersIds;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Order History
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        const byId = {};
        const allOrdersIds = [];

        action.payload.forEach((order) => {
          byId[order.id] = order;
          allOrdersIds.push(order.id);
        });

        state.byId = byId;
        state.allIds = allOrdersIds;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { order, orderDetails } = action.payload;

        state.byId[order.id] = {
          ...order,
          orderDetails: orderDetails.map((detail) => detail.id),
        };
        state.allIds.push(order.id);
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check Stock
      .addCase(checkStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkStock.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = ordersSlice.actions;

export default ordersSlice.reducer;
