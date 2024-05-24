/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";

const userToken = () => {
   return sessionStorage.getItem("user-token");
};

export default {
   getCoordinatorDashboard: (period: string) => {
      return axios.get(ENDPOINTS.DASHBOARD.COORDINATOR, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
         params: { periodId: period },
      });
   },

   getManagerDashboard: (period: string) => {
      return axios.get(ENDPOINTS.DASHBOARD.MANAGER, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
         params: { periodId: period },
      });
   },
};
