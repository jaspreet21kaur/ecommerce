import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../axiosInstance"
import 'react-toastify/dist/ReactToastify.css';
import { payment } from '@/app/types/userTypes';
import { payments } from '../../Api Routes';

export const createPaymentAPI = async (data?: payment) => {
    try {
        const response = await axiosInstance.post(payments.createPayment,data);
        // console.log("response", response.data)
        return response?.data
      
    } catch (err:any) {
        console.error("error------------------", err);
        toast.error(err?.response?.data?.message || err?.message || "An error occurred");
    }
};


export const getallpaymentdetailAPI=async()=>{
    try{
        const response=await axiosInstance.get(payments.allPayment)
        return response?.data
    }catch (err:any) {
        console.error("error------------------", err);
        toast.error(err?.response?.data?.message || err?.message || "An error occurred");
    }
}