import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductData } from "../types/type";

const ViewProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card bg-light border-primary">  {/* Added background and border colors */}
              <div className="card-body">
                <h5 className="card-title text-primary">Name:{product.name}</h5> {/* Changed title color */}
                <p className="card-text text-muted">Description:{product.description}</p> {/* Changed description text color */}
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
                <p className="card-text">
                  Seasonal: {product.isSeasonal ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
