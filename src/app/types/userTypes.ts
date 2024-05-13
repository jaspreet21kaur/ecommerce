 export interface category{
    _id: string,
    categoryName: string
    categoryDescription: string
    createdBy: string
    createdAt: string
    updatedAt: string
    __v: number
  
  }
  export type UserType = {
    email : string;
    password : string|number;
}

 export interface Product {
    _id:string
    productName: string;
    productPrice: string;
    productImg: string;
    productDescription:string
    
  }
  
 export interface DashboardProps {}
  var proid:any={
    catergoryName:"",
    subCategoryName:"",
    productName:"",
    productPrice:"",
    productImage:"",
    productdescription:""
  }
  export interface formdata{
    catergoryName:string
    subCategoryName:string
    productName:string
    productPrice:number
    productImage:string
    productdescription:string
  }

 export interface subcategory{
      _id: string
      subCategoryName:string
      subCategoryDescription:string
      categoryId:string
      createdBy:string
      createdAt: string
      updatedAt: string
  }

  export interface ProductDetails {
    productId: string;
    productName: string;
    productPrice: number;
    productDescription: string;
    productImage: string;
}

export interface BuyerUser {
    _id: string;
    fullName: string;
    email: string;
}

export interface CartItem {
    _id: string;
    buyerUserId: BuyerUser;
    productDetails: ProductDetails;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    itemPrice: number;
}
 export interface CartItems {
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
export interface ApiResponse {
    cartItems: CartItem[];
    totalCartAmount: number;
}

export type addToCartType = {
  productId:string,
  productName:string
}


export type createcategory={
  categoryName:string
  categoryDescription:string
}


export type createsubcategoty={
  categoryName:string
  subCategoryName:string
  subCategoryDescription:string
}
export type forgotpassword={
 email:string
}


export type resetpassword={
  email:any
  otp:string
  newPassword: string
  confirmPassword: string
}
