import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { saveAuth } from "../utils/auth";
import Message from "../components/Message";
import { Formik, Form, Field } from "formik";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");

    try {
      const res = await api.post("/auth/register", { ...values, role: "user" });
      const token = res.data?.token || res.data?.data?.token;
      const user = res.data?.user || res.data?.data?.user;
      if (token) {
        saveAuth(token, user);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
      setSubmitting(false);
    }
  };

  return (
    <section className="page narrow-page">
      <h1>Register</h1>
      <Message type="error">{error}</Message>

      <Formik
        initialValues={{ name: "", email: "", password: "", profilePicture: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field name="name" placeholder="Name" required />
            <Field name="email" type="email" placeholder="Email" required />
            <Field name="password" type="password" placeholder="Password" required />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>

      <p className="small-text">Already have an account? <Link to="/login">Login</Link></p>
    </section>
  );
}

export default Register;
