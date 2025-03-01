import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CheckoutForm = ({ cart, clearCart }) => {
    return (
        <Formik
            initialValues={{ name: "", email: "", address: "" }}
            validationSchema={Yup.object({
                name: Yup.string().required("Required"),
                email: Yup.string().email("Invalid email").required("Required"),
                address: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                axios.post("http://localhost:5000/api/order", { ...values, items: cart })
                    .then(() => {
                        alert("Order placed successfully!");
                        clearCart();
                    })
                    .catch(err => console.log(err));
                setSubmitting(false);
            }}
        >
            <Form>
                <Field name="name" placeholder="Name" />
                <ErrorMessage name="name" />
                <Field name="email" placeholder="Email" />
                <ErrorMessage name="email" />
                <Field name="address" placeholder="Address" />
                <ErrorMessage name="address" />
                <button type="submit">Submit Order</button>
            </Form>
        </Formik>
    );
};

export default CheckoutForm;
