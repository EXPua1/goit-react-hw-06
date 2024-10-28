import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

const ContactForm = () => {
  const contacts = useSelector((state) => state.userData.contacts);
  const dispatch = useDispatch();
  const addContact = (newContact) => {
    const action = {
      type: "contacts/addContact",
      payload: newContact,
    };
    dispatch(action);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters"),
    number: Yup.string()
      .required("Number is required")
      .matches(/^\+380\d{9}$/, "Number must be in the format +380XXXXXXXXX") // Убедитесь, что номер соответствует формату
      .min(12, "Minimum 12 characters") // Длина номера с кодом страны
      .max(13, "Maximum 13 characters"), // Максимальная длина номера с кодом страны
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(), // Генеруємо новий ID
      name: values.name,
      number: values.number,
    };
    addContact(newContact); // Виклик функції для додавання контакту
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label htmlFor="name">Name</label>
        <Field type="text" name="name" />
        <ErrorMessage name="name" component="div" className={css.error} />

        <label htmlFor="number">Number</label>
        <Field type="text" name="number" />
        <ErrorMessage name="number" component="div" className={css.error} />

        <button type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
