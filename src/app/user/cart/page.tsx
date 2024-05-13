
"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


var removeid:string
interface CartItem {
    _id: string;
    productDetails: {
      productId: string
      productImage: string;
      productName: string;
      productDescription: string;
      productPrice: number;
    
    };
    quantity: number;
    totalCartAmount:number
    itemPrice:number
   
  }
  type QuantityState = number;
const page:React.FC = () => {
    
    const router=useRouter()

    const [total,settotal]=useState("")
    const [data, setdata] = useState<CartItem[]>([]);
    const token=localStorage.getItem("token")
    const [modal,setmodal]=useState(false)
    if(!token){
        router.replace("/")
    }
    const fetchdata = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://cart-app-ibuu.onrender.com/api/v1/user/get-cart", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        // console.log(response?.data?.data)
        settotal(response?.data?.data?.totalCartAmount)
        setdata(response.data.data.cartItems.filter((item: { productDetails: any }) => item.productDetails));
        // console.log(response.data.data.cartItems.filter(item => item.productDetails))
      } catch (error) {
        console.error(error);
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

      const token=localStorage.getItem("token")
      await axios.
      patch("https://cart-app-ibuu.onrender.com/api/v1/user/update-cart-item/"+cartid,val,{
        headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type":'application/json'
    
        }
      })
      .then((res)=>{
        fetchdata()

       console.log(res)
       
    }).catch((error)=>{
      
      console.log(error?.response?.data?.message)
    
      })
    };

    const handleRemove=(id:string)=>{
      setmodal(false)
    }

    const handlewishlist=()=>{
      setmodal(false)
    }
      const handledelete=(id:string,name:string)=>{
        console.log(id)
        removeid=id
        toast.success(`Product ${name}--quantity decreased by 1`)
        const token=localStorage.getItem("token")
        axios
        .delete("https://cart-app-ibuu.onrender.com/api/v1/user/remove-cart-item/"+id,{
            headers:{
                "Authorization": `Bearer ${token}`
              }
        })
        .then((res)=>{
            console.log(res)
            fetchdata()
      }).catch((error)=>{
        // fetchdata()
        console.log(error?.response?.data?.message)
        })
     }
     const handlecartdelete=(id:string)=>{
      const token=localStorage.getItem("token")
      axios
      .delete("https://cart-app-ibuu.onrender.com/api/v1/user/delete-cart-item/"+id,{
          headers:{
              "Authorization": `Bearer ${token}`
            }
      })
      .then((res)=>{
        fetchdata()
          console.log(res)
    }).catch((error)=>{
      // fetchdata()
      console.log(error?.response?.data?.message)
      })
   }
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
     
{
    modal && (
      <div className={styles.popupcontainer}>
   <h1>Move from bag?</h1>
   <div className={styles.buttonscontainer}>
      <button onClick={()=>handleRemove(removeid)}>Remove</button>
      <button onClick={handlewishlist}>Move to Wishlist</button>
   </div>
</div>

    )
}
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
          <button disabled={item.quantity==1 ? true:false } onClick={() => handledelete(item._id,item.productDetails.productName)}>-</button>
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
    <button className={styles.buyNowButton}>Buy Now</button>
  </div>
  <ToastContainer />
</div>

    </>

  )
}

export default page

