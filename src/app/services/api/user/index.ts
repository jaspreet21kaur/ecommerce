import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../axiosInstance"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { UserType, addToCartType, payment, updatequantity } from '@/app/types/userTypes';
import { adminRoutes, apiRoutes, cartRoutes, payments } from '../../Api Routes';


const config = {
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
};


export const loginUserAPI = async (params?: UserType|string) =>{
  try {
    const response = await axiosInstance.post(apiRoutes.userLogin, params)
    // console.log(apiRoutes.userLogin,"----------------",response.data)
    return response.data;
  } catch (err:any) {
    console.error("Login Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}


export const registerUserAPI = async (params?: UserType|string) =>{
  try {
    const response = await axios.post(apiRoutes.registerUser, params,config)
    console.log(response)
    return response.data
  } catch (err:any) {
    console.error("Register Error:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
    // throw error;
  }
}


export const getuserApi=async()=>{
  try{
    const response=await axiosInstance.get(apiRoutes.getUsers)
    return response.data
  }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
    return err?.response?.data?.message || err?.message
  }
}



export const addToCartAPI = async (params?: addToCartType) =>{
  try {
    const response = await axiosInstance.post(cartRoutes.addToCart, params)
    return response.data;
  } catch (err:any) {
    console.error("add to cartError:", err.response?.data?.message,err);
    toast.error(err?.response?.data?.message || err?.message)
  }
}


export const getcartItemAPI=async(id:string|string[])=>{
   try{
    const response=await axiosInstance.get(cartRoutes.getItemCart+id)
    return response?.data
   }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
   }
}

export const updatequantityAPI=async(id:string|string[],val:updatequantity)=>{
  try{
    const response=await axiosInstance.patch(cartRoutes.updateItemCart+id,val)
    // console.log("response-----------",response)
    return response?.data
  }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
   }
}

export const  deleteQuantityAPI=async(id:string)=>{
   try{
    const response=await axiosInstance.delete(cartRoutes.removeCartQuantity+id)
    return response?.data
   }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
   }
}

export const getallcartAPI=async()=>{
  try{
    const response=await axiosInstance.get(cartRoutes.getAllCart)
    return response?.data
  }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
   }
}

export const deleteCartitemAPI=async(id:string)=>{
  try{
    const response=await axiosInstance.delete(cartRoutes.removeCartItem+id)
    return response?.data
  }catch(err:any){
    toast.error(err?.response?.data?.message || err?.message)
   }
}


export const getProductByIdApi=async(id:string|string[])=>{
       try{
        const response=await axiosInstance.get(adminRoutes.getProductById+id)
        return response?.data
       }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
       }
}



