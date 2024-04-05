import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductData } from "../types/type";
import AdminHeader from "../components/AdminHeader";

const ViewProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error('Token is missing.');
          return;
        }

        const response = await axios.get('http://localhost:8080/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const Products: ProductData[] = response.data.data;

        if (response.status === 200) {
          setProducts(Products);  
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen relative">
      <AdminHeader />
      <div className="pt-20">
        <div className="container mx-auto px-4">
          <div className="mb-5 text-center">
            <h1 className="text-3xl font-bold">All Products ({products.length})</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-md overflow-hidden">
                {/* Replace the image_url with the actual image source */}
                {/* <img src={product.image_url} alt={product.name} className="w-full h-56 object-cover" /> */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: ₹{product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Seasonal: {product.isSeasonal ? "Yes" : "No"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
