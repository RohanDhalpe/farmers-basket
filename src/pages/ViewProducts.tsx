import { useState, useEffect } from "react";
import axios from "axios";
import { ProductData } from "../types/type";
import AdminHeader from "../components/AdminHeader";
import img from "../assets/bg4.png";

const ViewProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error('Token is missing.');
          return;
        }

        const response = await axios.get(`http://localhost:8080/products?page=${currentPage}&limit=${productsPerPage}`, {
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
  }, [currentPage, productsPerPage, token]);

  const handleUpdate = (productId: number) => {
    console.log(`Update product with ID ${productId}`);
  };

  const handleDelete = (productId: number) => {
    console.log(`Delete product with ID ${productId}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen relative">
      <AdminHeader />
      <div className="pt-20">
        <div className="container mx-auto px-4">
          <div className="mb-5 text-center">
            <h1 className="text-3xl font-bold">All Products ({products.length})</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-md overflow-hidden">
                <img src={img} alt={product.name} className="w-full h-56 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: ₹{product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  {/* Update and Delete Buttons */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleUpdate(product.id)} // Assuming handleUpdate function is defined
                      className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)} // Assuming handleDelete function is defined
                      className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          <ul className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
