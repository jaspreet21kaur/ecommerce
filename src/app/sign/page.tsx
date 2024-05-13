"use client"
import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import Link from 'next/link';
import AuthRedirect from '@/components/AuthRedirect';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './styles.module.css'

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  
};


export const schema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
 
});

const Sign =() => {
  localStorage.removeItem("reset")
  localStorage.removeItem("email")
  let [err,seter]=useState("")
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
      router.replace("/sign")
    }else{
      AuthRedirect()
    }
    const [show,setshow]=useState(false)
    const [msg,setmsg]=useState("")
    const [error,seterror]=useState("")
const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit:(values, action) => {
            seterror("")
            fetchdata()
   
}})

const fetchdata=async()=>{
  await axios.
  post("https://cart-app-ibuu.onrender.com/api/v1/user/register",values)
  .then((res)=>{
    seter('')
    // console.log(res.data.message
    seter(res?.data?.message)
   router.replace("/")
   localStorage.setItem("user",JSON.stringify(values))
   
}).catch((error)=>{
   setshow(false)
  // console.log(error?.response?.data?.message)
    seter(error?.response?.data?.message)
  })
}
const check=()=>{
  if(localStorage.getItem("user")){
    setshow(true)
  }else{
   setshow(false)
  }

}
useEffect(()=>{
  check()
},[])

  return (
    <div className={styles.container}>
    <div className={styles.loginForm}>
      <h1>Welcome to the web page</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" placeholder="Enter full name" name="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} />
          {errors.fullName && touched.fullName ? <p className={styles.error}>{errors.fullName}</p> : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {errors.email && touched.email ? <p className={styles.error}>{errors.email}</p> : null}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {errors.password && touched.password ? <p className={styles.error}>{errors.password}</p> : null}
        </div>
        <p className={styles.error}>{error}</p>
        <p className={styles.error}>{err}</p>
        <button type="submit" className={styles.submitButton}>Sign up</button>
        <Link href={'/'}>
          <button className={styles.loginButton}>Login</button>
        </Link>
      </form>
    </div>
  </div>
  );
}

export default Sign;
