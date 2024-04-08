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

  // Function to delete a user
  const deleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        // Remove the deleted user from the state
        setUsers(users.filter(user => user.ID !== userId));
        setUserCount(userCount - 1); // Update user count
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <AdminHeader />
      <h1 className="text-3xl font-semibold mb-4 ml-4 mt-4">Your customers ({userCount})</h1>
      <div className="">
        {users.map(user => (
          <div key={user.ID} className=" ml-5 mr-5 p-4">
            <div className="border p-4 rounded-md">
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p className="mt-2">Email: {user.email}</p>
              <p className="mt-2">Phone Number: {user.phone_number}</p>
              <button onClick={() => deleteUser(user.ID)} className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewUsers;
