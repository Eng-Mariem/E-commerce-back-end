import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Message from "../components/Message";
import { Formik, Form, Field } from "formik";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product || res.data.data || res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load product");
    }
  };

  const getFeedback = async () => {
    try {
      const res = await api.get(`/feedback/product/${id}`);
      setFeedback(Array.isArray(res.data) ? res.data : res.data.feedback || res.data.data || []);
    } catch {
      setFeedback([]);
    }
  };

  useEffect(() => {
    getProduct();
    getFeedback();
  }, [id]);

  if (!product) {
    return <section className="page"><Message type="error">{error}</Message><p>Loading product...</p></section>;
  }

  return (
    <section className="page details-layout">
      <div className="card details-card">
        <div className="image-box large">
          {product.image ? <img src={product.image} alt={product.name} /> : <span>No Image</span>}
        </div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">EGP {product.price}</p>
        <p className="muted">Category: {product.category || "N/A"}</p>
        <p className="muted">Stock: {product.stock ?? "N/A"}</p>
      </div>

      <div className="card">
        <h2>Feedback</h2>
        <Message type="error">{error}</Message>
        <Message type="success">{success}</Message>

        <Formik
          initialValues={{ rating: 5, comment: "" }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setError("");
            setSuccess("");
            try {
              await api.post("/feedback", { productId: id, rating: Number(values.rating), comment: values.comment });
              setSuccess("Feedback added successfully");
              getFeedback();
              resetForm();
            } catch (err) {
              setError(err.response?.data?.message || "Failed to add feedback");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field type="number" name="rating" min="1" max="5" required />
              <Field as="textarea" name="comment" placeholder="Write your feedback" required />
              <button type="submit" disabled={isSubmitting}>Add Feedback</button>
            </Form>
          )}
        </Formik>

        <div className="feedback-list">
          {feedback.map((item) => {
            const userName = item.user?.name || item.userId?.name || item.userName || item.user?.firstName || "Anonymous User";
            return (
              <div className="feedback-item" key={item._id || item.id}>
                <div className="feedback-header">
                  <strong>{userName}</strong>
                  <span className="muted" style={{ marginLeft: "10px" }}>Rating: {item.rating}/5</span>
                </div>
                <p>{item.comment}</p>
              </div>
            );
          })}
          {feedback.length === 0 && <p className="muted">No feedback yet.</p>}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
