import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import {
   ICoordinatorDashboard,
   IManagerDashboard,
} from "../../types/dashboard.type";

export const getCoordinatorDashboard = createAsyncThunk(
   "getCoordinatorDashboard",
   async (period: string, { rejectWithValue }) => {
      try {
         const res = await api.dashboard.getCoordinatorDashboard(period);
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

export const getManagerDashboard = createAsyncThunk(
   "getManagerDashboard",
   async (period: string, { rejectWithValue }) => {
      try {
         const res = await api.dashboard.getManagerDashboard(period);
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

interface DashboardState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   status: string;
   coordinatorDashboard: ICoordinatorDashboard | null;
   managerDashboard: IManagerDashboard | null;
}

const initialState: DashboardState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
   coordinatorDashboard: null,
   managerDashboard: null,
};

const dashboardSlice = createSlice({
   name: "dashboard",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getCoordinatorDashboard.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getCoordinatorDashboard.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.coordinatorDashboard = action.payload;
      });
      builder.addCase(getCoordinatorDashboard.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
      builder.addCase(getManagerDashboard.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getManagerDashboard.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.managerDashboard = action.payload;
      });
      builder.addCase(getManagerDashboard.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
   },
});

export default dashboardSlice.reducer;
