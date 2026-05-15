import { useEffect, useState } from "react";
import api from "../api/api";
import Message from "../components/Message";
import { getUser } from "../utils/auth";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const user = getUser();
  const isAdmin = user?.role === "admin";

  const getOrders = async () => {
    try {
      const endpoint = isAdmin ? "/orders" : "/orders/my-orders";
      const res = await api.get(endpoint);
      setOrders(Array.isArray(res.data) ? res.data : res.data.orders || res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}/status`, { status: newStatus });
      setOrders(orders.map(order => 
        (order._id || order.id) === id ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status");
    }
  };

  useEffect(() => {
    getOrders();
  }, [isAdmin]);

  return (
    <section className="page">
      <h1>{isAdmin ? "All Orders" : "My Orders"}</h1>
      <Message type="error">{error}</Message>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const items = order.items || [];
            const id = order._id || order.id;
            return (
              <article className="card order-card" key={id}>
                <div className="page-header compact" style={{ alignItems: "flex-start" }}>
                  <div>
                    <h3>Order #{String(id).slice(-6)}</h3>
                    {isAdmin && order.user && (
                      <p className="muted" style={{ marginBottom: "8px" }}>
                        User: {order.user.email || order.user.name || order.user}
                      </p>
                    )}
                    {isAdmin ? (
                      <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span className="muted">Status:</span>
                        <select 
                          value={order.status || "pending"} 
                          onChange={(e) => handleStatusChange(id, e.target.value)}
                          style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #ddd1c7" }}
                        >
                          <option value="pending">pending</option>
                          <option value="confirmed">confirmed</option>
                          <option value="shipped">shipped</option>
                          <option value="delivered">delivered</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </div>
                    ) : (
                      <p className="muted">Status: {order.status || "pending"}</p>
                    )}
                  </div>
                  <strong style={{ fontSize: "1.2rem" }}>EGP {order.totalPrice || order.total || 0}</strong>
                </div>

                <div style={{ marginTop: "16px", borderTop: "1px solid #eee2d8", paddingTop: "12px" }}>
                  {items.map((item, index) => {
                    const product = item.product || item.productId || {};
                    return (
                      <p key={index} className="muted">
                        {product.name || "Product"} × {item.quantity || 1}
                      </p>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Orders;
