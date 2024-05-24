import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ICreatePeriod, IPeriod, IUpdatePeriod, IUpdatePeriodParams } from "../../types/period.type";

export const getPeriod = createAsyncThunk("getPeriod", async () => {
   try {
      const res = await api.period.getPeriod();
      return res.data;
   } catch (error: any) {
      return error.response.data.title;
   }
});

export const createPeriod = createAsyncThunk("createPeriod", async(payload: FormData, {rejectWithValue}) => {
   try {
      const res = await api.period.createPeriod(payload);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
});

export const updatePeriod = createAsyncThunk("updatePeriod", async(payload: IUpdatePeriodParams, {rejectWithValue}) => {
   try {
      const res = await api.period.updatePeriod(payload.data, payload.id);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
})


interface PeriodState {
   isLoading: boolean;
   isError: boolean;
   isSucess: boolean;
   message: string;
   period: IPeriod[];
   detail: IUpdatePeriod | null;
}

const initialState: PeriodState = {
   isLoading: false,
   isError: false,
   isSucess: false,
   message: "",
   period: [],
   detail: null,
};

const periodSlide = createSlice({
   name: "period",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getPeriod.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getPeriod.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.period = action.payload.items;
         })
         .addCase(getPeriod.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
         })
         .addCase(createPeriod.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createPeriod.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSucess = true;
            state.message = action.payload.title;
         })
         .addCase(createPeriod.rejected, (state, action) => {
            state.isLoading = false;
            state.isSucess = false;
            state.isError = true;
            state.message = (action.payload as string) || "An error occurred during post period.";
         })
         .addCase(updatePeriod.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updatePeriod.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSucess = true;
            state.isError = false;
            state.message = action.payload.title;
         })
         .addCase(updatePeriod.rejected, (state, action) => {
            state.isLoading = false;
            state.isSucess = false;
            state.isError = true;
            state.message = (action.payload as string) || "An error occurred during put period.";
         })
   },
});

export default periodSlide.reducer;
