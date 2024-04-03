// BuyProducts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ProductData, BuyProduct } from "../types/type";

const BuyProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [buyProduct, setBuyProduct] = useState<BuyProduct>({
    customer_id: parseInt(localStorage.getItem("id") ?? "1"),
    product_id: 0,
    payment_option: "",
    payment_status: "Paid",
    order_status: "Dispatched",
    delivery_address: "",
    order_type: "buy",
    quantity: 0
  });
  const [product,setProduct] = useState<ProductData>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error('Token is missing.');
          return;
        }
        console.log(id);
        const response = await axios.get('http://localhost:8080/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const Products: ProductData[] = response.data.data

        if (response.status === 200) {
          setProducts(Products);
          setLoading(false);
        } else {
          console.error('Error fetching products:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleBuy = (product: ProductData) => {
    setProduct(product);
    setBuyProduct({
      ...buyProduct,
      product_id: product.id
    });
    setShowModal(true);
  };

  const handleSubmit = async (values: BuyProduct) => {
    try {
      setIsSubmitting(true);
      const { quantity, delivery_address, payment_option } = values;
      
      const orderData: BuyProduct = {
        customer_id: parseInt(localStorage.getItem("id") ?? "1"),
        product_id: buyProduct.product_id, 
        payment_option: payment_option,
        payment_status: "Paid",
        order_status: "Dispatched",
        delivery_address: delivery_address,
        order_type: "buy",
        quantity: quantity
      };
  
      const response = await axios.post('http://localhost:8080/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log('Purchase successful:', response.data);
      alert("Purchase Successful");
      setShowModal(false);
    } catch (error) {
      console.error('Error purchasing product:', error);
      alert("Purchase Failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      customer_id: parseInt(localStorage.getItem("id") ?? "1"),
      product_id: 0,
      payment_option: "",
      payment_status: "Paid",
      order_status: "Dispatched",
      delivery_address: "",
      order_type: "buy",
      quantity: 0
    },
    onSubmit: handleSubmit
  });

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden col-md-4 mb-4 text-center">
            <img alt={product.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h5 className="text-lg font-semibold text-primary">Name: {product.name}</h5>
              <p className="text-base text-gray-600 mb-2">Description: {product.description}</p>
              <p className="text-base text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-base text-gray-600 mb-2">Price: ${product.price}</p>
              <p className="text-base text-gray-600 mb-2">Quantity: {product.quantity}</p>
              <p className="text-base text-gray-600 mb-2">Seasonal: {product.isSeasonal ? "Yes" : "No"}</p>
              <div>
                <button className="btn btn-primary text-center mb-3" onClick={() => handleBuy(product)}>Buy</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="modal-dialog bg-white rounded-lg overflow-hidden max-w-md">
            <div className="modal-content">
              <div className="modal-header bg-gray-700 text-white py-3 px-4 flex justify-between items-center">
                <h5 className="modal-title">Buy Product</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" className="form-control" id="quantity" name="quantity" value={formik.values.quantity} onChange={formik.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="delivery_address">Delivery Address:</label>
                    <input type="text" className="form-control" id="delivery_address" name="delivery_address" value={formik.values.delivery_address} onChange={formik.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payment_option">Payment Option:</label>
                    <select className="form-control" id="payment_option" name="payment_option" value={formik.values.payment_option} onChange={formik.handleChange}>
                      <option value="cash">Cash</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="credit_card">Credit Card</option>
                      <option value="net_banking">Net Banking</option>
                      <option value="upi">UPI</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="total_amount">Total Amount:</label>
                    <div>{product && formik.values.quantity * product.price}</div>
                  </div>
                  <button type="submit" className="btn btn-warning" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyProducts;
