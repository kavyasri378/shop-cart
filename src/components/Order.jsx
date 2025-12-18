import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    fetch(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  // 🔹 Delete order
const deleteOrder = async (orderId) => {
  const token = sessionStorage.getItem("token");

  try {
    await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // instant UI update
    setOrders(prev => prev.filter(o => o._id !== orderId));
  } catch (err) {
    console.error("Delete order failed", err);
  }
};

// 🔹 Update order (example: refresh same order)
const updateOrder = async (order) => {
  const token = sessionStorage.getItem("token");

  try {
    await fetch(`${BASE_URL}/orders/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        items: order.items,
        totalAmount: order.totalAmount
      })
    });

    alert("Order updated successfully");
  } catch (err) {
    console.error("Update order failed", err);
  }
};


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📦 Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-xl">No orders placed yet.</p>
      ) : (
        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-gray-200 p-6 rounded-xl shadow-xl"
            >
              {/* Order Header */}
              <div className="flex justify-between mb-4">
                <p className="font-semibold">
                  Order #{index + 1}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Order Items */}
              <div className="flex flex-wrap gap-6 justify-center">
                {order.items.map((item) => (
                  <div
                    key={item.product_id}
                    className="bg-white p-4 rounded-xl w-[250px] shadow text-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[200px] h-[200px] mx-auto mb-3 rounded-lg"
                    />
                    <p className="font-semibold">{item.name}</p>
                    <p>₹ {item.price}</p>
                    <p>Qty: {item.qty}</p>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="text-right mt-4">
                <p className="text-xl font-bold">
                  Total: ₹ {order.totalAmount}
                </p>
              </div>

              <div className="flex justify-end gap-4 mt-4">
  <button
    onClick={() => updateOrder(order)}
    className="bg-blue-600 text-white px-4 py-1 rounded"
  >
    ✏️ Update
  </button>

  <button
    onClick={() => deleteOrder(order._id)}
    className="bg-red-600 text-white px-4 py-1 rounded"
  >
    🗑 Delete
  </button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
