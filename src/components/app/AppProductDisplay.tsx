"use client"
import React, { useState } from "react";

type Product = {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  category_name: string;
  productItems: {
    id: number;
    createdAt: Date | null;
    updatedAt: Date | null;
    categoryId: number;
    description: string | null;
    price: string;
    imageName: string;
  }[];
};

type ProductListProps = {
  products: Product[];
};

const AppProductDisplay = ({ products }: ProductListProps) => {
  const [newProduct, setNewProduct] = useState({
    categoryId: 0,
    description: "",
    price: "",
    imageName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New product submitted:", newProduct);
    // TODO: เพิ่ม logic การบันทึกข้อมูลจริง
    setNewProduct({
      categoryId: 0,
      description: "",
      price: "",
      imageName: "",
    });
  };

  return (
    <div className="p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold">เพิ่มสินค้าใหม่</h2>

        <select
          name="categoryId"
          value={newProduct.categoryId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value={0}>เลือกหมวดหมู่</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.category_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="description"
          placeholder="รายละเอียดสินค้า"
          value={newProduct.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="price"
          placeholder="ราคา"
          value={newProduct.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="imageName"
          placeholder="ชื่อรูปภาพ"
          value={newProduct.imageName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          บันทึกสินค้า
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-2">{product.category_name}</h3>
            {product.productItems.map((item) => (
              <div key={item.id} className="border-t py-2">
                <div>📦 {item.description}</div>
                <div>💰 {item.price} บาท</div>
                <div>🖼️ {item.imageName}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppProductDisplay;
