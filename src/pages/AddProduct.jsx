import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import ProductForm from "../components/ProductForm";
import Message from "../components/Message";

function AddProduct() {
  const navigate = useNavigate();
  const initialValues = { name: "", description: "", price: "", category: "", image: "", stock: "" };
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setError("");

    try {
      await api.post("/products", {
        ...values,
        price: Number(values.price),
        stock: values.stock === "" ? undefined : Number(values.stock),
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product. Admin account may be required.");
    }
  };

  return (
    <section className="page narrow-page">
      <h1>Add Product</h1>
      <Message type="error">{error}</Message>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} buttonText="Create Product" />
    </section>
  );
}

export default AddProduct;
