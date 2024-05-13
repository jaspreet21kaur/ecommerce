import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from "../../axiosInstance"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { UserType, addToCartType } from '@/app/types/userTypes';
import { apiRoutes, cartRoutes } from '../../Api Routes';


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
    const response=await axios.get(apiRoutes.getUsers)
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



