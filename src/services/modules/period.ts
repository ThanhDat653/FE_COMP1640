import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { ICreatePeriod, IUpdatePeriod } from "../../types/period.type";


export default {
    getPeriod: async() => {
        return await axios.get(ENDPOINTS.PERIOD.ALL);
    },
    createPeriod: async(data: FormData) => {
        const userToken = sessionStorage.getItem("user-token");
        return await axios.post(ENDPOINTS.PERIOD.ALL, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            }
        })
    },
    updatePeriod: async(data: FormData, id: string) => {
        const userToken = sessionStorage.getItem("user-token");
        return await axios.put(`${ENDPOINTS.PERIOD.ALL}/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
            }
        })
    }
}