import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // 🔹 Fetch single product from backend
  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      const data = await res.json();

      // Map backend response
      const mapped = {
        id: data.product_id,
        name: data.name,
        price: data.selling_price,
        original_price: data.original_price,
        image: data.image_url,
        category: data.category,
        ratings: data.ratings,
        description: data.description, // optional if available
      };

      setProduct(mapped);
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-wrap gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-[400px] h-[400px] object-cover rounded-xl"
        />
        <div className="flex flex-col gap-3 text-lg">
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Original Price:</strong> ₹{product.original_price}
          </p>
          <p>
            <strong>Selling Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Ratings:</strong> {product.ratings} ⭐
          </p>
          {product.description && (
            <p>
              <strong>Description:</strong> {product.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
