
"use client"
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'


interface ProductDetails {
    productId: string;
    productName: string;
    productPrice: number;
    productDescription: string;
    productImage: string;
}

interface BuyerUser {
    _id: string;
    fullName: string;
    email: string;
}

interface CartItem {
    _id: string;
    buyerUserId: BuyerUser;
    productDetails: ProductDetails;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    itemPrice: number;
}

interface ApiResponse {
    cartItems: CartItem[];
    totalCartAmount: number;
}

const page = () => {
    const {id}=useParams()
    const router=useRouter()
    const token=localStorage.getItem("token")
    if(!token){
        router.replace("/")
    }
    console.log(id)
    const payId=id
    const [data, setdata] = useState<ApiResponse>({ cartItems: [], totalCartAmount: 0 });
    const getcatbyid= async()=>{
          
        const token=localStorage.getItem("token")
        if(token){
          await  axios.get("https://cart-app-ibuu.onrender.com/api/v1/user/get-cart-item/"+payId,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res?.data)
                setdata(res?.data?.data) 
                payment(res?.data?.data)               
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
   
    
    const payment = (responseData: ApiResponse) => {
        const { cartItems, totalCartAmount } = responseData;
        if (cartItems.length > 0) {
            const { _id: cartId, productDetails, quantity } = cartItems[0];
            const { productId, productName, productPrice, productDescription } = productDetails;

            const body = {
                totalProduct: [{
                    cartId,
                    productId,
                    productName,
                    productPrice,
                    productDescription,
                    productQuentity: quantity
                }],
                totalCartAmount
            };
            
            console.log(body);

            const token = localStorage.getItem("token");
            if (token) {
                axios.post("https://cart-app-ibuu.onrender.com/api/v1/user/process-payment", body, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }).then((res) => {
                    console.log(res);
                    router.replace("/user")
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }

    useEffect(() => {
        getcatbyid();
    }, []);
    return (
    
    <>
       <div>
  {data.cartItems.map((el, index) => (
    <div key={index}>
      <div>
        <h1>Payment--Succesfull</h1>
        <h1>{el.productDetails.productName}</h1>
        <p>{el.productDetails.productDescription}</p>
        <img src={el.productDetails.productImage} width="50%" height="50%" alt={el.productDetails.productName} />
      </div>
      <p>
        Quantity :
        {el.quantity}
      </p>
    </div>
  ))}
  <div>
    <h2>Total Cart Amount</h2>
    <h3>{data.totalCartAmount}</h3>
  </div>
</div>

    </>
  )
}

export default page