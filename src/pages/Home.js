import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from './bghome.png';

function Home() {
    const navigate = useNavigate();
    return (
        <section style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            
            {/* 1. LAYER GAMBAR (Di Belakang) */}
            <div style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `url(${bgImage})`,  
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                zIndex: 1
            }}>
                {/* Opsional: Lapisan tipis (overlay) agar teks tetap mudah dibaca di atas gambar */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(234, 231, 225, 0.7)' }}></div>
            </div>

            {/* 2. LAYER TEKS (Di Depan) */}
            <div style={{ zIndex: 2, position: 'relative' }}>
                <p style={{ letterSpacing: '4px', marginBottom: '1rem', fontWeight: '600', color: 'var(--dark)' }}>COLLECTION 2026</p>
                <h1 style={{ fontSize: '6rem', color: 'var(--olive)', marginBottom: '2rem', fontFamily: "'Cormorant Garamond', serif" }}>ETHEREAL ESSENCE</h1>
                <button className="btn btn-olive" onClick={() => navigate('/shop')}>Discover The Collection</button>
            </div>
            
        </section>
    );
}

export default Home;