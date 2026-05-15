import { useEffect, useState } from "react";
import api from "../api/api";
import { Formik, Form, Field } from "formik";

function Cart() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getCart = async () => {
    try {
      setError("");

      const res = await api.get("/cart");

      // Supports both response shapes:
      // { success: true, cart: {...} } OR cart directly
      setCart(res.data.cart || res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart");
    }
  };


  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      setError("");

      await api.put(`/cart/update/${productId}`, {
        quantity,
      });

      getCart();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      setError("");

      await api.delete(`/cart/remove/${productId}`);

      getCart();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      setError("");

      await api.delete("/cart/clear");

      getCart();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to clear cart");
    }
  };


  useEffect(() => {
    getCart();
  }, []);

  const items = cart?.items || [];

  return (
    <div className="page">
      <h1>Cart</h1>

      {error && <p className="error">{error}</p>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="users-grid">
            {items.map((item, index) => {
              const product = item.product || {};
              const productId =
                product._id || item.productId || item.product || index;

              return (
                <div className="card" key={productId}>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name || "Product"}
                      width="100"
                    />
                  )}

                  <h3>{product.name || "Product"}</h3>

                  <p>Price: {product.price || item.price || 0}</p>
                  <p style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
                    <span>Quantity:</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(productId, item.quantity - 1)
                      }
                      style={{ padding: "4px 10px", fontSize: "16px", borderRadius: "4px" }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: "bold", fontSize: "16px", minWidth: "20px", textAlign: "center" }}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(productId, item.quantity + 1)
                      }
                      style={{ padding: "4px 10px", fontSize: "16px", borderRadius: "4px" }}
                    >
                      +
                    </button>
                  </p>

                  <button type="button" onClick={() => removeItem(productId)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <h2>Total Price: {cart?.totalPrice || 0}</h2>

          <button type="button" onClick={clearCart}>
            Clear Cart
          </button>

          <Formik
            initialValues={{ shippingAddress: "" }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              if (!values.shippingAddress.trim()) {
                setError("Please enter shipping address");
                setSubmitting(false);
                return;
              }

              try {
                setLoading(true);
                setError("");
                await api.post("/orders", {
                  shippingAddress: values.shippingAddress.trim(),
                });
                alert("Order created successfully");
                getCart();
                resetForm();
              } catch (err) {
                console.log("ORDER ERROR:", err.response?.data || err.message);
                setError(err.response?.data?.message || "Failed to create order");
              } finally {
                setLoading(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="card" style={{ marginTop: "20px" }}>
                  <h2>Shipping Address</h2>
                  <Field
                    as="textarea"
                    name="shippingAddress"
                    placeholder="Enter full shipping address"
                    rows="4"
                    style={{
                      width: "100%",
                      padding: "10px",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button type="submit" disabled={isSubmitting || loading}>
                  {isSubmitting || loading ? "Creating Order..." : "Create Order"}
                </button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
}

export default Cart;