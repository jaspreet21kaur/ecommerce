export const apiRoutes = {
    userLogin: '/login/user-login',
    logout: '/logout',
    getUsers: '/user/get-user',
    registerUser:'/user/register',
    forgotpassword:"/user/forget-password",
    resetpassword:"/user/reset-password"
}

export const adminRoutes = {
    adminUsers: '/admin/get-admin',
    getAdminUser: '/admin/users',
    getAllProducts:'/admin/get-all-products',
    getProductById:"/admin/get-product/",
    getcategory:"/admin/get-category/",
    createproduct:"/admin/create-product",
    getallcategories:"/admin/get-all-categories",
    getallsubcategories:"/admin/get-all-sub-categories",
    deleteadminproduct:"/admin/delete-product/",
    adminupdateproduct:"/admin/update-product",
    createcategory:"/admin/create-category",
    createsubcategory:"/admin/create-sub-category",
    
}
export const cartRoutes = {
    addToCart:"/user/add-to-cart",
    getAllCart: "/user/get-cart",
    getItemCart:"/user/get-cart-item/",
    updateItemCart:"/user/update-cart-item/",
    removeCartItem:"/user/delete-cart-item/",
    removeCartQuantity:"user/remove-cart-item/"
}
export const payments = {
    createPayment:"/user/process-payments"
}