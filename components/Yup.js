import * as Yup from 'yup';

export const SignIn = Yup.object({
    email:Yup.string().email().required("Please enter email"),
    password:Yup.string().min(6).max(16).required("Please enter Password")
})

export const SignUP = Yup.object({
    name:Yup.string().min(2).max(25).required("Please enter Your Name"),
    email:Yup.string().email().required("Please enter email"),
    password:Yup.string().min(6).max(16).required("Please enter Password")
})
