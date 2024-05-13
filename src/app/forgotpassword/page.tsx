"use client"
import AuthRedirect from '@/components/AuthRedirect'
import axios from 'axios'
import { error } from 'console'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'
import Link from 'next/link'

const forgotpassword = () => {
    const router=useRouter()
     const token = localStorage.getItem("token");
     const reset=localStorage.getItem("reset")
     if(!token && !reset){
        router.replace("/forgotpassword")
      }else if(reset){
            router.replace("/resetpassword")
      }
      else{
        AuthRedirect()
      }
 

    const [email,setemail]=useState("")
    const  [error,seterror]=useState("")

    
    const handlesubmit=(e:any)=>{
        e.preventDefault()
        if(email===""){
            toast.error("Enter email")
        }else if(!isvalidEmail(email)){
            toast.error("Invalid email")
        }
        else{
            const  forgot = async() => {
                let val={
                 email:email
                }
                await axios.
                post("https://cart-app-ibuu.onrender.com/api/v1/user/forget-password",val,{
                  headers:{
                    "Content-Type":'application/json'
                  }
                })
                .then((res)=>{
                 console.log(res.data.message)
                 const response=res?.data?.message
                 if(response==="Email not found"){
                     seterror(response)
                 }else{
                    const yes="yes"
                    localStorage.setItem("reset",yes)
                    localStorage.setItem("email",JSON.stringify(email))
                    setemail("")
                      seterror("")
                      console.log("replacing")
                      router.replace("/resetpassword")
                 }
                 
              }).catch((error)=>{
                console.log(error?.response?.data?.message)
              
                })
              };

              forgot()
        }

    }
  
  return (
    <>
      <div className={styles.container}>
      <div className={styles.resetPasswordForm}>
        <h1>Enter email to reset password</h1>
        <p>After entering email you will receive an OTP on your mentioned email</p>
        <form onSubmit={handlesubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setemail(e.target.value)} required />
          </div>
          <button type="submit"  className={styles.submitButton}>Next</button>
        <Link href={"/"} >
        <button className={styles.goButton}>Go back</button>
        </Link>
         
          {error ? <p className={styles.error}>{error}</p> : null}
        </form>
      </div>
    </div>
        <ToastContainer/>
    </>
   
  )
}

export function isvalidEmail(mail:string){
    let regex = new RegExp(/\S+@\S+\.\S+/);
    return regex.test(mail)
 
 }
 

export default forgotpassword