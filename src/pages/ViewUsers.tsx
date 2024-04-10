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
          setUserCount(usersData.length);
        } else {
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);


  const deleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 204) {

        setUsers(users.filter(user => user.ID !== userId));
        setUserCount(userCount - 1);
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
      <div className="flex flex-wrap">
        {users.map(user => (
          <div key={user.ID} className="m-4">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{user.name}</div>
                <p className="text-gray-700 text-base mb-2">Email: {user.email}</p>
                <p className="text-gray-700 text-base mb-2">Phone Number: {user.phone_number}</p>
              </div>
              <div className="px-6 py-4">
                <button onClick={() => deleteUser(user.ID)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                  Delete User
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}

export default ViewUsers;
