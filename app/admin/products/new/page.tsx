"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ProductForm from '@/app/Components/ProductForm';

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  status: string;
};

const initialProductValues: ProductFormState = {
  name: '',
  description: '',
  price: '',
  status: '',
};

export default function NewProduct() {
  const router = useRouter();
  const handleSubmit = async (values: ProductFormState) => {
    try {
      await axios.post('http://localhost:3000/products', values);
      router.push('/admin/products'); // Redirect to products list after successful creation
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <ProductForm
      initialValues={initialProductValues}
      onSubmit={handleSubmit}
    />
  );
}
