import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../../axiosInstance"
import { adminRoutes } from '@/app/services/Api Routes';
import { formdata } from '@/app/types/userTypes';
import axios, { AxiosRequestConfig } from 'axios';
import auth from '@/config/auth';
import { headers } from 'next/headers';

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

const token=localStorage.getItem(auth.storageTokenKeyName)

export const adminCreateProductApi=async(formdata:any)=>{
      try{
        const response=await axios.post(adminRoutes.createproduct,formdata,{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log("createapi=-----------",formdata)
      }catch(err:any){
        console.log("createapi-----------",formdata,err)
        toast.error(err?.response?.data?.message || err?.message)
    }
}
