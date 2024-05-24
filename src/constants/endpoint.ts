import { PARAMETER } from "./path";

// Define the base URL for the API
const API_BASE_URL = "http://localhost:5001/api/";

// Define functions to construct endpoint URLs
function constructEndpoint(endpoint: string) {
   return API_BASE_URL + endpoint;
}

// Define the endpoints
export const ENDPOINTS = {
   LOGIN: constructEndpoint("Auth/Login"),
   REGISTER: constructEndpoint("Auth/Register"),
   RESET_PASS: constructEndpoint("Auth/ChangeInitialPassword"),
   SENT_OTP: constructEndpoint("Auth/SendResetPasswordOTP"),
   CHANGE_PASS: constructEndpoint("Auth/ResetPassword"),
   CREATE_CONTRIBUTOR_ACCOUNT: constructEndpoint(
      "Auth/CreateContributorAccount",
   ),
   CREATE_COORDINATOR_ACCOUNT: constructEndpoint(
      "Auth/CreateCoordinatorAccount",
   ),
   CREATE_ALL_ACCOUNT: constructEndpoint("Auth/CreateAllAccount"),
   VIEW_PROFILE: constructEndpoint("Auth/SelfProfile"),
   EDIT_PROFILE: constructEndpoint("Auth/UpdateProfile"),
   CHANGE_ROLE: constructEndpoint("Auth/ChangeRole"),
   CHANGE_FACULTY: constructEndpoint("Auth/ChangeFaculty"),
   FALCUTY: constructEndpoint("Falcuties"),
   EDIT_FALCUTY: constructEndpoint("Falcuties/UpdateFaculty"),
   ROLE: constructEndpoint("Auth/Roles"),
   CONTRIBUTION: {
      ALL: constructEndpoint(`Contributions`),
      FILTER: constructEndpoint(
         `Contributions?${PARAMETER.CONTRIBUTION_FILTER}`,
      ),
      BY_ID: constructEndpoint(`Contributions/${PARAMETER.ID}`),
      APPROVED: constructEndpoint(`Contributions/Approval`),
      PUBLISHED: constructEndpoint(`Contributions/Publishment`),
      ZIP_ALL: constructEndpoint(`Contributions/ZipAllContributions`),
   },
   FEEDBACK: {
      ALL: constructEndpoint(`Feedbacks`),
   },
   PERIOD: {
      ALL: constructEndpoint(`Periods`),
      BY_ID: constructEndpoint(`Periods/${PARAMETER.ID}`),
   },
   USER: {
      ALL: constructEndpoint(`Auth/Users`),
   },
   DASHBOARD: {
      COORDINATOR: constructEndpoint(`Dashboards/Coordinator`),
      MANAGER: constructEndpoint(`Dashboards/Manager`),
   },
};
