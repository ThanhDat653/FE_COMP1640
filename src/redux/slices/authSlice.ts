import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { IChangeFaculty, IChangePassword, IChangeRole, ICreateAllAccount, ICreateContributor, ICreateCoordinator, ILogin, IResetPassword, ISendOTP, IUserInformation } from "../../types/user.type";
import authUtils from "../../utils/auth";

export const login = createAsyncThunk(
   "login",
   async (data: ILogin, { rejectWithValue }) => {
      try {
         const res = await api.user.loginToGetToken(data);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const createContributorAccount = createAsyncThunk(
   "createContributorAccount",
   async (data: ICreateContributor, { rejectWithValue }) => {
      try {
         const res = await api.user.createContributor(data);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const createCoordinatorAccount = createAsyncThunk(
   "createCoordinatorAccount",
   async (data: ICreateCoordinator, { rejectWithValue }) => {
      try {
         const res = await api.user.createCoordinator(data);
         return res.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.title);
      }
   },
);

export const changePassword = createAsyncThunk("changePassword", async(data: IChangePassword, {rejectWithValue}) => {
   try {
      const res = await api.user.changePassword(data);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
});

export const createAllAccount = createAsyncThunk("createAllAccount", async(data: ICreateAllAccount, {rejectWithValue}) => {
   try {
      const res = await api.user.createAllAccount(data);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
});

export const SendResetPasswordOTP = createAsyncThunk("SendResetPasswordOTP", async(data: ISendOTP, {rejectWithValue}) => {
   try {
      const res = await api.user.sendOTP(data);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
});

export const resetPassword = createAsyncThunk("resetPassword", async(data: IResetPassword, {rejectWithValue}) => {
   try {
      const res = await api.user.resetPassword(data);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
});

export const changeRole = createAsyncThunk("changeRole", async(data: IChangeRole, {rejectWithValue}) => {
   try {
      const res = await api.user.changeRole(data);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
});

export const changeFaculty = createAsyncThunk("changeFaculty", async(data: IChangeFaculty, {rejectWithValue}) => {
   try {
      const res = await api.user.changeFaculty(data);
      return res.data;
   } catch (error: any) {
      return rejectWithValue(error.response.data.title);
   }
})

interface UserLoginState {
   isLoading: boolean;
   userInfor: IUserInformation | null;
   isError: boolean;
   message: string;
   isLogin: boolean;
   isChangePassword: boolean;
   isFirstLogin: boolean;
   isSendOTP: boolean;
   isResetPassword: boolean;
}

const initialState: UserLoginState = {
   isLoading: false,
   userInfor: null,
   isError: false,
   message: "",
   isLogin: authUtils.getSessionToken() ? true : false,
   isChangePassword: false,
   isFirstLogin: false,
   isSendOTP: false,
   isResetPassword: false,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      destroy: () => {
         authUtils.setSessionToken();
         return { ...initialState, isLogin: false };
      },
      getCurrentUser: (state) => {
         let token = authUtils.getSessionToken() || "";
         let user = authUtils.decodeToken(token);
         if (user) {
            state.userInfor = user;
         } else return state;
      },
      clearMessage: (state) => {
         state.message = "";
      }
   },
   extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(login.fulfilled, (state, action) => {
         state.isLoading = false;
         
         // Check if the token has the specific property to proceed based on that
         if(action.payload.data.hasOwnProperty("changeInitialPasswordToken")) {
            let tempToken = action.payload.data.changeInitialPasswordToken;
            authUtils.setTempToken(tempToken);
            state.isFirstLogin = true;
         } else {
            let token = action.payload.data;
            authUtils.setSessionToken(token);
            state.userInfor = authUtils.decodeToken(token);
            state.isLogin = true;
         }

         state.message = "";
      });
      builder.addCase(login.rejected, (state, action) => {
         state.isLoading = false;
         state.isLogin = false;
         state.isError = true;
         state.message =
            (action.payload as string) || "An error occurred during login.";
      });
      builder.addCase(createContributorAccount.pending, (state) => {
         state.isLoading = true;
         state.message = "";
         state.isError = false;
      });
      builder.addCase(createContributorAccount.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = action.payload.title;
      });
      builder.addCase(createContributorAccount.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) ||
            "An error occurred during create user.";
      });
      builder.addCase(createCoordinatorAccount.pending, (state) => {
         state.isLoading = true;
         state.isError = false;
         state.message = "";
      });
      builder.addCase(createCoordinatorAccount.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = action.payload.title;
      });
      builder.addCase(createCoordinatorAccount.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message =
            (action.payload as string) ||
            "An error occurred during create user.";
      });
      builder.addCase(changePassword.pending, (state) => {
         state.isLoading = true;
         state.message = "";
      });
      builder.addCase(changePassword.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isChangePassword = true;
         state.isFirstLogin = false;
         state.message = action.payload.title;
         authUtils.removeTempToken();
      });
      builder.addCase(changePassword.rejected, (state, action) => {
         state.isLoading = false;
         state.isChangePassword = false;
         state.message =
            (action.payload as string) ||
            "An error occurred during create user.";
      });
      builder.addCase(createAllAccount.pending, (state) => {
         state.isLoading = true;
         state.isError = false;
         state.message = "";
      });
      builder.addCase(createAllAccount.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = action.payload.title;
      });
      builder.addCase(createAllAccount.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = (action.payload as string) || "An error occurred during create user";
      });
      builder.addCase(SendResetPasswordOTP.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(SendResetPasswordOTP.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSendOTP = true;
         state.isResetPassword = false;
         state.message = "";
      });
      builder.addCase(SendResetPasswordOTP.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = (action.payload as string) || "An error occurred during send OTP";
      });
      builder.addCase(resetPassword.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(resetPassword.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isResetPassword = true;
         state.isSendOTP = false;
         state.message = action.payload.title;
      });
      builder.addCase(resetPassword.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = (action.payload as string) || "An error occurred during reset password";
      });
      builder.addCase(changeRole.pending, (state) => {
         state.isLoading = true;
         state.isError = false;
         state.message = "";
      });
      builder.addCase(changeRole.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = action.payload.title;
      });
      builder.addCase(changeRole.rejected, (state, action) => {
         state.isLoading = false;
         state.message = (action.payload as string) || "An error occurred during change role";
      });
      builder.addCase(changeFaculty.pending, (state, action) => {
         state.isLoading = true;
         state.isError = false;
         state.message = "";
      });
      builder.addCase(changeFaculty.fulfilled, (state, action) => {
         state.isLoading = false;
         state.message = action.payload.title;
      });
      builder.addCase(changeFaculty.rejected, (state, action) => {
         state.isLoading = false;
         state.message = (action.payload as string) || "An error occurred during change faculty";
      })
   },
});

export const { destroy, getCurrentUser, clearMessage } = authSlice.actions;
export default authSlice.reducer;
