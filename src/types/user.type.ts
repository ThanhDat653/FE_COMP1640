export interface ILogin {
   email: string;
   password: string;
}

export interface IUserInformation {
   firstName: string;
   lastName: string;
   role: string;
   email: string;
   facultyId: string;
}

export interface IUserData {
   id: string;
   fullName: string;
   email: string;
   role: string;
   facultyName: string;
   facultyId: string;
   avatarUrl: string;
}

export interface ICreateContributor{
   email: string;
   firstName: string;
   lastName: string;
}

export interface ICreateCoordinator{
   email: string;
   firstName: string;
   lastName: string;
   facultyId: string;
}

export interface IChangePassword{
   email: string;
   newPassword: string;
   confirmNewPassword: string;
   changeInitialPasswordToken: string;
}

export interface ICreateAllAccount{
   email: string;
   firstName: string;
   lastName: string;
   roleId: string;
   facultyId?: string;
}

export interface IResetPassword{
   email: string;
   otp: string;
   newPassword: string;
   confirmNewPassword: string;
}

export interface ISendOTP{
   email: string;
}

export interface IProfile{
   fullName: string;
   email: string;
   numberOfContributions: string;
   role: string;
   facultyName: string;
   avatarUrl: string;
}

export interface IChangeRole{
   email: string;
   roleId: string;
}

export interface IChangeFaculty{
   email: string;
   facultyId: string;
}