import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ICreateFaculty, IEditFaculty, IFaculty } from "../../types/faculty.type";

export const getFaculty = createAsyncThunk("getFaculty", async () => {
   try {
      const res = await api.faculty.getFaculty();
      return res.data;
   } catch (error: any) {
      return error.response.data.title;
   }
});

export const createFaculty = createAsyncThunk("createFaculty", async(data: ICreateFaculty, {rejectWithValue}) => {
   try {
      const res = await api.faculty.createFaculty(data);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
});

export const editFaculty = createAsyncThunk("editFaculty", async(data: IEditFaculty, {rejectWithValue}) =>{
   try {
      const res = await api.faculty.editFaculty(data);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
})

interface ContributionState {
   isLoading: boolean;
   isError: boolean;
   isSuccess: boolean;
   message: string;
   status: string;
   faculty: IFaculty[];
}

const initialState: ContributionState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
   status: "",
   faculty: [],
};

const facultySlice = createSlice({
   name: "faculty",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getFaculty.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getFaculty.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = "";
         state.faculty = action.payload.items;
      });
      builder.addCase(getFaculty.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
      builder.addCase(createFaculty.pending, (state) => {
         state.isLoading = true;
         state.isSuccess = false;
         state.isError = false;
         state.message = "";
      });
      builder.addCase(createFaculty.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.message = action.payload.title;
      });
      builder.addCase(createFaculty.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = (action.payload as string) || "An error occurred during create faculty.";
      });
      builder.addCase(editFaculty.pending, (state) => {
         state.isLoading = true;
         state.isSuccess = false;
         state.isError = false;
         state.message = "";
      });
      builder.addCase(editFaculty.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.message = action.payload.title;
      });
      builder.addCase(editFaculty.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.isSuccess = false;
         state.message = (action.payload as string) || "An error occurred during edit faculty.";
      })
   },
});

export default facultySlice.reducer;
