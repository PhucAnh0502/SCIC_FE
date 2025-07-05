import axios from "axios"
import env from "../config/env"
import { toast } from "react-toastify"

export const loginToTB = async () => {
    try {
        const response = await axios.post(`${env.TB_API_PATH}/auth/login`,{
            username : "mxngocqb@gmail.com",
            password : "Thingsboard1"
        })
        if(response.status === 200){
            return response.data.token
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}