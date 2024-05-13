import { ToastContainer, toast } from 'react-toastify';
import { adminRoutes } from '@/app/services/Api Routes';
import axiosInstance from '../../axiosInstance';


export const getAdminAPI=async()=>{
    try{
        const response=await axiosInstance.get(adminRoutes.adminUsers)
        return response?.data
    }catch(err:any){
        toast.error(err?.response?.data?.message || err?.message)
    }
}
