"use client"
import { useRouter } from "next/navigation"
import styles from './styles.module.css'
import { useEffect, useState } from "react"
import axios from "axios"
import AuthRedirect from "@/components/AuthRedirect"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link"
import { category,Product,DashboardProps,subcategory } from "../types/userTypes"
import { adminRoutes } from "../services/Api Routes"
import { GetAllProductAPI, Getallcategories, Getallsubcategories, deleteadminproductApi, getcategorybyidAPI } from "../services/api/admin/products"
import { getAdminAPI } from "../services/api/admin"
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
    //get category by id
    const getcategorybyid=async(id:string)=>{
      const response=await getcategorybyidAPI(id)
      if(response?.status===200){
        subcategory(id)
      }
    else{
      toast.error("error")
    }
    }

    //create product form
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
           `${process.env.NEXT_PUBLIC_API_BASE_URL}+${adminRoutes.createproduct}`,
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
    //img validation function
    const handleImgChange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setImg(file);
      } else {
        setImg(null);
      }
    };
    //imge update function
    const handleImgupdate = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      } else {
        setImage(null); 
      }
    };
      
    //fetch all products
    const fetchproducts=async()=>{
        const response=await GetAllProductAPI()
        console.log(response)
        if(response?.status===200){
          setdata(response.data.products)
        }
        else{
          toast.error("error")
        }
    }
    //get all categories
    const category=async()=>{
      const response=await Getallcategories()
      if(response?.status===200){
        setcategories(response?.data)
      }else{
       toast.error("error")
      }
    }

    //get all subcategories
    const subcategory=async(id:string)=>{
      const response=await Getallsubcategories(id)
      if(response?.status===200){
           setsub(response?.data.filter((el:any)=>el.categoryId==id))
      }
      else{
        toast.error("error")
      }
    
    }
//getadmin info
    const getadmin=async()=>{
      const response=await getAdminAPI()
      if(response?.status===200){
        setname(response?.userData?.fullName)
        setemail(response?.userData?.email)
      }else{
        toast.error("error")
      }
    
    }
  useEffect(()=>{
    getadmin()
     fetchproducts()
     category() 
  },[])

  const handledelete=async(id:string)=>{
    const response=await deleteadminproductApi(id)
    console.log("delete----------------",response)
    if(response?.status===200){
      toast.success("Product deleted successfully")
      fetchproducts()
    }else{
      toast.error("Network error ")
    }
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
        axios.patch(process.env.NEXT_PUBLIC_API_BASE_URL+adminRoutes.adminupdateproduct+id,
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
