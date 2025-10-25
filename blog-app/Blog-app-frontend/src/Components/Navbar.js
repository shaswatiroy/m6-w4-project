import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Contexts/user/userContext';


const Navbar = () => {
  const context = useContext(userContext);
  const { name } = context;
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate('/newblog')
  }

  const handleLogOut = () => {
    localStorage.removeItem('blog-token');      // logout previous user
    context?.setUser?.(null);
    context.showAlert('info', '👋 You have been logged out successfully. See you soon!');
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">B_LOG</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/personal">Personal Blogs</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            {!localStorage.getItem('blog-token') ? (
              <>
                <button className="btn btn-outline-light" onClick={() => navigate('/register')}>Register</button>
                <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-success" onClick={goToAdd}>
                  <i className="fa-solid fa-plus me-2"></i>
                  Add Blog
                </button>
                <div className="dropdown">
                  <button className="btn btn-outline-light dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user me-2"></i>
                    {name || 'User'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
