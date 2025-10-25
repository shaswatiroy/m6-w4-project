import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Contexts/user/userContext'


const Register = () => {
    const context = useContext(userContext);
    const { showAlert, fetchName, url } = context;
    const navigate = useNavigate();
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" })
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (creds.password === creds.cpassword) {
            setLoading(true);
            const response = await fetch(`${url}/auth/adduser`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                },

                body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password }) // body data type must match "Content-Type" 
            });
            const json = await response.json();
            setLoading(false);
            if (json.attempt === 'success') {
                localStorage.setItem('blog-token', json.token);
                showAlert('success', '🎉 Registration successful! Welcome to the B_LOG family!');
                fetchName();
                navigate('/');
            }
            else {
                console.log(json.errors);
                if (Array.isArray(json.errors)) {
                    showAlert('fail', json.errors[0].msg);
                }
                else {
                    showAlert('fail', json.errors.msg);
                }
            }

        }
        else {
            showAlert('warning', '⚠️ Passwords do not match. Please check and try again.');
        }

    }

    const toggleHideShow = () => {
        const pwd = document.getElementById('cpass');
        const eye = document.getElementById('eye');
        if (pwd.type === 'password') {
            pwd.type = 'text';
            eye.classList.toggle('fa-eye');
            eye.classList.toggle('fa-eye-slash');
        }
        else {
            pwd.type = 'password';
            eye.classList.toggle('fa-eye');
            eye.classList.toggle('fa-eye-slash');
        }
    }
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="h3 mb-4 text-center">Register</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" id='name' name='name' value={creds.name} onChange={handleChange} placeholder="Enter your name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type='email' className="form-control" id='email' name='email' value={creds.email} onChange={handleChange} placeholder='Enter your email' />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id='pass' name='password' value={creds.password} onChange={handleChange} placeholder='Enter your password' />
                                </div>
                                <div className="mb-3 position-relative">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id='cpass' name='cpassword' value={creds.cpassword} onChange={handleChange} placeholder='Re-enter your password' />
                                    <button type="button" id="eye" className="btn btn-link position-absolute bottom-0 end-0 mt-4 me-2" onClick={toggleHideShow}>
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center align-items-center">
                                    Register {loading && <span className="ms-2 spinner-border spinner-border-sm"></span>}
                                </button>
                            </form>
                            <div className="d-flex justify-content-between mt-3">
                                <Link to='/login' className="text-decoration-none">Existing user? Login</Link>
                                <Link to='/' className="text-decoration-none">Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
