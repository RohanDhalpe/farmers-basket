import { useEffect, useState } from "react";
import { List } from "antd";
import axios from "axios";
import { User } from "../types/type";

const UserModal = () => {
  const [userDetails, setUserDetails] = useState<User>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error("Token is missing.");
          return;
        }
        const id=localStorage.getItem("id")
    
        const response = await axios.get(`http://localhost:8080/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserDetails(response.data.data);
          console.log("userdatails: ------->", response.data);
          
        } else {
          console.error("Error fetching user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, [token]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <List
      size="small"
      style={{ width: "500px" }}
      dataSource={[
        { label: "Name", value: userDetails.name },
        { label: "Phone Number", value: userDetails.phone_number },
        { label: "Role", value: userDetails.user_type },
      ]}
      renderItem={(item) => (
        <List.Item>
           <strong>{item.label}:</strong> {item.value}
        </List.Item>
      )}
    />
  );
};

export default UserModal;
