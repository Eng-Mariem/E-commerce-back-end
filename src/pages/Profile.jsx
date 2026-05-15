import { useEffect, useState } from "react";
import api from "../api/api";
import Message from "../components/Message";
import { saveAuth, getToken } from "../utils/auth";
import { Formik, Form, Field } from "formik";

function Profile() {
  const [initialValues, setInitialValues] = useState({ name: "", email: "", profilePicture: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      const user = res.data.user || res.data.data || res.data;
      setInitialValues({
        name: user.name || "",
        email: user.email || "",
        profilePicture: user.profilePicture || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    }
  };

  const updateProfile = async (values, { setSubmitting }) => {
    setError("");
    setSuccess("");

    try {
      const res = await api.put("/auth/profile", values);
      const user = res.data.user || res.data.data || res.data;
      saveAuth(getToken(), user);
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="page narrow-page">
      <h1>Profile</h1>
      <Message type="error">{error}</Message>
      <Message type="success">{success}</Message>

      {initialValues.profilePicture && <img src={initialValues.profilePicture} alt={initialValues.name} className="avatar" />}

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={updateProfile}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Field name="name" placeholder="Name" required />
            <Field name="email" type="email" placeholder="Email" required />
            <button type="submit" disabled={isSubmitting}>Update Profile</button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Profile;
