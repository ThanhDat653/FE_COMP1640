const PARAMETER = {
   ID: ":id",
   CATEGORY: ":category",
   EMAIL: ":email",
   CONTRIBUTION_FILTER: ":filter",
   CONTRIBUTION_SLUG: "",
};

const PATHS = {
   HOME: {
      IDENTITY: "home",
   },
   AUTH: {
      IDENTITY: "auth",
      LOGIN: "login",
      REGISTER: "register",
      CHANGE_PASS: "changePassword",
      SEND_OTP: "verifyEmail",
      RESET_PASS: "resetPassword",
   },
   PROFILE: {
      IDENTITY: "profile",
      VIEW: "view",
      EDIT: "edit",
   },
   DASHBOARD: {
      INDENTITY: "dashboard",
   },
   CONTRIBUTION: {
      IDENTITY: "Contribution",
      DETAIL: `${PARAMETER.ID}`,
      CATEGORY: `category`,
      CREATE: "contribute",
      FACULTY: "Faculty",
   },
   CONTRIBUTOR: {
      IDENTITY: "contributor",
   },
   COORDINATOR: {
      IDENTITY: "coordinator",
      CREATE_ACCOUNT: "createAccount",
   },
   MANAGER: {
      IDENTITY: "manager",
      CREATE_ACCOUNT: "createAccount",
   },
   ADMIN: {
      IDENTITY: "admin",
      MANAGE_USER: "user",
      PERIOD: "period",
      DETAIL: `${PARAMETER.ID}`,
      DASHBOARD: "dashboard",
      CHANGE_ROLE: "changeRole",
      CHANGE_FACULTY: "changeFaculty",
      CREATE_ALL: "createAccount",
      FACULTY: "faculty",
   },
   TERM_OF_SERVICE: {
      IDENTITY: "TermsOfService",
      DETAIL: "DETAIL",
   }
};

export { PATHS, PARAMETER };
