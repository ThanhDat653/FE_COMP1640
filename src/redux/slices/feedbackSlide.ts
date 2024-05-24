import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IFeedback, IUploadFeedback } from "../../types/feedback.type";

export const postFeedback = createAsyncThunk(
   "postFeedback",
   async (data: IUploadFeedback, { rejectWithValue }) => {
      try {
         const res = await api.feedback.postFeedback(data);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const getFeedback = createAsyncThunk("getFeedback", async () => {
   try {
      const res = await api.feedback.getFeedback();
      return res.data;
   } catch (error: any) {
      return error.response.data.title;
   }
});

export const getFeedbackByContributionId = createAsyncThunk(
   "getFeedbackByContributionId",
   async (id: string) => {
      try {
         const filterByContributionId = `contributionId==${id}`;
         const res = await api.feedback.getFeedBackByContributionId(
            filterByContributionId,
         );
         return res.data;
      } catch (error: any) {
         return error.response.data.title;
      }
   },
);

interface FeedbackState {
   isLoading: boolean;
   isError: boolean;
   message: string ;
   status: string;
   feedback: IFeedback[];
}

const initialState: FeedbackState = {
   isLoading: false,
   isError: false,
   message: "",
   status: "",
   feedback: [],
};

const feedbackSlide = createSlice({
   name: "feedback",
   initialState,
   reducers: {
      clearFeedbackMessage: (state) => {
         state.message = "";
      },
   },
   extraReducers: (builder) => {
      builder.addCase(postFeedback.pending, (state) => {
         state.isLoading = true;
         state.isError = false;
         state.message = "";
      });
      builder.addCase(postFeedback.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = action.payload.title;
      });
      builder.addCase(postFeedback.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload as string;
      });
      builder.addCase(getFeedback.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getFeedback.fulfilled, (state, action) => {
         state.isLoading = false;
         state.feedback = action.payload.items;
      });
      builder.addCase(getFeedback.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload as string;
      });
      builder.addCase(getFeedbackByContributionId.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(
         getFeedbackByContributionId.fulfilled,
         (state, action) => {
            state.isLoading = false;
            state.feedback = action.payload?.items;
         },
      );
      builder.addCase(getFeedbackByContributionId.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload as string;
      });
   },
});

export const { clearFeedbackMessage } = feedbackSlide.actions;
export default feedbackSlide.reducer;
