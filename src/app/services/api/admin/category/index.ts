import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../../axiosInstance"
import { adminRoutes } from '@/app/services/Api Routes';
import { category, createcategory, createsubcategoty } from '@/app/types/userTypes';
import axios from 'axios';



const config = {
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json'
    }
  };
export const createcategoryAPI=async(val:createcategory)=>{
    try{
        const response=await axiosInstance.post(adminRoutes.createcategory,val)
        return response?.data
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}

export const createsubcategoryAPI=async(val:createsubcategoty)=>{
    try{
        const response=await axiosInstance.post(adminRoutes.createsubcategory,val)
        return response?.data
       
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}





