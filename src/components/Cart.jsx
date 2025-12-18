import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // 🔹 Fetch cart from DB
  const fetchCart = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  // 🔹 Load cart on page load
  useEffect(() => {
    fetchCart();
  }, []);

  // 🔹 Calculate total
  useEffect(() => {
    const bill = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    setTotal(bill);
  }, [cartItems]);

  // 🔹 Update quantity in DB
  const updateQty = async (product_id, delta) => {
  // 🔹 Instant UI update
  setCartItems(prev =>
    prev.map(item =>
      item.product_id === product_id
        ? { ...item, qty: Math.max(1, item.qty + delta) }
        : item
    )
  );

  const token = sessionStorage.getItem("token");

  try {
    await fetch(`${BASE_URL}/cart/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ product_id, delta })
    });
  } catch (err) {
    console.error("Quantity update failed", err);
  }
};


// 🔹 Remove single item from cart
const removeItem = async (product_id) => {
  const token = sessionStorage.getItem("token");

  // ✅ Frontend instant remove (Amazon style)
  setCartItems(prev =>
    prev.filter(item => item.product_id !== product_id)
  );

  try {
    await fetch(`${BASE_URL}/cart/item/${product_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error("Remove failed", err);
    fetchCart(); // fallback
  }
};


  // 🔹 Place order → Orders DB + clear Cart DB
  const placeOrder = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: total
        })
      });

      alert("Order placed successfully ✅");
      setCartItems([]);
    } catch (err) {
      alert("Order failed ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 && (
        <p className="text-center text-lg">Your cart is empty</p>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {cartItems.map((item) => (
          <div
            key={item.product_id}
            className="bg-gray-100 p-4 rounded-xl w-[300px] shadow-xl text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[250px] h-[250px] mx-auto mb-3 rounded-lg"
            />

            <p className="text-xl font-semibold">{item.name}</p>
            <p className="text-lg">₹ {item.price}</p>

            <div className="flex justify-center items-center gap-4 mt-2">
              <button
                onClick={() => updateQty(item.product_id, -1)}
                className="px-3 py-1 bg-red-400 text-white rounded"
              >
                -
              </button>

              <span className="text-lg">{item.qty}</span>

              <button
                onClick={() => updateQty(item.product_id, 1)}
                className="px-3 py-1 bg-green-400 text-white rounded"
              >
                +
              </button>
            </div>
            <button
  onClick={() => removeItem(item.product_id)}
  className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
>
  ❌ Remove
</button>

          </div>
        ))}
      </div>

      {/* Total + Order */}
      {cartItems.length > 0 && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">
            Total Amount: ₹ {total}
          </h2>

          <button
            onClick={placeOrder}
            className="mt-6 bg-purple-700 text-white px-4 py-2 rounded-xl"
          >
            Place Order
          </button>

          <button className="bg-purple-900 py-3 px-5 rounded-xl shadow-xl mx-auto mt-10 text-white text-center block">
            <Link to="/orders">My Orders</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
