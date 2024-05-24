/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { IUploadFeedback } from "../../types/feedback.type";


export default {
   getFeedback: async () => {
      return axios.get(ENDPOINTS.FEEDBACK.ALL, {
         headers: {
            Authorization: `bearer ${sessionStorage.getItem("user-token")}`,
         },
      });
   },
   getFeedBackByContributionId: async (filter: string) => {
      return axios.get(ENDPOINTS.FEEDBACK.ALL, {
         headers: {
            Authorization: `bearer ${sessionStorage.getItem("user-token")}`,
         },
         params: { filters: filter },
      });
   },
   postFeedback: async (data: IUploadFeedback) => {
      const userToken = sessionStorage.getItem("user-token");
      return await axios.post(ENDPOINTS.FEEDBACK.ALL, data, {
         headers: {
            Authorization: `bearer ${userToken}`,
         },
      });
   },
};
