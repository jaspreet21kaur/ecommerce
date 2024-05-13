"use client"
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import { addToCartAPI } from '@/app/services/api/user'
import { cartRoutes } from '@/app/services/Api Routes'

interface Product {
  productPrice: ReactNode
  productDescription: ReactNode
  productImg: string | undefined
  _id: string;
  productName: string;

}
const page = () => {
    const {id}=useParams()
    const cartId=id
    const router=useRouter()
  const token=localStorage.getItem("token")
  if(!token){
    router.replace("/")
  }
  const [data, setdata] = useState<Product | null>(null);
    const [name,setname]=useState("")
    const [already,setalready]=useState(false)
    const getbyproductId=async()=>{
      const token=localStorage.getItem("token")
      if(token){
       await axios
        .get("https://cart-app-ibuu.onrender.com/api/v1/admin/get-product/"+cartId,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        .then((res)=>{
          setdata(res?.data?.getProduct)
          setname(res?.data?.getProduct?.productName)
          cartitems()
        }).catch((error)=>{
          console.log(error)
        })
      }

    }
    const cartitems = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("https://cart-app-ibuu.onrender.com/api/v1/user/get-cart/", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          
          // console.log(res?.data?.data?.cartItems)
          const cartItemsWithProductDetails = res?.data?.data?.cartItems.filter((el: { productDetails: any }) => el.productDetails);

          cartItemsWithProductDetails?.map((data:any)=>{
            // console.log("cartItemsWithProductDetails---------",data.productDetails.productId)
            if(cartId === data.productDetails.productId ){
              setalready(true);
            }
          })

        } catch (error) {
          console.log(error);
        }
      }
    };
    
    useEffect(()=>{
      getbyproductId()
      cartitems()
    },[])
    const addtobag=()=>{
        //  console.log("addded")
         const token=localStorage.getItem("token")
         let val={
          productId:cartId,
          productName:name
         }
         if(token){
          axios
          .post(process.env.NEXT_PUBLIC_API_BASE_URL+cartRoutes.addToCart,
          val,
          {
            headers:{
              'Authorization':`Bearer ${token}`
            }
          }).then((res)=>{
            cartitems()
          }).catch((error)=>{
            console.log(error)
          })
         }

    }

  return (
    <>
    
      <div >
        <h1>{name}</h1>
        <div >
        <Link href={'/user/cart'}>
          <button >Cart</button>
          </Link>
          <Link href={'/user'}>
          <button >Home</button>
          </Link>      
        </div>
      </div>


      {data && (
  <div >
    <div key={data._id}>
      <div>
     <img  src={data.productImg} alt={data.productName} />
      <div >
      {already ? <Link  href={'/user/cart'}>Go to bag</Link> : <button onClick={addtobag}>Add to cart</button>}
        <button >Buy now</button>
      </div>
      </div>
     <div >
      <h2>{data.productName[0].toUpperCase()+data.productName.slice(1)}</h2>
      <div >
          <p>{data.productDescription}</p>
          <h2>Price-:${data.productPrice}</h2>
          <div>Grab it now and get best deals !</div>
          <h4>✔️ Best Quality</h4>
          <h4>✔️ Best Price</h4>
          <h4>✔️ Eligble for offers</h4>
          <h4>✔️ Best Deal</h4>
      </div>
     </div>
    </div>
  </div>
)}


    </>
  )
}

export default page