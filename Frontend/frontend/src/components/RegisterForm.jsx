
import React, { useState } from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";

function RegisterForm() {

const navigate=useNavigate();

    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phoneNumber: "",
        gender: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:5000/api/add",
                {
                    userName: form.userName,
                    email: form.email,
                    password: form.password,
                    address: form.address,
                    phoneNumber: form.phoneNumber,
                    gender: form.gender
                }
            );

            console.log(response.data);

            alert("Registration successful");
            navigate("/")
             setForm({
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                phoneNumber: "",
                gender: ""
            });

        } catch (error) {

            console.log("Registration error:", error);

           
            if (error.response) {
                alert(error.response.data.message || "Registration failed");
            } else {
                alert("Backend connection failed");
            }
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                User Registration
                            </h2>

                            <form onSubmit={handleSubmit}>

                              
                     <div className="mb-3">
                                    <label className="form-label">
                                        User Name
                                    </label>

                  <input  type="text"  name="userName" className="form-control"  value={form.userName}  onChange={handleChange} placeholder="Enter user name"required />
                    </div>

                             
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>

                             
                                <div className="mb-3">
                                    <label className="form-label">
                                        Create Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Create password"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        required
                                    />
                                </div>

                              
                                <div className="mb-3">
                                    <label className="form-label">
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows="3"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="Enter address"
                                        required
                                    ></textarea>
                                </div>

                              
                                <div className="mb-3">
                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>

                               
                                <div className="mb-3">

                                    <label className="form-label">
                                        Gender
                                    </label>

                                    <div>

                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={form.gender === "Male"}
                                                onChange={handleChange}
                                            />

                                            <label className="form-check-label">
                                                Male
                                            </label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                value="Female"
                                                checked={form.gender === "Female"}
                                                onChange={handleChange}
                                            />

                                            <label className="form-check-label">
                                                Female
                                            </label>
                                        </div>

                                      

                                    </div>
                                </div>

                               
                                <div className="d-grid">

                                    <button
                                        type="submit" 
                                        className="btn btn-primary "
                                      >
                                        Register
                                    </button>
                       <center>       <Link to="/"  >    <p>Log in</p></Link></center>

                                </div>

                            </form>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default RegisterForm;

