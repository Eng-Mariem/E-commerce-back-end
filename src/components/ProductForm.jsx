import { Formik, Form, Field } from "formik";

function ProductForm({ initialValues, onSubmit, buttonText }) {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <Field name="name" placeholder="Product name" required />
          <Field name="description" as="textarea" placeholder="Description" />
          <Field name="price" type="number" placeholder="Price" required />
          <Field as="select" name="category" required>
            <option value="">Select Category</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Earring">Earring</option>
            <option value="Necklace">Necklace</option>
            <option value="Ring">Ring</option>
          </Field>
          <Field name="image" placeholder="Image URL" />
          <Field name="stock" type="number" placeholder="Stock" />
          <button type="submit" disabled={isSubmitting}>{buttonText}</button>
        </Form>
      )}
    </Formik>
  );
}

export default ProductForm;
