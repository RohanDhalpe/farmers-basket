import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { loginValidationSchema } from "../validations/validation";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Welcome back!</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-green-700">
                  Your email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`border border-green-300 p-2 rounded-md w-full focus:ring-green-500 focus:border-green-500 ${
                    touched.email && errors.email ? "border-red-500" : ""
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
                  className={`border border-green-300 p-2 rounded-md w-full focus:ring-green-500 focus:border-green-500 ${
                    touched.password && errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                  required
                />
                <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500"
              >
                Log in to your account
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have a farm account yet?{" "}
          <Link to="/signup" className="font-medium text-green-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
