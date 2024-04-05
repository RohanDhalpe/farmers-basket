import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { loginValidationSchema } from "../validations/validation";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login as authLogin } from "../api/authslice"

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', values);
      const authtoken = response.data.data.token;
      localStorage.setItem("token", authtoken);
      localStorage.setItem("id", response.data.data.id);

      dispatch(authLogin({ userData: response.data.data }));
      if (response.data.data.user_type == "Buyer")
        navigate("/userpage")
      else
        navigate("/admin");
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      actions.setSubmitting(false);
    }
  };


  return (
    <div className="bg-lightgreen min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Welcome back!</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-green-700">
                  Your email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`border border-green-300 p-2 rounded-md w-full focus:ring-green-500 focus:border-green-500 ${touched.email && errors.email ? "border-red-500" : ""
                    }`}
                  placeholder="name@gmail.com"
                  required
                  autoFocus
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-green-700">
                  Account password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={`border border-green-300 p-2 rounded-md w-full focus:ring-green-500 focus:border-green-500 ${touched.password && errors.password ? "border-red-500" : ""
                    }`}
                  placeholder="*******"
                  required
                />
                <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in to your account"}
              </button>
            </Form>
          )}
        </Formik>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <p className="text-center mt-4">Not registered yet?
          <Link to="/signup" className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
            <span>Register now</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
