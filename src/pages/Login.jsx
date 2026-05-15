import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { saveAuth } from "../utils/auth";
import Message from "../components/Message";
import { Formik, Form, Field } from "formik";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");

    try {
      const res = await api.post("/auth/login", values);
      const token = res.data.token || res.data.data?.token;
      const user = res.data.user || res.data.data?.user || null;

      if (!token) throw new Error("No token returned from backend");

      saveAuth(token, user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      setSubmitting(false);
    }
  };

  return (
    <section className="page narrow-page">
      <h1>Login</h1>
      <Message type="error">{error}</Message>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field name="email" type="email" placeholder="Email" required />
            <Field name="password" type="password" placeholder="Password" required />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      <p className="small-text">New user? <Link to="/register">Create account</Link></p>
    </section>
  );
}

export default Login;
