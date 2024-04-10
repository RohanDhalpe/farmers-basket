import { useState, useEffect } from 'react';
import axios from 'axios';
import { Order } from "../types/type";
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';

const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate(); 

  const fetchOrders = async () => {
    try {
      if (!token || !userId) {
        console.error('Token or user ID is missing.');
        return;
      }

      const response = await axios.get(`http://localhost:8080/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Response data:", response.data);

      const ordersData: Order[] = response.data.data;

      console.log("Orders data:", ordersData);

      if (response.status === 200) {
        const userOrders = ordersData.filter(order => order.customer_id === parseInt(userId));

        const formattedOrders = userOrders.map(order => ({
          ...order,
          order_date: new Date(order.order_date).toLocaleDateString()
        }));
        
        setOrders(formattedOrders);
      } else {
        console.error('Error fetching orders:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const deleteOrder = async (orderId: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        
        setOrders(orders.filter(order => order.id !== orderId));
      } else {
        console.error('Error deleting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <button onClick={() => navigate('/userpage')} className="flex items-center bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-5 mb-5 rounded-sm transition duration-300 text-lg">
        <HiArrowLeft className="mr-2" /> Back to Home 
      </button>
      <h1 className="text-2xl font-medium mb-4 ml-10">Your Orders</h1>
      <div>
        {orders?.map((order) => (
          <div key={order.id} className="w-full p-4 rounded-lg shadow-lg">
            <div className="px-4 py-2 bg-white">
              <p className="text-2xl font-semibold">Order ID: {order.id}</p>
              <p className="text-lg">Product ID: {order.product_id}</p>
              <p className="text-lg">Order Date: {order.order_date}</p>
              <p className="text-lg">Quantity: {order.quantity}</p>
              <p className="text-lg">Payment Status: {order.payment_status}</p>
              <p className="text-lg">Total Amount: Rs {order.total_amount}</p>
              <button onClick={() => deleteOrder(order.id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserOrders;
