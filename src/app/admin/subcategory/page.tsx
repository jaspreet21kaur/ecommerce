"use client"
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { category } from '@/app/types/userTypes'
import { subcategoryschema } from '@/app/schema/signschema'
import { createsubcategoryAPI } from '@/app/services/api/admin/category'
import { Getallcategories } from '@/app/services/api/admin/products'

let val={
  categoryName:"",
  subCategoryName:"",
  subCategoryDescription:""
}

const page = () => {
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
        router.replace("/")
    }
    const [categories,setcategories]= useState<category[]>([]);

    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
       initialValues:val,
       validationSchema:subcategoryschema,
       onSubmit:async(values,action)=>{
        console.log(values)
        const response=await createsubcategoryAPI(values)
        console.log(response)
        if(response?.status===201 || response.status===200){
          action.resetForm()
         toast.success("Subcategory created")
        }else{
          toast.error("Network error")
        }
       }
    })

    const category=async()=>{
      const response=await Getallcategories()
      console.log(response)
      if(response?.status===200){
        setcategories(response?.data)
      }else{
        toast.error("Network error")
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