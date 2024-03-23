import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
});

export const signupValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  user_type: yup.string().required("User type is required"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
});