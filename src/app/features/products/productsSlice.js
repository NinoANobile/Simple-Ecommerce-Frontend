import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  byId: {},
  allIds: [],
  byCategory: {},
  bySubcategory: {},
  byBrand: {},
  featured: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        "http://localhost:3000/products/create",
        formData,
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
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/${productId}`
      );

      // Actualizar el estado en el frontend
      dispatch(updateProductInState(response.data));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    try {
      // Obtener el token del estado global
      const token = getState().auth.token;
      // Realizar la solicitud de actualización del producto en el servidor
      const response = await axios.put(
        `http://localhost:3000/products/${formData.get("id")}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los headers
          },
        }
      );

      // Actualizar el estado en el frontend
      dispatch(updateProductInState(response.data));
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue, dispatch, getState }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteProductInState(productId));
    } catch (error) {
      console.error("Error capturado en el catch:", error); // Añade este console.log para verificar el error
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductInState: (state, action) => {
      const updatedProduct = action.payload;

      // Actualizamos las propiedades clave permitidas
      state.byId[updatedProduct.id] = {
        ...state.byId[updatedProduct.id],
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        stock: updatedProduct.stock,
        images: updatedProduct.images,
        featured: updatedProduct.featured,
      };

      // Actualizamos el producto en el estado `byId`
      state.byId[updatedProduct.id] = updatedProduct;

      // Sobreescribimos directamente los datos en byCategory, bySubcategory y byBrand
      state.byCategory[updatedProduct.category] = [updatedProduct.id];
      state.bySubcategory[updatedProduct.subcategory] = [updatedProduct.id];
      state.byBrand[updatedProduct.brand] = [updatedProduct.id];

      // Si es destacado, lo agregamos a la lista de destacados
      if (updatedProduct.featured) {
        if (!state.featured.includes(updatedProduct.id)) {
          state.featured.push(updatedProduct.id);
        }
      } else {
        state.featured = state.featured.filter(
          (id) => id !== updatedProduct.id
        );
      }
    },

    deleteProductInState: (state, action) => {
      const productId = action.payload;

      // Eliminamos el producto de byId
      delete state.byId[productId];

      // Eliminamos el producto de allIds
      state.allIds = state.allIds.filter((id) => id !== productId);

      // Eliminamos el producto de byCategory, bySubcategory y byBrand
      Object.keys(state.byCategory).forEach((category) => {
        state.byCategory[category] = state.byCategory[category].filter(
          (id) => id !== productId
        );
      });

      Object.keys(state.bySubcategory).forEach((subcategory) => {
        state.bySubcategory[subcategory] = state.bySubcategory[
          subcategory
        ].filter((id) => id !== productId);
      });

      Object.keys(state.byBrand).forEach((brand) => {
        state.byBrand[brand] = state.byBrand[brand].filter(
          (id) => id !== productId
        );
      });

      // Eliminamos el producto de la lista de destacados si es necesario
      state.featured = state.featured.filter((id) => id !== productId);
    },

    clearProductError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const productsById = action.payload.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
        state.byId = productsById;
        state.allIds = action.payload.map((product) => product.id);

        state.byCategory = action.payload.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product.id);
          return acc;
        }, {});

        state.bySubcategory = action.payload.reduce((acc, product) => {
          const subcategory = product.subcategory;
          if (!acc[subcategory]) {
            acc[subcategory] = [];
          }
          acc[subcategory].push(product.id);
          return acc;
        }, {});

        state.byBrand = action.payload.reduce((acc, product) => {
          const brand = product.brand;
          if (!acc[brand]) {
            acc[brand] = [];
          }
          acc[brand].push(product.id);
          return acc;
        }, {});

        state.featured = action.payload
          .filter((product) => product.featured)
          .map((product) => product.id);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newProduct = action.payload;
        state.byId[newProduct.id] = newProduct;
        state.allIds.push(newProduct.id);

        if (!state.byCategory[newProduct.category]) {
          state.byCategory[newProduct.category] = [];
        }
        state.byCategory[newProduct.category].push(newProduct.id);

        if (!state.bySubcategory[newProduct.subcategory]) {
          state.bySubcategory[newProduct.subcategory] = [];
        }
        state.bySubcategory[newProduct.subcategory].push(newProduct.id);

        if (newProduct.featured) {
          state.featured.push(newProduct.id);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductError, updateProductInState, deleteProductInState } =
  productsSlice.actions;

export default productsSlice.reducer;
