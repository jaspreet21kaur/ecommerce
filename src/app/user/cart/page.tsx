
"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CartItems, pay, payment } from '@/app/types/userTypes'
import { deleteCartitemAPI, deleteQuantityAPI, getallcartAPI, updatequantityAPI } from '@/app/services/api/user'
import { loadStripe } from '@stripe/stripe-js'
import { createPaymentAPI } from '@/app/services/api/payment'
var removeid:string
const page:React.FC = () => {
    
    const router=useRouter()

    const [total,settotal]=useState("")
    const [data, setdata] = useState<CartItems[]>([]);
    const token=localStorage.getItem("token")
    if(!token){
        router.replace("/")
    }
    const fetchdata = async () => {
      const response=await getallcartAPI()
      console.log("cart-------",response?.data)
      if(response?.status===200){
          settotal(response?.data?.totalCartAmount)
          setdata(response?.data?.cartItems.filter((item: { productDetails: any }) => item.productDetails));
      }else{
        toast.error(response?.message)
      }
    };

    useEffect(() => {
        fetchdata();
      }, []);

  
    const  updatequantity = async(id:string,name:string,cartid:string) => {
      toast.success(`
      Product ${name}-- quantity increased by 1`)
      let val={
        productId:id,
        productName:name,
        quantity:1
      }
     const response=await updatequantityAPI(cartid,val)
     if(response?.status===200){
      fetchdata()
     }
     else{
      toast.error(response?.message)
     }
    };


      const handlequantitydelete=async(id:string,name:string)=>{
        console.log(id)
        removeid=id
        const response=await deleteQuantityAPI(id)
        if(response?.status===200){
          fetchdata()
          toast.success(`Product ${name}--quantity decreased by 1`)
        }else{
           toast.error(response?.message)
        }
     }
     const handlecartdelete=async(id:string)=>{
      const response=await deleteCartitemAPI(id)
     if(response?.status===200){
      fetchdata()
      toast.success("Deleted")
     }else{
        toast.error(response?.message)
     }
      
   }

   const buyall = async () => {
    const response = await getallcartAPI();
    console.log(response?.data);
    if (response?.status === 200) {
        const { cartItems, totalCartAmount } = response?.data;
        // console.log(cartItems);
        let totalProducts: {
            cartId: string;
            productId: string;
            productName: string;
            productPrice: number;
            productDescription: string;
            productQuantity: number;
            itemPrice:number
        }[] = [];
        if (cartItems && cartItems.length > 0) {
            cartItems.forEach((cartitem: any) => {
                const { _id: cartId, productDetails, quantity ,itemPrice} = cartitem;
                const { productId, productName, productPrice, productDescription } = productDetails;
                totalProducts.push({
                    cartId,
                    productId,
                    productName,
                    itemPrice,
                    productPrice,
                    productDescription,
                    productQuantity: quantity
                });
            });
        }
        const bodydata: payment = {
            totalProduct: totalProducts,
            totalCartAmount: totalCartAmount
        };
        console.log(bodydata)
        if (process.env.NEXT_PUBLIC_API_KEY) {
          const stripe = await loadStripe(process.env.NEXT_PUBLIC_API_KEY);
          const response=await createPaymentAPI(bodydata)
          if (response?.status === 201) {
            const session = await response
            console.log(session.sessionId);
            const result = await stripe?.redirectToCheckout({
                sessionId: session.sessionId,
               
            });
            if (result?.error) {
                
                console.error("Error redirecting to Checkout:", result.error);
            } else {
                console.log("Redirecting to Checkout...");
                
            }
        } else {
          toast.error(response?.message)
            console.error("Unexpected response status:", response?.status);
        }
        
      } else {
          console.error("NEXT_PUBLIC_API_KEY is undefined");
         
      }
    }
};


  return (
    <>
     <div className={styles.header}>
        <h1>Your cart </h1>
        <div className={styles.navigation}>
          <Link href={'/user'}>
          <button >Home</button>
          </Link>      
        </div>
      </div>
     

<div className={styles.productlist}>
  {data.map((item, index) => (
    <div key={index} className={styles.productcard}>
      <Link href={`/user/item/${item.productDetails.productId}`}>
      <img src={item.productDetails.productImage} alt={item.productDetails.productName} className={styles.productimage} />
      </Link>
      <div className={styles.productdetails}>
        <Link href={`/user/item/${item.productDetails.productId}`}>
        <h3 className={styles.productname}>{item.productDetails.productName}</h3>
        </Link>
        <p className={styles.productdescription}>{item.productDetails.productDescription}</p>
        <p className={styles.productprice}>${item.itemPrice}</p>
        <p>Quantity :
          <button disabled={item.quantity==1 ? true:false } onClick={() => handlequantitydelete(item._id,item.productDetails.productName)}>-</button>
          {item.quantity}
          <button onClick={() => updatequantity(item.productDetails.productId,item.productDetails.productName,item._id)}>+</button>
        </p>
        <div>
          <button onClick={() => handlecartdelete(item._id)}>Del🗑</button>
          <Link href={`/user/buy/${item._id}`}>
          <button>Place order</button>
          </Link>
        </div>
      </div>

    </div>
  ))}
   <div className={styles.totalSection}>
    Total: ${total}
    <button onClick={buyall}  className={styles.buyNowButton}>Buy Now</button>
  </div>
  <ToastContainer />
</div>

    </>

  )
}

export default page

