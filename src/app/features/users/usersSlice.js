import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  byId: {},
  allIds: [],
  //   status: "idle", // "idle", "loading", "succeeded", "failed"
  loading: false,
  error: null,
};

// Async Thunks
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// export const deleteAccount = createAsyncThunk(
//   "users/deleteAccount",
//   async ({ userId, role }, { rejectWithValue }) => {
//     try {
//       await axios({
//         method: "delete",
//         url: `http://localhost:3000/users/delete/${userId}`,
//         data: { role },
//       });
//       return userId;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

export const deleteAccount = createAsyncThunk(
  "users/deleteAccount",
  async ({ userId, role }, { getState, rejectWithValue }) => {
    try {
      // Obtener el token del estado global
      const token = getState().auth.token;
      console.log("Token enviado:", token);

      // Realizar la solicitud con el token en el encabezado Authorization
      await axios({
        method: "delete",
        url: `http://localhost:3000/users/delete/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
        },
        data: { role },
      });

      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpiar error en cada nueva solicitud
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (!state.allIds.includes(action.payload.id)) {
          state.allIds.push(action.payload.id);
        }
        state.byId[action.payload.id] = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpiar error en cada nueva solicitud
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        delete state.byId[action.payload];
        state.allIds = state.allIds.filter((id) => id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearUserError } = usersSlice.actions;

export default usersSlice.reducer;
