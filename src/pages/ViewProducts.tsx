// ViewProducts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductData } from "../types/type";

const ViewProducts = ({ onProductCountChange }: { onProductCountChange: Function }) => {
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

        const Products: ProductData[] = response.data.data

        if (response.status === 200) {
          setProducts(Products);
          // Pass the count of products to the parent component
          onProductCountChange(Products.length);
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
    <div className="container mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img alt={product.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h5 className="text-lg font-semibold text-primary">{product.name}</h5>
              <p className="text-base text-gray-600 mb-2">Description: {product.description}</p>
              <p className="text-base text-gray-600 mb-2">Category: {product.category}</p>
              <p className="text-base text-gray-600 mb-2">Price: ${product.price}</p>
              <p className="text-base text-gray-600 mb-2">Quantity: {product.quantity}</p>
              <p className="text-base text-gray-600 mb-2">Seasonal: {product.isSeasonal ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
