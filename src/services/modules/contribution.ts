/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { IParamsAxios } from "../../types/filter.type";
import { IApproval, IPublished } from "../../types/contribution.type";

const userToken = () => {
   return sessionStorage.getItem("user-token");
};

export default {
   contribute: async (data: FormData) => {
      return await axios.post(ENDPOINTS.CONTRIBUTION.ALL, data, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
      });
   },
   getContributionByStatus: (filter: string) => {
      return axios.get(ENDPOINTS.CONTRIBUTION.FILTER, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
         params: { filters: filter },
      });
   },
   getContributionById: async (id: string) => {
      return await axios.get(`${ENDPOINTS.CONTRIBUTION.ALL}/${id}`);
   },
   getContributionByPagination: async (endpoint: string) => {
      return await axios.get(endpoint);
   },
   getContributionList: async (params: IParamsAxios) => {
      return await axios.get(ENDPOINTS.CONTRIBUTION.ALL, {
         params,
      });
   },
   getContributionListWithToken: async (params: IParamsAxios) => {
      return await axios.get(ENDPOINTS.CONTRIBUTION.ALL, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
         params,
      });
   },
   getZipAllContributions: async () => {
      return await axios.get(ENDPOINTS.CONTRIBUTION.ZIP_ALL, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
         responseType: "blob",
      });
   },
   updateContribution: async (data: FormData, id: string) => {
      return await axios.put(`${ENDPOINTS.CONTRIBUTION.ALL}/${id}`, data, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
      });
   },
   approve: async (data: IApproval) => {
      return await axios.put(`${ENDPOINTS.CONTRIBUTION.APPROVED}`, data, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
      });
   },
   publish: async (data: IPublished) => {
      return await axios.put(`${ENDPOINTS.CONTRIBUTION.PUBLISHED}`, data, {
         headers: {
            Authorization: `Bearer ${userToken()}`,
         },
      });
   },
};
