import { useState } from 'react';
import { ErrorMessage, Field, Formik, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { productSchema } from '../validations/validation';
import { ProductData } from '../types/type';
import { toast } from 'react-toastify';


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
      toast.success("Product added Successfully !")
      closeModal();
    } catch (error) {
      toast.error("Failed to add Product!")
    }
    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={productSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-semibold text-lg">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-input border border-gray-300 rounded-md text-lg"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-700 text-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="description" className="block font-semibold text-lg">
                  Description
                </label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  className="form-input border border-gray-300 rounded-md text-lg"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="category" className="block font-semibold text-lg">
                  Category
                </label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="form-select border border-gray-300 rounded-md text-lg"
                >
                  <option value="">Select Category</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Grains">Grains</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-lg mt-1"
                />
              </div>
              <div>
                <label htmlFor="price" className="block font-semibold text-lg">
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="form-input border border-gray-300 rounded-md text-lg"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-lg mt-1"
                />
              </div>
              <div>
                {/* <label htmlFor="isSeasonal" className="block font-semibold text-lg">
                  Is Seasonal
                </label> */}
                {/* <Field
                  type="checkbox"
                  id="isSeasonal"
                  name="isSeasonal"
                  className="form-checkbox"
                />
                <ErrorMessage
                  name="isSeasonal"
                  component="div"
                  className="text-red-500 text-lg mt-1"
                /> */}
              </div>
              <div>
                <label htmlFor="quantity" className="block font-semibold text-lg">
                  Quantity
                </label>
                <Field
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-input text-lg"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-red-500 text-lg mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="btn-cancel mr-2 px-4 py-2 rounded-md text-black font-semibold transition duration-300 ease-in-out bg-green-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit px-4 py-2 rounded-md text-black font-semibold transition duration-300 ease-in-out bg-green-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
  );
}

export default AddProductModal;
