"use client"
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import AuthRedirect from '@/components/AuthRedirect';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css'
import { signschema } from '../schema/signschema';
import { registerUserAPI } from '../services/api/user';
import { UserType } from '../types/userTypes';
import { ToastContainer,toast } from 'react-toastify';

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  
};
const Sign =() => {
  localStorage.removeItem("reset")
  localStorage.removeItem("email")
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
      router.replace("/sign")
    }else{
      AuthRedirect()
    }
    const [show,setshow]=useState(false)
    const [error,seterror]=useState("")
const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: signschema,
    onSubmit:(values, action) => {
            seterror("")
            fetchdata(values)
   
}})

const fetchdata=async(values:UserType|string)=>{
    const register=await registerUserAPI(values)
    console.log(register.status)
    if(register?.status===201){
      router.replace("/")
      localStorage.setItem("user",JSON.stringify(values))
      return register
    }else{
      setshow(false) 
    }

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
        <button type="submit" className={styles.submitButton}>Sign up</button>
        <Link href={'/'}>
          <button className={styles.loginButton}>Login</button>
        </Link>
      </form>
    </div>
    <ToastContainer/>
  </div>
  );
}

export default Sign;
