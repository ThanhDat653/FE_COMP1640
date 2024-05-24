import { jwtDecode } from "jwt-decode";
import { IUserInformation } from "../types/user.type";

/* eslint-disable import/no-anonymous-default-export */
const TOKEN_KEY = "user-token";
const TEMP_TOKEN = "temp-token";
const EMAIL = "email";

export default {
   getSessionToken(): string | null {
      let token = sessionStorage.getItem(TOKEN_KEY);
      return token ? token : null;
   },
   setSessionToken(token?: string) {
      if (token) {
         sessionStorage.setItem(TOKEN_KEY, token);
      } else {
         sessionStorage.removeItem(TOKEN_KEY);
      }
   },
   decodeToken(token?: string): IUserInformation | null {
      if (token) {
         let userData: any = jwtDecode(token);

         return {
            firstName:
               userData[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
               ],
            lastName:
               userData[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
               ],
            role: userData[
               "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
            email: userData[
               "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
            facultyId: userData["facultyId"],
         };
      } else return null;
   },
   setEmail(email?: string) {
      if (email) {
         sessionStorage.setItem(EMAIL, email);
      } else {
         sessionStorage.removeItem(EMAIL);
      }
   },
   getEmail() {
      let email = sessionStorage.getItem(EMAIL);
      return email;
   },
   setTempToken(token?: string) {
      if (token) {
         sessionStorage.setItem(TEMP_TOKEN, token);
      } else {
         sessionStorage.removeItem(TEMP_TOKEN);
      }
   },
   getTempToken(): string | null {
      let token = sessionStorage.getItem(TEMP_TOKEN);
      return token ? token : null;
   },
   removeTempToken() {
      sessionStorage.removeItem(TEMP_TOKEN);
   },
};
