// src/store/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../services/apis/api";
// const API_URL = "http://localhost:5000/api/v1"; // use environment variable

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API_URL.post(`register`, userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Register failed";
      return rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API_URL.post(`login`, userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
















// // src/store/features/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // const API_URL = "http://localhost:5000/api/v1" || "http://3.108.228.92:5000/api/v1" ;
// const API_URL = "http://3.108.228.92:5000/api/v1" ;

// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/register`, userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Register failed");
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "auth/login",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, userData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Login failed");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: null, token: null, loading: false, error: null },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         localStorage.setItem("token", action.payload.accessToken);
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.accessToken;
//         localStorage.setItem("token", action.payload.accessToken);
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
