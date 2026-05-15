import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { isLoggedIn, getUser } from "../utils/auth";
import Message from "../components/Message";
import { Formik, Form, Field } from "formik";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const user = getUser();
  const isAdmin = user?.role === "admin";

  const getProducts = async (values = {}) => {
    setLoading(true);
    setError("");

    try {
      const params = {};
      if (values.search) params.search = values.search;
      if (values.category) params.category = values.category;

      const res = await api.get("/products", { params });
      setProducts(Array.isArray(res.data) ? res.data : res.data.products || res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    setError("");
    setSuccess("");

    if (!isLoggedIn()) {
      setError("Please login first to add products to cart");
      return;
    }

    try {
      await api.post("/cart/add", { productId, quantity: 1 });
      setSuccess("Product added to cart successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product to cart");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setSuccess("Product deleted successfully");
      getProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Home</h1>
          <p>Browse accessories and add them to your cart.</p>
        </div>
        {isAdmin && <Link to="/products/add" className="primary-link small">Add Product</Link>}
      </div>

      <Formik
        initialValues={{ search: "", category: "" }}
        onSubmit={(values, { setSubmitting }) => {
          getProducts(values).finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="filters">
            <Field name="search" placeholder="Search products" />
            <Field as="select" name="category">
              <option value="">All Categories</option>
              <option value="Bracelet">Bracelet</option>
              <option value="Earring">Earring</option>
              <option value="Necklace">Necklace</option>
              <option value="Ring">Ring</option>
            </Field>
            <button type="submit" disabled={isSubmitting || loading}>Search</button>
          </Form>
        )}
      </Formik>

      <Message type="error">{error}</Message>
      <Message type="success">{success}</Message>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid">
          {products.map((product) => {
            const id = product._id || product.id;
            return (
              <article className="card product-card" key={id}>
                <div className="image-box">
                  {product.image ? <img src={product.image} alt={product.name} /> : <span>No Image</span>}
                </div>
                <h3>{product.name}</h3>
                <p>{product.description || "No description"}</p>
                <p className="price">EGP {product.price}</p>
                <p className="muted">Category: {product.category || "N/A"}</p>
                <p className="muted">Stock: {product.stock ?? "N/A"}</p>
                <div className="card-actions">
                  {!isAdmin && <button onClick={() => addToCart(id)}>Add to Cart</button>}
                  <Link to={`/products/${id}`}>Details</Link>
                  {isAdmin && (
                    <>
                      <Link to={`/products/edit/${id}`}>Edit</Link>
                      <button style={{ backgroundColor: "#dc3545" }} onClick={() => handleDelete(id)}>Delete</button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Home;
