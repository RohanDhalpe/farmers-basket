import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import axios from 'axios';
import { User } from '../types/type';
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    ID: 0,
    name: "",
    email: "",
    password: "",
    phone_number: "",
    user_type: "",
  });

  const navigate = useNavigate();

  const signupValidationSchema = yup.object({
    name: yup.string()
      .required("Name is required")
      .matches(/^[^\s]+$/, "Name must not contain spaces"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone_number: yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits"),
    user_type: yup.string().required("User type is required"),
    password: yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });
  
  const handleSubmit = async (values: User) => {
    try {
      const response = await axios.post('http://localhost:8080/users', { ...values, phone_number: parseInt(values.phone_number) });
      if (response.status === 200) {
        toast.success('User created successfully!');
        navigate('/login');
      } else {
        console.error('Error creating user:', response.statusText);
      }
      console.log(response)
    } catch (error) {
      toast.error('Error in creating user');
    }
  };

  return (
    <div className="bg-lightgreen min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white px-8 py-8 rounded shadow-md text-black w-full max-w-lg">
          <h1 className="mb-8 text-3xl text-center font-bold text-green-700">
            Create an account
          </h1>
          <Formik
            initialValues={formData}
            validationSchema={signupValidationSchema}
            onSubmit={(values) => {
              setFormData(values);
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <Field
                    type="text"
                    className={`block border border-green-400 w-full p-3 rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:border-green-500 ${
                      touched.name && errors.name ? "border-red-500" : ""
                    }`}
                    name="name"
                    placeholder="Name"
                    autoFocus
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    className={`block border border-green-400 w-full p-3 rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:border-green-500 ${
                      touched.email && errors.email ? "border-red-500" : ""
                    }`}
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="text"
                    className={`block border border-green-400 w-full p-3 rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:border-green-500 ${
                      touched.phone_number && errors.phone_number
                        ? "border-red-500"
                        : ""
                    }`}
                    name="phone_number"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    as="select"
                    name="user_type"
                    className={`block border border-green-400 w-full p-3 rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:border-green-500 ${
                      touched.user_type && errors.user_type ? "border-red-500" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select a user type
                    </option>
                    <option value="Seller">Seller</option>
                    <option value="Buyer">Buyer</option>
                  </Field>
                  <ErrorMessage
                    name="user_type"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    className={`block border border-green-400 w-full p-3 rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:border-green-500 ${
                      touched.password && errors.password ? "border-red-500" : ""
                    }`}
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white rounded-lg py-3 font-bold hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="text-green-700 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue hover:text-green-500">
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
