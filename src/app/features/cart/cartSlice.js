import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer: (state, action) => {
        const { productId, prodPrice, prodQuantity } = action.payload;

        const existingCartItem = state.items[productId];

        if (existingCartItem) {
          existingCartItem.quantity += prodQuantity;
        } else {
          state.items[productId] = {
            quantity: prodQuantity,
            price: prodPrice,
          };
        }

        state.totalAmount = Object.keys(state.items).reduce((total, id) => {
          return total + state.items[id].quantity * state.items[id].price;
        }, 0);
      },
      prepare: (id, price, quantity) => {
        return {
          payload: {
            productId: id,
            prodPrice: price,
            prodQuantity: quantity,
          },
        };
      },
    },
    updateCartItem: {
      reducer: (state, action) => {
        const { productId, quantity } = action.payload;

        if (state.items[productId]) {
          state.items[productId].quantity = quantity;

          state.totalAmount = Object.keys(state.items).reduce((total, id) => {
            return total + state.items[id].quantity * state.items[id].price;
          }, 0);
        }
      },
      prepare: (id, quantity) => {
        return {
          payload: {
            productId: id,
            quantity,
          },
        };
      },
    },
    removeFromCart: {
      reducer: (state, action) => {
        const { productId } = action.payload;

        // Eliminar el producto del carrito
        delete state.items[productId];

        // Recalcular el total
        state.totalAmount = Object.keys(state.items).reduce((total, id) => {
          return total + state.items[id].quantity * state.items[id].price;
        }, 0);
      },
      prepare: (id) => {
        return {
          payload: {
            productId: id,
          },
        };
      },
    },
    clearCart: (state) => {
      state.items = {};
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
