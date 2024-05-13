
"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthRedirect from '@/components/AuthRedirect';
import { checkUserRole } from '../utils/authUtils';
import {useRouter} from 'next/navigation'
// import styles from "src/app/styles.module.css"

const Page = () => {
 const router=useRouter()
   localStorage.removeItem("reset")
   localStorage.removeItem("email")
  const [err,seterr]=useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("All fields are required");
    } else if (!isValidEmail(email)) {
      setError("Invalid email");
    } else if (password.length < 4) {
      setError("Password must be at least 4 characters");
    } else {
      setError("");
      let values = {
        email: email,
        password: password
      };
      
      const fetchdata=async()=>{
        await axios.
        post("https://cart-app-ibuu.onrender.com/api/v1/login/user-login",values)
        .then((res)=>{
          seterr('')
          localStorage.setItem("userdata",JSON.stringify(values))
          localStorage.setItem("token",res.data.token)
          const token = localStorage.getItem("token");
            if (token) {
              const role = checkUserRole(); 
              if (role === "admin") {
                router.replace('/admin');
              } else if (role === "user") {
                router.replace('/user');
              }
            }
      }).catch((error)=>{
          seterr(error?.response?.data?.message)
        })

       
      }
     fetchdata()
      
    }
  };
 
  return (
    <>
    <AuthRedirect/>
    <div >
      <h1>Welcome to the web page</h1>
      <form onSubmit={handleSubmit} >
        <div >
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p >{error}</p>
        <p >{err}</p>
        <button type="submit">Login</button>
        <Link href={'/forgotpassword'}>
          <p >Forgot password ?</p>
        </Link>
        <p >
          Don't have an account? 
          <Link href={'/sign'}>
            <button >Sign in</button>
          </Link>
        </p>
      </form>
    </div>
       
    </>
  );
};

export function isValidEmail(email: string) {
  let regex = new RegExp(/\S+@\S+\.\S+/);
  return regex.test(email);
}

export default Page;
