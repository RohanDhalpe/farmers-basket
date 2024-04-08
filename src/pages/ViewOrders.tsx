import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Order } from "../types/type";
import AdminHeader from '../components/AdminHeader';

const ViewOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          console.error('Token is missing.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/orders?page=${currentPage}&limit=${ordersPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const OrdersData: Order[] = response.data.data;

        if (response.status === 200) {
          const formattedOrders = OrdersData.map(order => ({
            ...order,
            order_date: new Date(order.order_date).toISOString().split('T')[0]
          }));
          setOrders(formattedOrders);
        } else {
          console.error('Error fetching orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [currentPage, ordersPerPage, token]);

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

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <AdminHeader />
      <h1 className="text-2xl font-semibold mb-4 ml-5 mt-5">All Orders ({orders.length})</h1>
      <div className="ml-5 mr-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {currentOrders.map(order => (
          <div key={order.id} className="border p-4 rounded-md">
            <p className="text-lg"><strong>Order ID:</strong> {order.id}</p>
            <p className="text-lg"><strong>Customer ID:</strong> {order.customer_id}</p>
            <p className="text-lg"><strong>Product ID:</strong> {order.product_id}</p>
            <p className="text-lg"><strong>Order Date:</strong> {order.order_date}</p>
            <p className="text-lg"><strong>Payment Option:</strong> {order.payment_option}</p>
            <p className="text-lg"><strong>Delivery Address:</strong> {order.delivery_address}</p>
            <p className="text-lg"><strong>Total Quantity:</strong> {order.quantity}</p>
            <p className="text-lg"><strong>Total Amount:</strong> {order.total_amount}</p>
            <button onClick={() => deleteOrder(order.id)} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
              Delete Order
            </button>
          </div>
        ))}
      </div>
    
      <ul className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 mx-1 focus:outline-none ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ViewOrders;
