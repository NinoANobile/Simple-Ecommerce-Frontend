import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  role: localStorage.getItem("role"),
  token: localStorage.getItem("token"),
  isVerified: false,
  loading: false,
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  // Podrías añadir lógica adicional de logout, si es necesario (e.g., limpieza del token en el backend)
  return;
});

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/verify-email?token=${token}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/request-password-reset",
        {
          email,
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token }, { rejectWithValue }) => {
    console.log("Esto es el passowrd: ", password);
    console.log("Esto es el token: ", token);

    try {
      const response = await axios.post(
        "http://localhost:3000/users/reset-password",
        { password, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
      state.token = null;
      state.error = null;

      // También eliminamos el token y otros datos de localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;

        const token = action.payload.token;
        const decodedToken = jwtDecode(token);

        state.token = token;
        state.userId = decodedToken.id; // Aquí obtenemos el id del usuario
        state.role = decodedToken.role; // Aquí obtenemos el role del usuario
        state.loading = false;
        state.error = null;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", decodedToken.id);
        localStorage.setItem("role", decodedToken.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userId = null;
        state.role = null;
        state.token = null;
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        // Restablecemos el estado de autenticación y otros estados relacionados
        state.isAuthenticated = initialState.isAuthenticated;
        state.userId = initialState.userId;
        state.role = initialState.role;
        state.token = initialState.token;
        state.orders = initialState.orders; // Restablecer el estado de órdenes
        state.orderDetails = initialState.orderDetails; // Restablecer el estado de detalles de órdenes
        state.loading = false;
        state.error = null;

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.isVerified = true;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearToken, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
