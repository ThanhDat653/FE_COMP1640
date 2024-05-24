import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import {
   IApproval,
   IContributionData,
   IContributionDetail,
   IPublished,
   IUpdateContributionParams,
} from "../../types/contribution.type";
import { IParamsSlice, generateParams } from "../../types/filter.type";
import { error } from "console";

export const contribute = createAsyncThunk(
   "contribute",
   async (payload: FormData, { rejectWithValue }) => {
      try {
         const res = await api.contribution.contribute(payload);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.payload.title);
      }
   },
);

export const updateContribution = createAsyncThunk(
   "updateContribution",
   async (payload: IUpdateContributionParams, { rejectWithValue }) => {
      try {
         const res = await api.contribution.updateContribution(
            payload.data,
            payload.id,
         );
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const approve = createAsyncThunk(
   "approve",
   async (payload: IApproval, { rejectWithValue }) => {
      try {
         const res = await api.contribution.approve(payload);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const publish = createAsyncThunk(
   "publish",
   async (payload: IPublished, { rejectWithValue }) => {
      try {
         const res = await api.contribution.publish(payload);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const getContributionByStatus = createAsyncThunk(
   "getAllContributions",
   async (filter: string, { rejectWithValue }) => {
      try {
         const res = await api.contribution.getContributionByStatus(filter);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const getContributionById = createAsyncThunk(
   "getContributionById",
   async (id: string, { rejectWithValue }) => {
      try {
         const res = await api.contribution.getContributionById(id);
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

export const getContributionList = createAsyncThunk(
   "getContributionList",
   async (params: IParamsSlice, { rejectWithValue }) => {
      let filter = "";

      // Thêm điều kiện nếu có facultyId
      if (params.filters?.facultyId) {
         filter += `facultyId==${params.filters.facultyId}`;
      }

      // Thêm điều kiện nếu có status
      if (params.filters?.status) {
         filter += (filter ? "," : "") + `status==${params.filters.status}`;
      }

      // Thêm điều kiện nếu có period
      if (params.filters?.period) {
         filter += (filter ? "," : "") + `periodId==${params.filters.period}`;
      }

      // Thêm điều kiện nếu có search
      if (params.filters?.search) {
         filter +=
            (filter ? "," : "") +
            `(title|description|createdByFullName)@=*${params.filters.search}`;
      }

      try {
         const res = await api.contribution.getContributionList(
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

export const getContributionListWithToken = createAsyncThunk(
   "getContributionListWithToken",
   async (params: IParamsSlice, { rejectWithValue }) => {
      let filter = "";

      // Thêm điều kiện nếu có facultyId
      if (params.filters?.facultyId) {
         filter += `facultyId==${params.filters.facultyId}`;
      }

      // Thêm điều kiện nếu có status
      if (params.filters?.status) {
         filter += (filter ? "," : "") + `status==${params.filters.status}`;
      }

      // Thêm điều kiện nếu có period
      if (params.filters?.period) {
         filter += (filter ? "," : "") + `periodId==${params.filters.period}`;
      }

      // Thêm điều kiện nếu có email
      if (params.filters?.email) {
         filter +=
            (filter ? "," : "") + `createdByEmail==${params.filters.email}`;
      }

      if (params.filters?.search) {
         filter +=
            (filter ? "," : "") +
            `(title|description|createdByFullName)@=*${params.filters.search}`;
      }

      try {
         const res = await api.contribution.getContributionListWithToken(
            generateParams(
               filter,
               params?.sorts,
               params?.page,
               params.pageSize ?? 100,
            ),
         );
         return res.data;
      } catch (error: any) {
         rejectWithValue(error.response.data.title);
      }
   },
);

export const getZipAll = createAsyncThunk("getZipAll", async () => {
   try {
      const res = await api.contribution.getZipAllContributions();
      const url = URL.createObjectURL(res.data);

      return url;
   } catch (error: any) {
      return error.response.data.title;
   }
});
interface ContributionState {
   isLoading: boolean;
   isError: boolean;
   message: string;
   status: string;
   list: IContributionData[];
   detail: IContributionDetail | null;
   totalPage: number;
   currentPage: number;
   zip: string;
}

const initialState: ContributionState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
   list: [],
   detail: null,
   totalPage: 1,
   currentPage: 1,
   zip: "",
};

const contributionSlice = createSlice({
   name: "contribution",
   initialState,
   reducers: {
      clearContributionMessage: (state) => {
         state.message = "";
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(contribute.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
      
         })
         .addCase(contribute.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.title;
         })
         .addCase(contribute.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(updateContribution.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateContribution.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.title;
         })
         .addCase(updateContribution.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(publish.pending, (state) => {
            state.isLoading = true;
            state.message = "";
            state.isError = false;
         })
         .addCase(publish.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.title;
         })
         .addCase(publish.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(approve.pending, (state) => {
            state.isLoading = true;
            state.message = "";
            state.isError = false;
         })
         .addCase(approve.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.title;
         })
         .addCase(approve.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getContributionByStatus.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getContributionByStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.list = action.payload?.items;
            state.totalPage = action.payload?.totalPages;
            state.currentPage = action.payload?.currentPage;
         })
         .addCase(getContributionByStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getContributionById.pending, (state) => {
            state.isLoading = true;
            state.detail = null;
         })
         .addCase(getContributionById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.detail = action.payload;
         })
         .addCase(getContributionById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getContributionList.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getContributionList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.list = action.payload?.items;
            state.totalPage = action.payload?.totalPages;
            state.currentPage = action.payload?.currentPage;
         })
         .addCase(getContributionList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getContributionListWithToken.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getContributionListWithToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = "";
            state.list = action.payload?.items;
            state.totalPage = action.payload?.totalPages;
            state.currentPage = action.payload?.currentPage;
         })
         .addCase(getContributionListWithToken.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message =
               (action.payload as string) || "An error occurred during login.";
         });
      builder
         .addCase(getZipAll.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getZipAll.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.message = "";
            state.zip = action.payload;
         })
         .addCase(getZipAll.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = 
               (action.payload as string) || "An error occurred during login.";
         });
   },
});

export const { clearContributionMessage } = contributionSlice.actions;
export default contributionSlice.reducer;
