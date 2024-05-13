"use client"
import axios from 'axios'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { lcov } from 'node:test/reporters'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let val={
  categoryName:"",
  subCategoryName:"",
  subCategoryDescription:""
}


interface category{
  _id: string,
  categoryName: string
  categoryDescription: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number

}
const page = () => {
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
        router.replace("/")
    }
    const [categories,setcategories]= useState<category[]>([]);

    const schema=Yup.object({
      categoryName:Yup.string().required("Select a catergory first"),
      subCategoryName:Yup.string().max(30).required("Please enter subcategory name"),
      subCategoryDescription:Yup.string().max(40).required("Please enter the descritpion ")
    
    })
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
       initialValues:val,
       validationSchema:schema,
       onSubmit:(values,action)=>{
        console.log(values)
        const token=localStorage.getItem("token")
        if(token){
          axios
          .post("https://cart-app-ibuu.onrender.com/api/v1/admin/create-sub-category",values,
          {
            headers:{
              'Authorization':`Bearer ${token}`
            }
          }).then((res)=>{
            console.log(res)

            action.resetForm()
            toast.success("Subcategory created")
          }).catch((error)=>{
            console.log(error)
          })
        }
       }
    })

    const category=()=>{
      const token=localStorage.getItem("token")
      if(token){
        axios
        .get("https://cart-app-ibuu.onrender.com/api/v1/admin/get-all-categories",{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        .then((res)=>{
          console.log(res?.data?.data)
          setcategories(res?.data?.data)
        }).catch((error)=>{
          console.log(error)
        })
      }
    }
    useEffect(()=>{
      category()
    },[])
  
  return (
    <>
    <div>
    <h1>Add sub  category</h1>
    <Link href={"/admin"}>
    <button>Home</button>
    </Link>
  
    </div>
      <div>
        <form onSubmit={handleSubmit} >
          <div>
            <label htmlFor="name">Category</label>
            <select name="categoryName" value={values.categoryName} onChange={handleChange} onBlur={handleBlur}>
              <option value="">Please Select a category</option>
              {categories.map((option, index) => (
                <option key={index} value={option.categoryName} data-id={option._id}>
                  {option.categoryName}
                </option>
              ))}
            </select>
            {errors.categoryName && touched.categoryName ? <p>{errors.categoryName}</p> : null}
          </div>
          <div>
            <label htmlFor="name">Subcategory name</label>
            <input type="text" placeholder='Enter subcategory name' name='subCategoryName' value={values.subCategoryName} onChange={handleChange} onBlur={handleBlur}/>
            {errors.subCategoryName && touched.subCategoryName ? <p>{errors.subCategoryName}</p> : null}
          </div>
          <div>
            <label htmlFor="description">Subcategory Description</label>
            <input type="text" placeholder='Enter subcategory description' name='subCategoryDescription' value={values.subCategoryDescription} onChange={handleChange} onBlur={handleBlur}/>
            {errors.subCategoryDescription && touched.subCategoryDescription ? <p>{errors.subCategoryDescription}</p> : null}
          </div>
          <button type='submit'>Add subcategory</button>
        </form>
      </div>
      <ToastContainer/>
    </>
  )
}

export default page