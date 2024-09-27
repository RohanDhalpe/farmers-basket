import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(3, "Password must be at least 8 characters long"),
});

export const signupValidationSchema = yup.object({
  name: yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z ]+$/, "Name must contain only letters"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone_number: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{3}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/, "Phone number must be in the format xxx-xxx-xxxx")
    .trim(),
  user_type: yup.string().required("User type is required"),
  password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const productSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  price: yup.number().required("Price is required"),
  isSeasonal: yup.boolean().required("Is Seasonal is required"),
  quantity: yup.number().required("Quantity is required")
});
