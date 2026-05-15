import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import ProductForm from "../components/ProductForm";
import Message from "../components/Message";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({ name: "", description: "", price: "", category: "", image: "", stock: "" });
  const [error, setError] = useState("");

  const getProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      const product = res.data.product || res.data.data || res.data;
      setInitialValues({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",
        stock: product.stock ?? "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load product");
    }
  };

  const handleSubmit = async (values) => {
    setError("");

    try {
      await api.put(`/products/${id}`, {
        ...values,
        price: Number(values.price),
        stock: values.stock === "" ? undefined : Number(values.stock),
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product. Admin account may be required.");
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <section className="page narrow-page">
      <h1>Edit Product</h1>
      <Message type="error">{error}</Message>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} buttonText="Update Product" />
    </section>
  );
}

export default EditProduct;
