import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IProfile, IUserData } from "../../types/user.type";
import { IParamsSlice, generateParams } from "../../types/filter.type";

export const getUserList = createAsyncThunk(
   "getUserList",
   async (params: IParamsSlice, { rejectWithValue }) => {
      let filter = "";

      // Thêm điều kiện nếu có facultyId
      if (params.filters?.facultyId) {
         filter += `facultyId==${params.filters.facultyId}`;
      }

      // Thêm điều kiện nếu có status
      if (params.filters?.role) {
         filter += (filter ? "," : "") + `role==${params.filters.role}`;
      }

      // Thêm điều kiện nếu có period
      if (params.filters?.period) {
         filter += (filter ? "," : "") + `periodId==${params.filters.period}`;
      }


      try {
         const res = await api.user.getUserList(
            generateParams(
               filter,
               params?.sorts,
               params?.page,
               params?.pageSize,
            ),
         );
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

export const getUserProfile = createAsyncThunk("getUserProfile", async() => {
   try {
      const res = await api.user.getUserProfile();
      return res.data;
   } catch (error: any) {
      return error.response.data.title;
   }
});

export const updateUserProfile = createAsyncThunk("updateUserProfile", async(data: FormData, {rejectWithValue}) => {
   try {
      const res = await api.user.updateUserProfile(data);
      return res.data;
   } catch (error: any) {
      rejectWithValue(error.respone.data.title);
   }
})

interface UserState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   list: IUserData[];
   isProfileUpdate: boolean;
   userProfile: IProfile | null;
   currentPage: number;
   totalPage: number;
}

const initialState: UserState = {
   isLoading: false,
   isError: false,
   message: "",
   list: [],
   isProfileUpdate: false,
   userProfile: null,
   currentPage: 1,
   totalPage: 1,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      clearProfileMessage: (state) => {
         state.message = "";
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getUserList.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUserList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.isError = false;
            state.list = action.payload.items;
            state.totalPage = action.payload?.totalPages;
            state.currentPage = action.payload?.currentPage;
         })
         .addCase(getUserList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         })
         .addCase(getUserProfile.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userProfile = action.payload;
         })
         .addCase(getUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
            (action.payload as string) || "An error occurred during get data.";
         })
         .addCase(updateUserProfile.pending, (state) => {
            state.isLoading = true;
            state.isProfileUpdate = false;
         })
         .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isProfileUpdate = true;
            state.message = action.payload.title;
         })
         .addCase(updateUserProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = (action.payload as string) || "An error occurred during update profile.";
         })
   },
});

export const { clearProfileMessage } = userSlice.actions;
export default userSlice.reducer;
