import React, { useState } from 'react';
import { ErrorMessage, Field, Formik, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productSchema } from '../validations/validation';
import { ProductData } from '../types/type';

function AddProductModal({ closeModal }: { closeModal: Function }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: ProductData = {
    id: 0,
    name: '',
    description: '',
    category: '',
    price: 0,
    isSeasonal: false,
    quantity: 0
  };

  const handleSubmit = async (
    values: ProductData,
    { setSubmitting, resetForm }: FormikHelpers<ProductData>
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/products',
        values,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Data posted successfully:', response.data);
      resetForm();
      navigate('/viewproducts');
      closeModal();
    } catch (error) {
      console.error('Error posting data:', error);
    }
    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
        role="dialog"
      >
        <div className="bg-white w-96 rounded-lg p-8">
          <h2 className="text-xl font-bold mb-4">Add Product</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-semibold">
                    Name
                  </label>
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
                  <label htmlFor="description" className="block font-semibold">
                    Description
                  </label>
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
                  <label htmlFor="category" className="block font-semibold">
                    Category
                  </label>
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
                  <label htmlFor="price" className="block font-semibold">
                    Price
                  </label>
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
                  <label htmlFor="isSeasonal" className="block font-semibold">
                    Is Seasonal
                  </label>
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
                  <label htmlFor="quantity" className="block font-semibold">
                    Quantity
                  </label>
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
                    onClick={() => closeModal()}
                    className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={isSubmitting || isLoading}
                  >
                    {isLoading ? 'Adding...' : 'Add Product'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
