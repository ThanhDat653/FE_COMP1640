import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IRole } from "../../types/role.type";

export const getRole = createAsyncThunk("getRole", async () => {
   try {
      const res = await api.role.getRoles();
      return res.data;
   } catch (error: any) {
      return error.response.data.title;
   }
});

interface RoleState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   role: IRole[];
}

const initialState: RoleState = {
   isLoading: false,
   isError: false,
   message: "",
   role: [],
};

const roleSlide = createSlice({
   name: "role",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getRole.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getRole.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.role = action.payload?.items;
         })
         .addCase(getRole.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
         });
   },
});

export default roleSlide.reducer;
