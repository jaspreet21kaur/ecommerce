import { ToastContainer, toast } from 'react-toastify';
import { adminRoutes, apiRoutes } from '@/app/services/Api Routes';
import axiosInstance from '../../axiosInstance';
import { forgotpassword, resetpassword } from '@/app/types/userTypes';
import axios from 'axios';


const config = {
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
export const forgotpasswordAPI=async(val:forgotpassword)=>{
    try{
        const response=await axios.post(apiRoutes.forgotpassword,val,config)
        return response?.data
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}
export const resetpasswordAPI=async(val:resetpassword)=>{
    try{
        const response=await axios.post(apiRoutes.resetpassword,val,config)
        return response?.data
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}