"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProducts(products.filter(product => product.id !== id)); // Update the state to remove the deleted product
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <Link href="/admin/products/new">
        <span className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</span>
      </Link>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="border-b py-2 flex justify-between items-center">
            <Link href={`/admin/products/${product.id}`}>
              <span className="text-blue-600">{product.name}</span>
            </Link>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-600 text-white px-4 py-2 rounded ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
