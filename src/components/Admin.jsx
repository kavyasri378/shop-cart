import { useState } from "react";

const Admin = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    name: "",
    original_price: "",
    selling_price: "",
    category: "",
    ratings: "",
    image_url: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: parseInt(formData.product_id),
          name: formData.name,
          original_price: parseFloat(formData.original_price),
          selling_price: parseFloat(formData.selling_price),
          category: formData.category,
          ratings: parseFloat(formData.ratings),
          image_url: formData.image_url
        }),
      });
      const data = await res.json();
      alert(data.message || "Product added successfully!");
      setFormData({
        product_id: "",
        name: "",
        original_price: "",
        selling_price: "",
        category: "",
        ratings: "",
        image_url: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">👩‍💼 Admin Panel</h1>

      <div className="bg-gray-100 p-6 rounded-xl shadow-lg max-w-md mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        <input type="number" name="product_id" placeholder="Product ID" value={formData.product_id} onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="number" name="original_price" placeholder="Original Price" value={formData.original_price} onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="number" name="selling_price" placeholder="Selling Price" value={formData.selling_price} onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="number" step="0.1" name="ratings" placeholder="Ratings" value={formData.ratings} onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>
        <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} className="border p-2 w-full mb-3 rounded"/>

        <button onClick={handleAddProduct} className="bg-purple-700 text-white px-4 py-2 rounded-lg w-full">
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Admin;
