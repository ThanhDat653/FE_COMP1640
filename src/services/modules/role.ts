/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
   getRoles: async () => {
      return await axios.get(ENDPOINTS.ROLE);
   },
};
