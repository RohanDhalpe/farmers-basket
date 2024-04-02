import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
import { ProductData } from "../types/type";
import { UserCircle2Icon } from "lucide-react";

export default function ProductForm() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const initialValues = {
    id:0,
    name: "",
    description: "",
    category: "",
    price: 0,
    isSeasonal: false,
    quantity: 0
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required"),
    isSeasonal: Yup.boolean().required("Is Seasonal is required"),
    quantity: Yup.number().required("Quantity is required")
  });

  const handleSubmit = async (values: ProductData, { setSubmitting }: FormikHelpers<ProductData>) => {
    try {
      const response = await axios.post("http://localhost:8000/products", values);
      console.log("Data posted successfully:", response.data);
      navigate("/viewproducts")
      closeModal();   
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setSubmitting(false); // Reset the submitting state
  };

  const handleSignout=()=>{
    navigate("/login")
  }

  return (
    <>
      <div className="admin-portal">
        <nav className="navbar navbar-expand-lg bg-warning justify-content-between">
          <form className="form-inline d-flex text-center justify-content-between w-100">
            <div>
              <h3 className="admin-on-navbar">Admin Portal</h3>
            </div>
            <div className="d-inline-flex">
              <div className="mt-2">
                <button
                  className="btn btn-outline-success  btn-hover text-light bg-success my-2 text-center"
                  type="button"
                  style={{ marginRight: "15px" }}
                  onClick={openModal}
                >
                  Add Products
                </button>
              </div>

               <div className="dropdown mr-5">
                  {<UserCircle2Icon className="dropdown-toggle mt-3" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "40px", height: "40px",padding:"0px" }} />}
                  <ul className="dropdown-menu">
                    <button className="dropdown-item">Profile</button>
                    <button className="dropdown-item" onClick={()=>navigate("/viewproducts")}>List Products</button>
                    <button className="dropdown-item" onClick={handleSignout}>Sign Out</button>
                  </ul>
              </div> 
            </div>
          </form>
        </nav>

        {showModal && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
            role="dialog"
          >
            <div className="bg-white w-96 rounded-lg p-8">
              <h2 className="text-xl font-bold mb-4">Add Product</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-semibold">Name</label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block font-semibold">Description</label>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block font-semibold">Category</label>
                    <Field
                      type="text"
                      id="category"
                      name="category"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block font-semibold">Price</label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="isSeasonal" className="block font-semibold">Is Seasonal</label>
                    <Field
                      type="checkbox"
                      id="isSeasonal"
                      name="isSeasonal"
                      className="mr-2"
                    />
                    <ErrorMessage
                      name="isSeasonal"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block font-semibold">Quantity</label>
                    <Field
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Add Product
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
