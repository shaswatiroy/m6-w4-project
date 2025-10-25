import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Contexts/user/userContext'


const Login = () => {
    const context = useContext(userContext);
    const { showAlert, url, fetchName } = context;
    const navigate = useNavigate();
    const [creds, setCreds] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`${url}/auth/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

            },

            body: JSON.stringify({ email: creds.email, password: creds.password }) // body data type must match "Content-Type" 
        });
        const json = await response.json();
        setLoading(false);
        if (json.attempt === 'success') {
            localStorage.setItem('blog-token', json.token);
            showAlert('success', '🎉 Welcome back! You have successfully logged in.');
            fetchName();
            navigate('/');
        }
        else {
            console.log('fail');
            if (Array.isArray(json.errors)) {
                showAlert('fail', json.errors[0].msg);
            }
            else {
                showAlert('fail', json.errors.msg);
            }
        }
    }

    const toggleHideShow = () => {
        const pwd = document.getElementById('password');
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
                            <h1 className="h3 mb-4 text-center">Login</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type='email' className="form-control" name='email' value={creds.email} onChange={handleChange} placeholder='Enter your email' />
                                </div>
                                <div className="mb-3 position-relative">
                                    <label className="form-label">Password</label>
                                    <input type="password" id="password" className="form-control" name='password' value={creds.password} onChange={handleChange} placeholder='Enter your password' required />
                                    <button type="button" id="eye" className="btn btn-link position-absolute bottom-0 end-0 mt-4 me-2" onClick={toggleHideShow}>
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center align-items-center">
                                    Login {loading && <span className="ms-2 spinner-border spinner-border-sm"></span>}
                                </button>
                            </form>
                            <div className="d-flex justify-content-between mt-3">
                                <Link to='/register'>New user? Register</Link>
                                <Link to='/'>Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
