"use client"
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'
import { resetschema } from '../schema/signschema'
import { resetpasswordAPI } from '../services/api/common'

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
      validationSchema:resetschema,
      onSubmit:async(values,action)=>{
             console.log(values)
             const response=await resetpasswordAPI(values)
             console.log(response)
             if(response?.status===200){
                  toast.success(response?.message)
                  localStorage.removeItem("reset")
                  setTimeout(() => {
                    router.replace("/")
                  }, 2000);
             }else{
              toast.error(response?.message)
             }                
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