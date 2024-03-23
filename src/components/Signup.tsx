import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupValidationSchema } from "../validations/validation";

interface Values {
  name: string;
  email: string;
  phone_number: string;
  user_type: string;
  password: string;
}

const Signup = () => {
  const initialValues: Values = {
    name: "",
    email: "",
    phone_number: "",
    user_type: "",
    password: "",
  };

  return (
    <div className="bg-green-200 min-h-screen flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white px-8 py-8 rounded shadow-md text-black w-full max-w-md">
          <h1 className="mb-8 text-3xl text-center font-bold text-green-700">
            Sign Up - Grow with Us!
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={signupValidationSchema} 
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="text"
                    className={`block border border-green-400 w-full p-3 rounded placeholder-gray-400 focus:outline-none focus:border-green-500 ${
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
                <div className="mb-4">
                  <Field
                    type="text"
                    className={`block border border-green-400 w-full p-3 rounded placeholder-gray-400 focus:outline-none focus:border-green-500 ${
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
                <div className="mb-4">
                  <Field
                    type="text"
                    className={`block border border-green-400 w-full p-3 rounded placeholder-gray-400 focus:outline-none focus:border-green-500 ${
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
                <div className="mb-4">
                  <Field
                    as="select"
                    name="user_type"
                    className={`block border border-green-400 w-full p-3 rounded placeholder-gray-400 focus:outline-none focus:border-green-500 ${
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
                <div className="mb-4">
                  <Field
                    type="password"
                    className={`block border border-green-400 w-full p-3 rounded placeholder-gray-400 focus:outline-none focus:border-green-500 ${
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
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white rounded py-3 font-bold hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  Create Account
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="text-green-700 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:text-green-500">
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
