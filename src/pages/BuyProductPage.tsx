import { Pagination } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ProductData } from "../types/type";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../api/myOrderSlice";
import { OrderItem } from "../api/types";
import bg4 from '../assets/bg4.png'

const BuyProducts = () => {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [quantity, setQuantity] = useState<number>(0);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [product, setProduct] = useState<ProductData>()
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);

  const showAddToCartModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          console.error('Token is missing.');
          return;
        }

        const response = await axios.get('http://localhost:8080/products', {
          params: {
            page: currentPage,
            pageSize: pageSize,
            searchTerm: searchTerm
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const Products: ProductData[] = response.data.data

        if (response.status === 200) {
          setProducts(Products);
          setLoading(false);
        } else {
          console.error('Error fetching products:', response.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, currentPage, pageSize, searchTerm]);

  const handleAddToCart = (product: ProductData, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showAddToCartModal();
    setProduct(product);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="container mt-5">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        className="border border-gray-300 rounded-md p-2 mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
        {paginatedProducts.map((product) => {
          return (
            <div key={product.id} className="bg-white rounded-md shadow-lg overflow-hidden mb-8">
              <img src={bg4} alt="Product" className="w-full h-72 object-cover" /> 
              <div className="p-8"> 
                <h4 className="text-2xl mt-4 font-semibold text-black">{product.name}</h4>
                <p className="text-lg text-gray-700 mb-6">{product.description}</p> 
                <div className="flex justify-between items-center">
                  <p className="text-xl text-gray-800">₹{product.price}</p> 
                  <button className="bg-green-500 hover:bg-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg" onClick={(e) => handleAddToCart(product, e)}>Add to cart</button> {/* Increased font size */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="flex justify-center">
        <Pagination
          current={currentPage}
          total={filteredProducts.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    
      <Modal
        title="Add to Cart"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <button key="cancel" className="bg-gray-800 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleCancel}>
            Cancel
          </button>,
          <button
            key="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isSubmitting || quantity <= 0}
            onClick={() => {
              handleOk();
              if (product && quantity > 0) {
                const orderItem: OrderItem = {
                  productInfo: product,
                  quantity: quantity,
                };
                dispatch(addToCart({ orderItem }));
              }
            }}
          >
            {isSubmitting ? 'Adding to Cart...' : 'Add to Cart'}
          </button>
        ]}
      >
        <div className="p-6">
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-lg font-semibold text-gray-700 mb-2">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="form-input mt-1 block w-full h-12 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={handleQuantityChange}
              value={quantity}
              min="1"
              style={{ fontSize: "1.5em" }} 
              required
            />

            {quantity <= 0 && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid quantity.</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="total_amount" className="block text-lg font-semibold text-gray-700 mb-2">Total Amount:</label>
            <div className="text-xl">₹{product && quantity * product.price}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BuyProducts;

