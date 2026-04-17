import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bglogin from './bglogin.png';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
        login(); // Mengubah status menjadi isLoggedIn: true
        navigate('/profile'); // Langsung diarahkan ke halaman profil
    };

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '85vh', background: '#fff' }}>
            {/* Visual Side (Kiri) */}
            <div style={{ 
                background: `url(${bglogin})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                position: 'relative'
            }}>
                <div style={{ 
                    position: 'absolute', inset: 0, background: 'rgba(74, 93, 35, 0.2)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '4rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#fff' }}>The Atelier</h2>
                        <p style={{ letterSpacing: '3px', fontSize: '0.8rem', fontWeight: '300' }}>JOIN THE INNER CIRCLE OF ELEGANCE</p>
                    </div>
                </div>
            </div>

            {/* Form Side (Kanan) */}
            <div style={{ 
                display: 'flex', flexDirection: 'column', justifyContent: 'center', 
                padding: '10% 15%', background: 'var(--bg)' 
            }}>
                <div style={{ marginBottom: '3rem' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--olive)', fontWeight: '700', letterSpacing: '4px', marginBottom: '0.5rem' }}>WELCOME BACK</p>
                    <h2 style={{ fontSize: '2.5rem', textTransform: 'none', fontFamily: "'Cormorant Garamond', serif" }}>Access your account</h2>
                </div>

                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <label style={{ fontSize: '0.6rem', fontWeight: '700', color: '#999', position: 'absolute', top: '-15px', left: 0 }}>EMAIL ADDRESS</label>
                        <input className="input-minimal" defaultValue="prycillia@voile.com" style={{ fontSize: '0.9rem', padding: '15px 0' }} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <label style={{ fontSize: '0.6rem', fontWeight: '700', color: '#999', position: 'absolute', top: '-15px', left: 0 }}>PASSWORD</label>
                        <input className="input-minimal" type="password" placeholder="••••••••" style={{ fontSize: '0.9rem', padding: '15px 0' }} />
                        <p style={{ fontSize: '0.6rem', marginTop: '8px', color: 'var(--olive-light)', fontStyle: 'italic' }}>Hint: admin123</p>
                    </div>
                    
                    <div style={{ marginTop: '1.5rem' }}>
                        <button className="btn btn-olive" style={{ width: '100%', padding: '1.5rem', borderRadius: '0' }} onClick={handleLogin}>
                            Identify Yourself
                        </button>
                        
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <p style={{ fontSize: '0.7rem', color: '#666' }}>
                                New to Voile Chic? <span style={{ color: 'var(--olive)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>Create an account</span>
                            </p>
                            <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '1rem', cursor: 'pointer' }}>Forgot your password?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
