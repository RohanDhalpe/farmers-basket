import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from "../types/type";
import AdminHeader from '../components/AdminHeader';

const ViewUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userCount, setUserCount] = useState<number>(0); // State to store the count of users
  const token = localStorage.getItem("token");

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

        const usersData: User[] = response.data.data;

        if (response.status === 200) {
          setUsers(usersData);
          setUserCount(usersData.length); // Update user count
        } else {
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]); 

  return (
    <>
      <AdminHeader />
      <h1 className="text-2xl font-semibold mb-4">Your customers ({userCount})</h1>
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
            {users.map(user => ( 
              <tr key={user.ID}>
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
