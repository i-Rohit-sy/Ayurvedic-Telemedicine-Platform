import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Async thunks
export const createConsultation = createAsyncThunk(
  "consultation/create",
  async (consultationData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.post(
        `${API_URL}/consultations`,
        consultationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create consultation"
      );
    }
  }
);

export const getConsultations = createAsyncThunk(
  "consultation/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/consultations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch consultations"
      );
    }
  }
);

export const getConsultation = createAsyncThunk(
  "consultation/getOne",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/consultations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch consultation"
      );
    }
  }
);

export const updateConsultation = createAsyncThunk(
  "consultation/update",
  async ({ id, consultationData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const response = await axios.put(
        `${API_URL}/consultations/${id}`,
        consultationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update consultation"
      );
    }
  }
);

export const deleteConsultation = createAsyncThunk(
  "consultation/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      await axios.delete(`${API_URL}/consultations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete consultation"
      );
    }
  }
);

const initialState = {
  consultations: [],
  currentConsultation: null,
  loading: false,
  error: null,
};

const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentConsultation: (state, action) => {
      state.currentConsultation = action.payload;
    },
    clearCurrentConsultation: (state) => {
      state.currentConsultation = null;
    },
  },
  extraReducers: (builder) => {
    // Create Consultation
    builder
      .addCase(createConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations.unshift(action.payload);
      })
      .addCase(createConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Consultations
    builder
      .addCase(getConsultations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConsultations.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = action.payload;
      })
      .addCase(getConsultations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Single Consultation
    builder
      .addCase(getConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConsultation = action.payload;
      })
      .addCase(getConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Consultation
    builder
      .addCase(updateConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = state.consultations.map((consultation) =>
          consultation._id === action.payload._id
            ? action.payload
            : consultation
        );
        if (state.currentConsultation?._id === action.payload._id) {
          state.currentConsultation = action.payload;
        }
      })
      .addCase(updateConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Consultation
    builder
      .addCase(deleteConsultation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConsultation.fulfilled, (state, action) => {
        state.loading = false;
        state.consultations = state.consultations.filter(
          (consultation) => consultation._id !== action.payload
        );
        if (state.currentConsultation?._id === action.payload) {
          state.currentConsultation = null;
        }
      })
      .addCase(deleteConsultation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentConsultation, clearCurrentConsultation } =
  consultationSlice.actions;

export default consultationSlice.reducer;
