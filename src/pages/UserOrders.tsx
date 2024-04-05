import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Order } from "../types/type";

const UserOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem("token"); 
  const userId = localStorage.getItem("id"); // Assuming you have the user's ID stored in localStorage

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
        // Filter orders by matching customer_id with user_id
        const userOrders = ordersData.filter(order => order.customer_id === parseInt(userId));
        setOrders(userOrders);
      } else {
        console.error('Error fetching orders:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Customer Id</th>
              <th className="px-4 py-2">Product Id</th>
              <th className='px-4 pt-2'>Order Date</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Payment option</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className='px-4 pt-2'>Order Status</th>
              <th className="px-4 py-2">Order Type</th>
              <th className="px-4 py-2">Delivery Address</th>
              <th className='px-4 pt-2'>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map(order => ( 
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customer_id}</td>
                <td className="border px-4 py-2">{order.product_id}</td>
                <td className="border px-4 py-2">{order.order_date}</td>
                <td className="border px-4 py-2">{order.total_amount}</td>
                <td className="border px-4 py-2">{order.payment_option}</td>
                <td className="border px-4 py-2">{order.payment_status}</td>
                <td className="border px-4 py-2">{order.order_status}</td>
                <td className="border px-4 py-2">{order.order_type}</td>
                <td className="border px-4 py-2">{order.delivery_address}</td>
                <td className="border px-4 py-2">{order.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserOrders;
