import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from "../types/type";

const ViewUsers = () => {
  const [users, setUsers] = useState<User[]>([]); // Initialize users as an array of User type
  const token = localStorage.getItem("token"); // Initialize orders as an array of Order type

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token) {
          console.error('Token is missing.');
          return;
        }

        const response = await axios.get('http://localhost:8080/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const OrdersData: User[] = response.data.data

        if (response.status === 200) {
          setUsers(OrdersData);
        } else {
          console.error('Error fetching orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchUsers();
  }, [token]); 
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Your customers</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => ( // Ensure users is an array before mapping
              <tr>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewUsers;
