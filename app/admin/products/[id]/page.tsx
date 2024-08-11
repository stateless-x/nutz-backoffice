"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '@/app/Components/ProductForm';

type Product = {
  id?: number;
  name: string;
  description: string;
  price: string;
  status: string;
};

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error("Error fetching product:", error);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        router.push('/admin/products');
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSubmit = async (values: Product) => {
    if (id) {
      try {
        await axios.put(`http://localhost:3000/products/${id}`, values);
        router.push('/admin/products');
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductForm
      initialValues={product}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  );
}
