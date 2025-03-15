import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import consultationReducer from "./slices/consultationSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    consultation: consultationReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
