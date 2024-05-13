import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../../axiosInstance"
import { adminRoutes } from '@/app/services/Api Routes';
import { formdata } from '@/app/types/userTypes';
import { AxiosRequestConfig } from 'axios';

export const GetAllProductAPI = async () =>{
    try {
      const response = await axiosInstance.get(adminRoutes.getAllProducts)
      // console.error("response Error:", response);
      return response.data;
    } catch (err:any) {
      // console.error("GetAllProductAPI Error:", err.response?.data?.message,err);
      toast.error(err?.response?.data?.message || err?.message)
    }
}


export const Getallcategories=async()=>{
    try{
        const response=await axiosInstance.get(adminRoutes.getallcategories)
        return response.data
        // console.log("respose------",response.data)
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}


export const Getallsubcategories=async(id:string)=>{
    try{
        const response=await axiosInstance.get(adminRoutes.getallsubcategories)
        return response.data
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}

export const getcategorybyidAPI=async(id:string)=>{
    try{
        const response=await axiosInstance.get(adminRoutes.getcategory+id)
        return response.data
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}


export const deleteadminproductApi=async(id:string)=>{
    try{
        const response=await axiosInstance.delete(adminRoutes.deleteadminproduct+id)
        return response?.data
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}

const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  };


export const adminCreateProductApi=async(data?:formdata)=>{
      try{
        const response=await axiosInstance.post(adminRoutes.createproduct,data,config)
        console.log("createapi=-----------",response.data)
      }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}
