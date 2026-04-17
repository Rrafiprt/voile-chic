import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { cart } = useCart();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate('/')}>Voile Chic</div>
            <div className="nav-links">
                <Link to="/" className={`nav-item ${isActive('/')}`}>Home</Link>
                <Link to="/shop" className={`nav-item ${isActive('/shop')}`}>Collection</Link>
                <div className="bag-indicator">
                    <Link to="/cart" className={`nav-item ${isActive('/cart')}`}>Bag</Link>
                    {cart.length > 0 && <div className="bag-badge">{cart.length}</div>}
                </div>
                <Link to="/orders" className="nav-item">Orders</Link>
                {isLoggedIn ? (
                    <Link to="/profile" className={`nav-item ${isActive('/profile')}`}>Profile</Link>
                ) : (
                    <Link to="/login" className={`nav-item ${isActive('/login')}`}>Login</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;