import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import contributionReducer from "../slices/contributionSlice";
import facultyReducer from "../slices/facultySlice";
import feedbackReducer from "../slices/feedbackSlide";
import periodReducer from "../slices/periodSlide";
import userReducer from "../slices/userSlice";
import roleReducer from "../slices/roleSlice";
import dashboardReducer from "../slices/dashboardSlice";

const store = configureStore({
   reducer: {
      auth: authReducer,
      contribution: contributionReducer,
      faculty: facultyReducer,
      feedback: feedbackReducer,
      period: periodReducer,
      user: userReducer,
      role: roleReducer,
      dashboard: dashboardReducer,
   },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
