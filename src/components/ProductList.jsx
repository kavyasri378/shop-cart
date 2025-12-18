import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../api";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();

      // backend → frontend mapping
      const mapped = data.map((p) => ({
        id: p.product_id,
        name: p.name,
        price: p.selling_price,
        image: p.image_url
      }));

      setAllProducts(mapped);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 ADD TO CART → DB (MongoDB)
  const addToCart = async (product) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          item: {
            product_id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
          }
        })
      });

      const data = await res.json();
      alert("Item added to cart 🛒");
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Product <span className="text-green-600">Categories</span>
      </h1>

      {/* 🔹 Refresh Button */}
      <div className="text-center mb-6">
        <button
          onClick={fetchProducts}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Refresh Products
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {allProducts.map((p) => (
          <div
            key={p.id}
            className="m-2 p-3 bg-gray-200 shadow-2xl w-[300px] text-center rounded-xl"
          >
            {/* Product Image */}
            <div
              onClick={() => navigate(`/product/${p.id}`)}
              style={{ backgroundImage: `url(${p.image})` }}
              className="bg-cover bg-center bg-no-repeat w-[250px] h-[250px] rounded-lg mx-auto mb-4 cursor-pointer"
            ></div>

            <p className="text-xl font-serif font-semibold mb-1">{p.name}</p>
            <p className="text-lg font-serif mb-3">₹ {p.price}</p>

            {/* 🔹 DB Add to Cart */}
            <button
              onClick={() => addToCart(p)}
              className="p-2 border rounded-xl hover:bg-green-600 hover:text-white hover:font-semibold"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Go to Cart */}
      <button className="bg-purple-900 py-3 px-5 rounded-xl shadow-xl mx-auto mt-10 text-white text-center block">
        <Link to="/cart">Proceed to Buy</Link>
      </button>
    </div>
  );
};

export default ProductList;
