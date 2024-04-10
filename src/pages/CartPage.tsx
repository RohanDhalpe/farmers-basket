import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { OrderItem } from '../api/types';
import { removeFromCart } from '../api/myOrderSlice';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Cart: React.FC = () => {
  const navigate = useNavigate();

  const cartItems: OrderItem[] = useSelector((state: any) => state.myCart?.Cart) ?? [];
  const userId = useSelector((state: any) => state?.auth?.userData?.id) ?? '0';
  const token = useSelector((state: any) => state?.auth?.userData?.token) ?? 'abc';
  const dispatch = useDispatch();
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  const initialValues = {
    paymentOption: '',
    deliveryAddress: '',
  };

  const validationSchema = Yup.object().shape({
    paymentOption: Yup.string().required('Payment Option is required'),
    deliveryAddress: Yup.string().required('Delivery Address is required'),
  });

  const handleOrder = async (values: any) => {
    try {
      setIsPlacingOrder(true);

      for (const cartItem of cartItems) {
        const orderData = {
          customer_id: userId,
          product_id: cartItem.productInfo.id,
          payment_option: values.paymentOption,
          payment_status: 'Paid',
          order_status: 'Dispatched',
          delivery_address: values.deliveryAddress,
          order_type: 'buy',
          quantity: parseInt(cartItem.quantity.toString()),
        };

        const response = await axios.post('http://localhost:8080/orders', orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Order placed:', response.data);
        const ProductId = cartItem.productInfo.id;
        dispatch(removeFromCart({ productId: ProductId }));
      }

      setIsPlacingOrder(false);
      toast.success("Orders placed successfully!");
      navigate('/confirmorder');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place orders!');
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <button onClick={() => navigate('/userpage')} className="flex items-center bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-5 rounded-sm transition duration-300 text-lg">
        <HiArrowLeft className="mr-2" /> Back to Home
      </button>
      <div className="container mx-auto py-8 flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-lg font-semibold mb-4">Items in Cart:</h2>
          {cartItems?.map((item: OrderItem) => (
            <div key={item.productInfo.id} className="bg-white rounded-md shadow-md p-4 mb-4">
              <h3 className="text-lg font-semibold">{item.productInfo.name}</h3>
              <p>Category: {item.productInfo.category}</p>
              <p>Seasonal: {item.productInfo.isSeasonal ? 'Yes' : 'No'}</p>
              <p>Price: Rs {item.productInfo.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Amount: {item.quantity * item.productInfo.price}</p>
            </div>
          ))}
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-lg font-semibold mb-4">Order Details:</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleOrder}>
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="paymentOption" className="font-semibold text-lg">
                    Payment Option:
                  </label>
                  <Field
                    as="select"
                    id="paymentOption"
                    name="paymentOption"
                    className="border border-blue-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Payment Option</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                  </Field>
                  <ErrorMessage name="paymentOption" component="div" className="text-red-500" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="deliveryAddress" className="font-semibold text-lg">
                    Delivery Address:
                  </label>
                  <Field
                    type="text"
                    id="deliveryAddress"
                    name="deliveryAddress"
                    className="border border-blue-500 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage name="deliveryAddress" component="div" className="text-red-500" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal-800 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-300 disabled:pointer-events-none text-lg"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Cart;
