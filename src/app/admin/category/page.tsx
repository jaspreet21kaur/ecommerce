"use client"
import axios from 'axios'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminRoutes } from '@/app/services/Api Routes'
import { categoryschema } from '@/app/schema/signschema'
import { createcategoryAPI } from '@/app/services/api/admin/category'



let val={
    categoryName:"",
    categoryDescription:''

}
const page = () => {
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
        router.replace("/")
    }
    const {values,touched,errors,handleBlur,handleChange,handleSubmit}=useFormik({
       initialValues:val,
       validationSchema:categoryschema,
       onSubmit:async(values,action)=>{
          console.log(values)
          const response=await createcategoryAPI(values)
          console.log(response)
          if(response?.status===200 || response?.status===201){
            action.resetForm()
            toast.success("Category created sucessfully")
          }else{
            toast.error("Network error")
          }
       }
    })
  return (
    <>
    <div>
    <span>Add category</span>
    <Link href={"/admin"}>
    <button>Home</button>
    </Link>
  
    </div>

    <div>
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Catgory name</label>
            <input type="text" placeholder='Enter name' name='categoryName' required value={values.categoryName} onChange={handleChange} onBlur={handleBlur}/>
             {errors.categoryName && touched.categoryName ? <p>{errors.categoryName}</p> : null}
        </div>
        <div>
            <label htmlFor="description">Catgory Description</label>
            <input type="text" placeholder='Enter description seprated by commas' name='categoryDescription' required value={values.categoryDescription} onChange={handleChange} onBlur={handleBlur}/>
             {errors.categoryDescription && touched.categoryDescription ? <p>{errors.categoryDescription}</p> : null}
        </div>
        <button type='submit'>Add category</button>
    </form>
    </div>
    <ToastContainer/>
    </>
   
  )
}

export default page