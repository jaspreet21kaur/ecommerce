
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
        // console.log(isLoginData?.token)
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
    <div className='flex justify-center items-center flex-col m-4 p-4 gap-3'>
      <div className='bg-gray-50 p-10 rounded-md'>
      <form onSubmit={handleSubmit} >
        <div className='flex gap-2 flex-col p-3 m-3'>
          <label htmlFor="email" className='text-xl font-bold'>Email <span className='text-red-400'>*</span></label>
          <input type="email"className='px-4 py-3 shadow-md rounded-md' placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div  className='flex gap-2 flex-col p-3 m-3'>
          <label  className='text-xl font-bold' htmlFor="password">Password <span className='text-red-400'>*</span></label>
          <input className='px-4 py-3 shadow-md rounded-md w-full' type="password" placeholder="Enter password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p className='text-red-400'>{error}</p>
        <p className='text-red-400'>{err}</p>
        <button type="submit" className='m-3 mr-3 px-3 py-2 bg-green-600 rounded-md w-[95%] text-white'>Login</button>
        <div className='flex flex-col justify-center items-center'>
        <Link href={'/forgotpassword'}>
          <p className=' text-md  text-blue-500 underline'>Forgot password ?</p>
        </Link>
        <p className='font-light'>
          Don't have an account? 
          <Link href={'/sign'}>
            <button className='bg-blue-600 text-white rounded-md px-2 py-1 mx-2 text-md'>Sign in</button>
          </Link>
        </p>

        </div>
      </form>
      </div>
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

