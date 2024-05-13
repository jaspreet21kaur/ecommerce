
"use client"
import Link from 'next/link';
import React, {useState } from 'react';
import AuthRedirect from '@/components/AuthRedirect';
import { checkUserRole } from '../utils/authUtils';
import {useRouter} from 'next/navigation'
import { UserType } from './types/userTypes';
import { loginUserAPI} from './services/api/user';import auth from '@/config/auth';
import { ToastContainer, toast } from 'react-toastify';
;

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
      
      const fetchdata=async(values:UserType)=>{
        const isLoginData = await loginUserAPI(JSON.stringify(values))
        console.log(isLoginData.token)
        if (isLoginData?.status === 200) {
          seterr('')
         localStorage.setItem("userdata",JSON.stringify(values))
          localStorage.setItem(auth.storageTokenKeyName, isLoginData.token)
          const token = localStorage.getItem("token");
           if(token) {
           const role = checkUserRole(); 
          if (role === "admin") {
          router.replace('/admin');
          }else if (role === "user") {
           router.replace('/user');
           }
          }
          return isLoginData;
        } else if (isLoginData?.status === 400) {
          const { message } = isLoginData
          toast.error(message);
          return false;
        }
    
      }
       fetchdata(values)
      
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
       <ToastContainer/>
    </>
  );
};

export function isValidEmail(email: string) {
  let regex = new RegExp(/\S+@\S+\.\S+/);
  return regex.test(email);
}

export default Page;
function fetchdata(values: any) {
  throw new Error('Function not implemented.');
}

