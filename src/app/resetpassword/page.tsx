"use client"
import AuthRedirect from '@/components/AuthRedirect'
import axios from 'axios'
import { error } from 'console'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import styles from './styles.module.css'

export const schema=Yup.object({
  // email:Yup.string().email().required("Email is required"),
  otp:Yup.string().min(4).max(4).required("Enter valid otp"),
  newPassword: Yup.string()
  .required("Enter password")
  .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have at least 8 characters, one uppercase, one lowercase, one digit, and one special character (#?!@$%^&*-)"
  ),
  confirmPassword:Yup.string().required("Confirm password").nullable().oneOf([Yup.ref("newPassword"),null],"Password should match")
})


const resetpassword = () => {
  const router=useRouter()
  const reset=localStorage.getItem("reset")
  if(!reset){
    router.replace("/")
  }
  

    const [remainingTime, setRemainingTime] = useState(120);
   let email=JSON.parse(localStorage.getItem("email")) 
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
      initialValues: {
        email:email,
        otp: "",
        newPassword: "",
        confirmPassword: ""
    },
      validationSchema:schema,
      onSubmit:(values,action)=>{
             console.log(values)
             
             const  forgot = async() => {
              await axios.
              post("https://cart-app-ibuu.onrender.com/api/v1/user/reset-password",values,{
                headers:{
                  "Content-Type":'application/json'
                }
              })
              .then((res)=>{
               console.log(res.data.message)
               let response=res?.data?.message
               if(response==="Invalid OTP or OTP expired"){
                toast.error(response)
               }else if(response==="Email not found"){
                toast.error(response)
               }
               else{
                 localStorage.removeItem("reset")
                 console.log("sucessfull")
                 toast.success("Password updated Successfully")
                 action.resetForm()
                 setTimeout(() => {
                   router.replace("/")           
                 }, 3000);

               }
        
            }).catch((error)=>{
              toast.error("Please try again after some time")
              console.log(error?.response?.data?.message)
            
              })
            };
            forgot()
      }
    })
    useEffect(() => {
      const interval = setInterval(() => {
          setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if (remainingTime === 0) {
          router.replace("/")
      }
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
    return (
      <>
         <div className={styles.container}>
      <div className={styles.resetPasswordForm}>
        <h1>Reset your password</h1>
        <p>OTP valid till: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email" readOnly name="email" value={email} required />
            {/* {errors.email && touched.email && <div className={styles.error}>{errors.email}</div>} */}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="otp">Otp</label>
            <input type="text" placeholder="Enter Otp" name="otp" value={values.otp} onChange={handleChange} onBlur={handleBlur} required />
            {errors.otp && touched.otp && <div className={styles.error}>{errors.otp}</div>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New password</label>
            <input type="password" placeholder="New password" name="newPassword" value={values.newPassword} onChange={handleChange} onBlur={handleBlur} required />
            {errors.newPassword && touched.newPassword && <div className={styles.error}>{errors.newPassword}</div>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input type="password" placeholder="Confirm password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} required />
            {errors.confirmPassword && touched.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
          </div>
          <p>Otp not received? <button className={styles.otp} onClick={() =>{ localStorage.removeItem("reset")
        localStorage.removeItem("email")}}><Link href={'/forgotpassword'}>Get OTP</Link></button></p>
          <button type="submit" className={styles.submitButton}>Reset password</button>
          <ToastContainer />
        </form>
      </div>
    </div>
      </>
  );
};

export default resetpassword