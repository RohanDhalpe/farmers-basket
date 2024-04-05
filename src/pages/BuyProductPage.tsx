import React, { useState, useEffect, FormEventHandler } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ProductData, BuyProduct, CartItemData } from "../types/type";
import { useLocalStorage } from "@uidotdev/usehooks";
import Cart from "./CartPage";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../api/myOrderSlice";
import { OrderItem } from "../api/types";

const BuyProducts = () => {


const dispatch = useDispatch()
  /////////////////////////

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showAddToCartModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };













  ///////////
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
  const [product, setProduct] = useState<ProductData>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const [cartItems, setCartItems] = useLocalStorage<CartItemData[]>("cart-items", []);

  console.log(cartItems)

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

  const handleAddToCart = (product: ProductData, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    showAddToCartModal();
    setProduct(product);
  };
  

  const handleRemoveFromCart = (product: ProductData) => {
    const newItems = cartItems.filter((item) => item.id !== product.id)
    setCartItems(newItems)
  }

  const [quantity, setQuantity] = useState<number>(0);
  const handleQuantityChange = (e: any) => {
    setQuantity(e.target.value)
  }

  return (
    <div className="container mt-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-6">
        {products.map((product) => {
          const isProductPresentInCart = cartItems.some((item) => item.id === product.id)


          return (
            <div key={product.id} className="bg-white rounded-md shadow-md overflow-hidden mb-4">
              <img className="w-full h-40 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-black">{product.name}</h4>
                <p className="text-base text-gray-600 mb-2">{product.description}</p>
                <div className="flex flex-row justify-between">
                  <p className="text-base text-gray-600 pt-[15px]">₹{product.price}</p>
                  {/* <div>
                    <button className="bg-green-500 hover:bg-blue-600 text-white font-bold text-sm py-2 px-4 rounded" onClick={() => handleBuy(product)}>Buy</button>
                  </div> */}
                  <div>
                    {
                      isProductPresentInCart
                        ?
                        <button className="bg-green-500 hover:bg-blue-600 text-white font-bold text-sm py-2 px-4 rounded" onClick={() => handleRemoveFromCart(product)}>Remove from cart</button>
                        :
                        <button className="bg-green-500 hover:bg-blue-600 text-white font-bold text-sm py-2 px-4 rounded" onClick={(e) => handleAddToCart(product,e)}>Add to cart</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md overflow-hidden max-w-md">
            <div className="bg-gray-700 text-white py-3 px-4 flex justify-between items-center">
              <h5 className="font-semibold">Buy Product</h5>
              <button type="button" className="text-white" onClick={() => setShowModal(false)}>Close</button>
            </div>
            <div className="p-4">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
                  <input type="number" id="quantity" name="quantity" className="form-input mt-1 block w-full" value={formik.values.quantity} onChange={formik.handleChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700">Delivery Address:</label>
                  <input type="text" id="delivery_address" name="delivery_address" className="form-input mt-1 block w-full" value={formik.values.delivery_address} onChange={formik.handleChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="payment_option" className="block text-sm font-medium text-gray-700">Payment Option:</label>
                  <select id="payment_option" name="payment_option" className="form-select mt-1 block w-full" value={formik.values.payment_option} onChange={formik.handleChange}>
                    <option value="cash">Cash</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="net_banking">Net Banking</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700">Total Amount:</label>
                  <div>{product && formik.values.quantity * product.price}</div>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="MY cart"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="p-4">
          
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
              <input type="number" id="quantity" name="quantity" className="form-input mt-1 block w-full" onChange={handleQuantityChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700">Total Amount:</label>
              <div className="">{product && quantity * product.price}</div>
            </div>
            <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" disabled={isSubmitting}
            onClick={() => {
              handleCancel()
              if(product&&quantity>0)
              {
                const orderItem:OrderItem ={
                  productInfo:product,
                  quantity:quantity,
                }
                dispatch(addToCart({orderItem}))

              }
            }}
            >
              Submit
            </button>
        </div>
      </Modal>

    </div>
  );
};

export default BuyProducts;
