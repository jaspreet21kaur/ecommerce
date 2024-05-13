"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthRedirect from '@/components/AuthRedirect'
import styles from './styles.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'


var val={}
let n=1
const page = () => {
    const router=useRouter()
    const [profile, setprofile] = useState<boolean>(false);
    const [data, setData] = useState([]);
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const handledelete=()=>{
        localStorage.removeItem("userdata")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("id")
        router.replace("/")    
    }
  
    const fetchproducts=()=>{
      const token=localStorage.getItem("token")
      axios
      .get("https://cart-app-ibuu.onrender.com/api/v1/admin/get-all-products",{
          headers:{
              "Authorization": `Bearer ${token}`
            }
      })
      .then((res)=>{
        setData(res?.data?.data?.products)
       
  
    }).catch((error)=>{
      console.log(error?.response?.data?.message)
      })
  }
useEffect(()=>{
   fetchproducts()
  const token=localStorage.getItem("token")
  axios
  .get("https://cart-app-ibuu.onrender.com/api/v1/user/get-user",{
      headers:{
          "Authorization": `Bearer ${token}`
        }
  })
  .then((res)=>{
    setname(res?.data?.userData?.fullName)
    setemail(res?.data?.userData?.email)

}).catch((error)=>{
  console.log(error?.response?.data?.message)
  })

 
},[])
 const showdetail=()=>{
  console.log("show")
 }

const addcart = async() => {
  console.log(val)
  const notify = () => toast.success("Product added successfully");
  const token=localStorage.getItem("token")
  await axios.
  post("https://cart-app-ibuu.onrender.com/api/v1/user/add-to-cart",val,{
    headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":'application/json'

    }
  })
  .then((res)=>{
    notify()
   console.log(res)
   
}).catch((error)=>{
  
  console.log(error?.response?.data?.message)

  })
};
  
  return (
      <>
      <AuthRedirect/>
      <div className={styles.container}>
      {
            profile && (
                <div className={styles.rightdiv}>
                    <div>
                    <p>Name : {name}</p>
                    <p>Email : {email}</p>
                    </div>
                    <button onClick={handledelete}>Logout</button>
                    <button onClick={()=>setprofile(false)}>Cancel</button>
                </div>
            )
      }
      <div className={styles.header}>
        <h1>Welcome {name}!</h1>
        <div className={styles.navigation}>
          <button>♡</button>
          <Link href={'/user/cart'}>
          <button >Cart</button>
          
          </Link>
          <button onClick={()=>setprofile(true)}>Profile</button>       
        </div>
      </div>
      </div> 
     <div>
     <div>
      <h2>All Products</h2>
      <div className={styles.containerpro}>
      {data.map((product: {
        _id: string
        productDescription: string ,productName: string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; productPrice: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; productImg: string | undefined 
       }, index: React.Key | null | undefined) => (
            <div key={index} className={styles.card} >
              
            <div>
                <label htmlFor="name">Product name</label>
                <Link href={`/user/item/${product._id}`}>
                <h4>{product.productName}</h4>
                
                </Link>
            </div>
            <div>
                <label htmlFor="price">Product Price</label>
                <h4>{product.productPrice}</h4>
            </div>
            <div>
                <label htmlFor="img">Image</label>
                <Link href={`/user/item/${product._id}`}>
                <img src={product.productImg} alt="" onClick={showdetail}/>
                </Link>
            </div>
            <button onClick={()=>{
              val={
                productId:product._id,
                productName:product.productName
              }
              addcart()
            }}>Add to bag</button>
            
            </div>
        ))}
        </div>
        </div>
        <ToastContainer />
    </div>
    </>
  )
}

export default page