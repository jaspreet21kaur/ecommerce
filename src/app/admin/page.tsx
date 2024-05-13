"use client"
import { useRouter } from "next/navigation"
import styles from './styles.module.css'
import { useEffect, useState } from "react"
import axios from "axios"
import AuthRedirect from "@/components/AuthRedirect"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link"

interface Product {
    _id:string
    productName: string;
    productPrice: string;
    productImg: string;
    productDescription:string
    
  }
  
  interface DashboardProps {}
  var proid:any={
    catergoryName:"",
    productName:"",
    productPrice:"",
    productImage:"",
    productdescription:""
  }

  interface category{
      _id: string,
      categoryName: string
      categoryDescription: string
      createdBy: string
      createdAt: string
      updatedAt: string
      __v: number
  
  }


  interface subcategory{
      _id: string
      subCategoryName:string
      subCategoryDescription:string
      categoryId:string
      createdBy:string
      createdAt: string
      updatedAt: string

  }
export default function Dashboard(props: DashboardProps)  {
    const route=useRouter()
    const notify=()=>toast.success("Product created successfully")
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [name, setname] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [data, setdata] = useState<Product[]>([]);
    const [update, setupdate] = useState<boolean>(false);
    const [productName, setproductName] = useState<string>("")
    const [productPrice, setproductPrice] = useState("")
    const [error,seterror]=useState("")
    const [createerror,setcreaterror]=useState("")
    const [create,setcreate]=useState(false)
    const [show,sethshow]=useState(true)
    const [productname, setName] = useState('');
    const [productprice, setPrice] = useState('');
    const [productDescription, setDescription] = useState('');
    const [productImg, setImg] = useState<string | null>(null); //crete
    const [productdescription, setdescription] = useState('');
    const [productImage, setImage] = useState<string | null>(null); //update
     const [createer,setcreateer]=useState("")
     const [selectedOption, setSelectedOption] =useState("Please select a category")
     const [selectedsubOption, setSelectedsubOption] =useState("Please select a  sub category")
     const [categories,setcategories]= useState<category[]>([]);
     const [sub,setsub]=useState<subcategory[]>([])

 //logout user
  const logoutuser=()=>{
    localStorage.removeItem("userdata")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    route.replace("/")
    }
    const handlecategory = (name: string, id: string) => {
      setSelectedOption(name);
      getcategorybyid(id)
      console.log(`Selected category name: ${name}, ID: ${id}`);
    };
const getcategorybyid=(id:string)=>{
        const token=localStorage.getItem("token")
        if(token){
          axios
          .get("https://cart-app-ibuu.onrender.com/api/v1/admin/get-category/"+id,{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          }).then((res)=>{
            console.log(res?.data)
            subcategory(id)
          }).catch((error)=>{
            console.log(error)
          })
        }
}
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      console.log(sub)
      if(productname==="" || productprice==="" || productDescription==="" || productImg==="" || selectedOption===""){
        console.log("all fields are requreid")
        setcreaterror("All fields are requried !")
      }else{
         setcreaterror("")
        const formData = new FormData();
        formData.append('categoryName',selectedOption);
        formData.append("subCategoryName",selectedsubOption)
        formData.append('productName', productname);
        formData.append('productPrice', productprice);
        formData.append('productDescription', productDescription);
       
        if (productImg) {
          formData.append('productImg', productImg);
        }
    
        const storedToken = window.localStorage.getItem('token');
        // console.log("token ==>", storedToken);
    
        if (storedToken) {
          try {
            const response = await axios.post(
              `https://cart-app-ibuu.onrender.com/api/v1/admin/create-product`,
              formData,
              {
                headers: {
                  "Authorization": `Bearer ${storedToken}`,
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            console.log(response);
            fetchproducts()
            notify()
            setName("")
            setPrice("")
            setDescription("")
            setImg("")
            
            setcreateer("")
          } catch (error:any) {
            setcreateer(error?.response?.data?.message)
          }
        }
      }
      
    }
    const handleImgChange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setImg(file);
      } else {
        setImg(null);
      }
    };
    const handleImgupdate = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      } else {
        setImage(null); 
      }
    };
      
    const fetchproducts=()=>{
        const token=localStorage.getItem("token")
        // console.log(token)
        axios
        .get("https://cart-app-ibuu.onrender.com/api/v1/admin/get-all-products",{
            headers:{
                "Authorization": `Bearer ${token}`
              }
        })
        .then((res)=>{
        //   console.log(res?.data?.data?.products)
          setdata(res?.data?.data?.products)
         
    
      }).catch((error)=>{
        console.log(error?.response?.data?.message)
        })
    }
    const category=()=>{
      const token=localStorage.getItem("token")
      if(token){
        axios
        .get("https://cart-app-ibuu.onrender.com/api/v1/admin/get-all-categories",{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        .then((res)=>{
          console.log(res?.data?.data)
          setcategories(res?.data?.data)
        }).catch((error)=>{
          console.log(error)
        })
      }
    }
    const subcategory=(id:string)=>{
      const token=localStorage.getItem("token")
      if(token){
        axios
        .get("https://cart-app-ibuu.onrender.com/api/v1/admin/get-all-sub-categories",{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        .then((res)=>{
          console.log(res?.data?.data)
          setsub(res?.data?.data.filter((el:any)=>el.categoryId==id))
        }).catch((error)=>{
          console.log(error)
        })
      }
    }
  useEffect(()=>{
     fetchproducts()
     category()
    const token=localStorage.getItem("token")
    // console.log(token)
    if(token){

      axios
      .get("https://cart-app-ibuu.onrender.com/api/v1/admin/get-admin",{
          headers:{
              "Authorization": `Bearer ${token}`
            }
      })
      .then((res)=>{
      //   console.log(res.data.userData)
        setname(res?.data?.userData?.fullName)
        setemail(res?.data?.userData?.email)
  
    }).catch((error)=>{
      console.log(error?.response?.data?.message)
      })
    }
  
   
  },[])
  const handledelete=(id:string)=>{
     console.log(id)
     const token=localStorage.getItem("token")
     axios
     .delete("https://cart-app-ibuu.onrender.com/api/v1/admin/delete-product/"+id,{
         headers:{
             "Authorization": `Bearer ${token}`
           }
     })
     .then((res)=>{
       console.log(res)
       fetchproducts()
   }).catch((error)=>{
     console.log(error?.response?.data?.message)
     })
  }
  const handleupdate=(e:any)=>{
    e.preventDefault()
    if(productName==="" || productPrice===""||productdescription===""){
        seterror("All fields are requried !")
    }else{
      seterror("")
      console.log(productImage)
      let val={

        productName:productName,
        productPrice:productPrice,
        productDescription:productdescription,
        productImg:productImage
      }
      // console.log(productName,productPrice)
        const token=localStorage.getItem("token")
        const id=localStorage.getItem("id")
       console.log(val)
        axios.patch("https://cart-app-ibuu.onrender.com/api/v1/admin/update-product/"+id,
        
        val
        ,
        {
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type": 'multipart/form-data',
            }
        }).then((res)=>{
          setupdate(false)
          fetchproducts()
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
  }

    return (
       <>
       <AuthRedirect/>
       {create && (
        <div className={styles.create}>
          <h1>Create Product</h1>
          <div>
          <form onSubmit={handleSubmit}>
          <div>
      
          <div className="dropdown">
    <label htmlFor="category">Select a category</label>  
    <select value={selectedOption} onChange={(e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const categoryId = selectedOption.getAttribute('data-id');
        if (categoryId) {
          handlecategory(selectedOption.value, categoryId);
        }
      }}>
      <option value="">Please select category</option>
      {categories.map((option, index) => (
        <option key={index} value={option.categoryName} data-id={option._id}>
          {option.categoryName}
        </option>
      ))}
    </select>
  </div>
      <div className="dropdown">
        <label htmlFor="subcategory">Select a sub category</label>
        <select value={selectedsubOption}  onChange={(e) => setSelectedsubOption(e.target.value)}>
          <option value="">Please select sub category</option>
          {sub.map((option, index:any) => (
            <option key={index} value={option.subCategoryName}>
              {option.subCategoryName}
            </option>
          ))}
          </select>
      </div>
  
    </div>
        <label htmlFor="productName">Product name:</label>
        <input type="text" placeholder="Enter product name" value={productname} onChange={(e) => setName(e.target.value)} />
        <div>
          <label htmlFor="productPrice">Product price</label>
          <input type="number" placeholder="Enter product price" value={productprice} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label htmlFor="productDescription">Product description</label>
          <input type="text" placeholder="Description" value={productDescription} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="productImg">Product Image</label>
          <input type="file" placeholder="Image" onChange={handleImgChange} />
        </div>
        {createerror ? <p>{createerror}</p> : null}
        {createer ? <p>{createer}</p>:null}
        <button type="submit">Add Product</button>
      </form>
          </div>
          <button onClick={()=>{setcreate(false)
          sethshow(true)}}>Cancel</button>
          <ToastContainer/>
        </div>
       )}
       {update && (
        <div className={styles.updatediv}>
        <div>
        <form >
        <label htmlFor="productName">Product name:</label>
        <input type="text" placeholder="Enter product name" value={productName} onChange={(e) => setproductName(e.target.value)} />
        <div>
          <label htmlFor="productPrice">Product price</label>
          <input type="number" placeholder="Enter product price" value={productPrice} onChange={(e) => setproductPrice(e.target.value)} />
        </div>
        <div>
          <label htmlFor="productDescription">Product description</label>
          <input type="text" placeholder="Description" value={productdescription} onChange={(e) => setdescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="productImg">Product Image</label>
          <input type="file" placeholder="Image"   onChange={handleImgupdate} />
        </div>
        {error ? <p>{error}</p> : null}
        <button  type="submit" onClick={(e)=>handleupdate(e)}>Update</button>
      </form>
        </div>
        <button onClick={()=>setupdate(false)}>Cancel</button>
        </div>
       )}
         <div className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome Admin {name}!</h1>
        <div className={styles.navigation}>
          <button onClick={() => { setcreate(true); sethshow(false); }}>Create product</button>
          <Link href={'/admin/category'}>
         <button>Add category</button>
          </Link>
          <Link href={'/admin/subcategory'}><button>Add subcategory</button></Link>
       
          <div className={styles.profileDropdown}>
            <button onClick={() => setProfileDropdown(!profileDropdown)}>Profile</button>
            {profileDropdown && (
              <div className={styles.dropdownContent}>
                <button onClick={logoutuser}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
  
            <div className={styles.cardContainer}>
              {show && data.map((product, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.productInfo}>
                    <label htmlFor={`name_${index}`}>Product name</label>
                    <h4 id={`name_${index}`}>{product.productName}</h4>
                  </div>
                  <div className={styles.productInfo}>
                    <label htmlFor={`price_${index}`}>Product Price</label>
                    <h4 id={`price_${index}`}>{product.productPrice}</h4>
                  </div>
                  <div className={styles.productInfo}>
                    <label htmlFor={`img_${index}`}>Image</label>
                    <img className={styles.productImage} src={product.productImg} alt="" />
                  </div>
                  <div className={styles.buttons}>
                    <button onClick={() => handledelete(product._id)} className={styles.deleteButton}>Delete</button>
                    <button onClick={() => {
                        const id = product._id;
                        localStorage.setItem("id", id);
                        setproductName(product.productName);
                        setproductPrice(product.productPrice);
                        setdescription(product.productDescription);
                        setupdate(true);
                      }} className={styles.updateButton} >Update</button>
                  </div>
                </div>
              ))}
            </div>
        </div>
       </>
    )
  }
