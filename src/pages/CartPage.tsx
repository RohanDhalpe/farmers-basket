import React, { useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios';
import { CartItemData } from '../types/type';
import { useDispatch, useSelector } from 'react-redux';
import { OrderItem } from '../api/types';
import { removeFromCart } from '../api/myOrderSlice';

const Cart: React.FC = () => {
  // const [cartItems, setCartItems] = useLocalStorage<CartItemData[]>("cart-items", []);
  const cartItems:OrderItem[] = useSelector((state:any)=>state.myCart?.Cart)??[]
  const userId = useSelector((state: any) => state?.auth?.userData?.id) ?? "0";
  const token = useSelector((state: any) => state?.auth?.userData?.token) ?? "abc";
const dispatch = useDispatch()
  console.log("cartItems-------",cartItems)
  const [quantity, setQuantity] = useState<number>(0);
  const [paymentOption, setPaymentOption] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  const handleOrder = async () => {
    try {
      setIsPlacingOrder(true);
  
      for (const cartItem of cartItems) {
        const orderData = {
          customer_id: userId,
          product_id: cartItem.productInfo.id,
          payment_option: paymentOption,
          payment_status: "Paid",
          order_status: "Dispatched",
          delivery_address: deliveryAddress,
          order_type: "buy",
          quantity:  parseInt(cartItem.quantity.toString())
        };
        const response = await axios.post('http://localhost:8080/orders', orderData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Order placed:', response.data);
        const ProductId = cartItem.productInfo.id
        dispatch(removeFromCart({productId:ProductId}))
      }
      
      setQuantity(0);
      setPaymentOption('');
      setDeliveryAddress('');
      alert('Orders placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place orders!');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {cartItems?.map((item:OrderItem) => (
        <div key={item.productInfo.id} className="bg-white rounded-md shadow-md p-4 mb-4">
          <h3 className="text-lg font-semibold">{item.productInfo.name}</h3>
          <p>Category: {item.productInfo.category}</p>
          <p>Seasonal: {item.productInfo.isSeasonal ? 'Yes' : 'No'}</p>
          <p>Price: Rs {item.productInfo.price}</p>
          <p>Quantity: {item.quantity }</p>
          <p>Total Amount: {item.quantity * item.productInfo.price }</p>
        </div>
      ))}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
        </div>
        <div className="flex flex-col">
          <label htmlFor="paymentOption" className="font-semibold">Payment Option:</label>
          <input
            type="text"
            id="paymentOption"
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="deliveryAddress" className="font-semibold">Delivery Address:</label>
          <input
            type="text"
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        
        <button onClick={handleOrder} disabled={isPlacingOrder} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md disabled:bg-gray-300 disabled:pointer-events-none">
          {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
