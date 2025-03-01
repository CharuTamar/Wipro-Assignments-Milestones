import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        address: Yup.string().required("Address is required"),
    });

    const handleSubmit = (values) => {
        console.log("Order Submitted:", values);
        localStorage.removeItem("cart"); // Clear cart after order
        setOrderPlaced(true);
        setTimeout(() => navigate("/confirmation"), 2000);
    };

    return (
        <div className="container mt-5">
            <h2>Checkout</h2>
            {orderPlaced ? (
                <p>Processing your order...</p>
            ) : (
                <Formik
                    initialValues={{ name: "", email: "", address: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="mb-3">
                            <label>Name:</label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label>Email:</label>
                            <Field type="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <label>Address:</label>
                            <Field type="text" name="address" className="form-control" />
                            <ErrorMessage name="address" component="div" className="text-danger" />
                        </div>
                        <button type="submit" className="btn btn-success">Place Order</button>
                    </Form>
                </Formik>
            )}
        </div>
    );
};

export default CheckoutPage;
