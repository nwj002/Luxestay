// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { registerUserApi } from "../apis/api";
// import "./Register.css"; // Import the styles for this component

// const Register = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         name: "",
//         phone: "",
//         password: "",
//     });

//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");

//         const data = {
//             name: formData.name,
//             phone: formData.phone,
//             password: formData.password,
//         }
//         registerUserApi(data).then((res) => {
//             if (res.data.success === false) {
//                 setError(res.data.message);
//             } else {
//                 setSuccess("Registration successful! Redirecting to login...");
//                 setTimeout(() => {
//                     onClose();
//                     navigate("/login");
//                 }, 2000);
//             }
//         }).catch((err) => {
//             //error message
//             toast.error(err.response.data.message)
//         })
//     };

//     return (
//         <div className="register-overlay">
//             <div className="register-container">
//                 <button className="close-btn" onClick={onClose}>
//                     ×
//                 </button>
//                 <div className="register-form">
//                     <h1>Luxestay</h1>
//                     <p>Book Your Stay, Your Way – Sign Up Today!</p>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label>Full Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Enter your Fullname"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Phone Number</label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 placeholder="Enter your Phone number"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter your password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         {error && <p className="error">{error}</p>}
//                         {success && <p className="success">{success}</p>}
//                         <button type="submit" className="btn-submit">
//                             Create Account
//                         </button>
//                     </form>
//                     <p>
//                         Already have an account?{" "}
//                         <span className="login-link" onClick={() => navigate("/login")}>
//                             Login
//                         </span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css"; // Import the styles for this component

const Register = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "", // Added email field
        phone: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:5000/api/users/register", formData);
            if (response.status === 201) {
                setSuccess("Registration successful! Redirecting to login...");
                toast.success("Account created successfully!");
                setTimeout(() => {
                    onClose();
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="register-overlay">
            <div className="register-container">
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>
                <div className="register-form">
                    <h1>Luxestay</h1>
                    <p>Book Your Stay, Your Way – Sign Up Today!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your Fullname"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter your Phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                        <button type="submit" className="btn-submit">
                            Create Account
                        </button>
                    </form>
                    <p>
                        Already have an account?{" "}
                        <span className="login-link" onClick={() => navigate("/login")}>
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { registerUserApi } from "../apis/api";
// import "./Register.css"; // Import the styles for this component

// const Register = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "", // Added email field
//         phone: "",
//         password: "",
//     });

//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");

//         const data = {
//             name: formData.name,
//             email: formData.email, // Include email in the payload
//             phone: formData.phone,
//             password: formData.password,
//         };

//         registerUserApi(formData)
//             .then((res) => {
//                 if (res.data.success === false) {
//                     setError(res.data.message);
//                 } else {
//                     setSuccess("Registration successful! Redirecting to login...");
//                     setTimeout(() => {
//                         onClose();
//                         navigate("/login");
//                     }, 2000);
//                 }
//             })
//             .catch((err) => {
//                 toast.error(err.response?.data?.message || "Something went wrong");
//             });
//     };

//     return (
//         <div className="register-overlay">
//             <div className="register-container">
//                 <button className="close-btn" onClick={onClose}>
//                     ×
//                 </button>
//                 <div className="register-form">
//                     <h1>Luxestay</h1>
//                     <p>Book Your Stay, Your Way – Sign Up Today!</p>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label>Full Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Enter your Fullname"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Email Address</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter your Email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Phone Number</label>
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 placeholder="Enter your Phone number"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter your password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                         {error && <p className="error">{error}</p>}
//                         {success && <p className="success">{success}</p>}
//                         <button type="submit" className="btn-submit">
//                             Create Account
//                         </button>
//                     </form>
//                     <p>
//                         Already have an account?{" "}
//                         <span className="login-link" onClick={() => navigate("/login")}>
//                             Login
//                         </span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;
