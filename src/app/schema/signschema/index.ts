import * as Yup from "yup"

export const signschema = Yup.object({
    fullName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
   
  });

  export const resetschema=Yup.object({
    otp:Yup.string().min(4).max(4).required("Enter valid otp"),
    newPassword: Yup.string()
    .required("Enter password")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must have at least 8 characters, one uppercase, one lowercase, one digit, and one special character (#?!@$%^&*-)"
    ),
    confirmPassword:Yup.string().required("Confirm password").nullable().oneOf([Yup.ref("newPassword"),null],"Password should match")
  })
  

 export  const categoryschema=Yup.object({
    categoryName:Yup.string().max(30).required("Enter category name"),
    categoryDescription:Yup.string().max(40).required("Enter description")
})


export  const subcategoryschema=Yup.object({
  categoryName:Yup.string().required("Select a catergory first"),
  subCategoryName:Yup.string().max(30).required("Please enter subcategory name"),
  subCategoryDescription:Yup.string().max(40).required("Please enter the descritpion ")

})