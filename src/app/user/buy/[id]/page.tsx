"use client"
import axios from 'axios'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';



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
    const [data, setdata] = useState<ApiResponse>({ cartItems: [], totalCartAmount: 0 });
    console.log(id)
    const cartid=id
    const getcatbyid=()=>{
        console.log(cartid)
        const token=localStorage.getItem("token")
        if(token){
            axios.get("https://cart-app-ibuu.onrender.com/api/v1/user/get-cart-item/"+cartid,{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then((res)=>{
                console.log(res?.data?.data)
                setdata(res?.data?.data)
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
    useEffect(()=>{
        getcatbyid()
    },[])

    const  updatequantity = async(id:string,name:string,cartid:string) => {
        toast.success(`
        Product ${name}-- quantity increased by 1`)
        let val={
          productId:id,
          productName:name,
          quantity:1
        }
  
        const token=localStorage.getItem("token")
        await axios.
        patch("https://cart-app-ibuu.onrender.com/api/v1/user/update-cart-item/"+cartid,val,{
          headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":'application/json'
      
          }
        })
        .then((res)=>{
          getcatbyid()
         console.log(res)
         
      }).catch((error)=>{
        
        console.log(error?.response?.data?.message)
      
        })
      };

      const handledelete=(id:string,name:string)=>{
        console.log(id)
         let removeid=id
        toast.success(`Product ${name}--quantity decreased by 1`)
        const token=localStorage.getItem("token")
        axios
        .delete("https://cart-app-ibuu.onrender.com/api/v1/user/remove-cart-item/"+removeid,{
            headers:{
                "Authorization": `Bearer ${token}`
              }
        })
        .then((res)=>{
           
            console.log(res)
            getcatbyid()
      }).catch((error)=>{
        // fetchdata()
        console.log(error?.response?.data?.message)
        })
     }
  return (
    <>
    <Link href={'/user'}>
    <button>Home</button>
    </Link>
    <Link href={'/user/cart'}>
    <button>Cart</button>
    </Link>
    <div>
  {data.cartItems.map((el, index) => (
    <div key={index}>
      <div>
        <h1>Description</h1>
        <h1>{el.productDetails.productName}</h1>
        <p>{el.productDetails.productDescription}</p>
        <img src={el.productDetails.productImage} width="50%" height="50%" alt={el.productDetails.productName} />
      </div>
      <p>
        Quantity :
        <button disabled={el.quantity === 1} onClick={() => handledelete(el._id, el.productDetails.productName)}>-</button>
        {el.quantity}
        <button onClick={() => updatequantity(el.productDetails.productId, el.productDetails.productName, el._id)}>+</button>
      </p>
    </div>
  ))}
  <div>
    <h2>Total Cart Amount</h2>
    <h3>{data.totalCartAmount}</h3>
  </div>
</div>

    <div>
        <div>
            <label htmlFor="method">Select Payment method</label>
            <select name="paymethod"  >
                <option value="Gpay">Gpay</option>
                <option value="PhoneP">PhoneP</option>
                <option value="LazyPay">LazyPay</option>
                <option value="Credit">Credit</option>
            </select>
        </div>
        {data.cartItems.map((el,index)=>(

        <Link href={`/user/pay/${el._id}`}>
          <button >Pay now</button>
        </Link>
        ))}
    </div>
    </>
    
  )
}

export default page