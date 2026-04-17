import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bgmemberhd from './bgmemberhd.jpg';

// CARA MENGGUNAKAN FOTO LOKAL (Hapus tanda // di bawah ini jika ingin pakai foto sendiri):
// import bgProfile from './bgprofile.png'; 

function Profile() {
    const { user = {}, setUser, logout } = useAuth() || {};
    const navigate = useNavigate();

    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({ 
        name: user?.name || '', 
        address: user?.address || '', 
        phone: user?.phone || '' 
    });

    const handleLogout = () => {
        if (logout) logout();
        navigate('/'); 
    };

    if (!user || Object.keys(user).length === 0) {
        return (
            <section style={{ padding:'10rem 6%', textAlign: 'center', minHeight: '65vh' }}>
                <h2 style={{ color: 'var(--olive)' }}>Memuat Profil...</h2>
            </section>
        );
    }

    return (
        <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'center', padding: '6rem 6%', overflow: 'hidden' }}>
            
            {/* 1. LAYER GAMBAR (Di Belakang) */}
            <div style={{ 
                position: 'absolute',
                inset: 0, // Singkatan dari top:0, left:0, right:0, bottom:0
                // Ganti URL di bawah menjadi `url(${bgProfile})` jika Anda memakai file lokal
                background: `url(${bgmemberhd})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1
            }}>
                {/* Efek Kaca / Overlay Putih Semi-transparan agar tulisan mudah dibaca */}
                <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'rgba(253, 251, 250, 0.85)', 
                    backdropFilter: 'blur(0.3px)' // Efek buram elegan
                }}></div>
            </div>

            {/* 2. LAYER KONTEN / FORM (Di Depan) */}
            <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', fontFamily: "'Cormorant Garamond', serif" }}>Member Profile</h2>
                
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ fontSize: '0.6rem', fontWeight: '700', color: 'var(--olive)' }}>FULL NAME</label>
                        <input className="input-minimal" value={edit ? form.name : user.name} readOnly={!edit} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.6rem', fontWeight: '700', color: 'var(--olive)' }}>SHIPPING ADDRESS</label>
                        <input className="input-minimal" value={edit ? form.address : user.address} readOnly={!edit} onChange={e => setForm({...form, address: e.target.value})} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.6rem', fontWeight: '700', color: 'var(--olive)' }}>PHONE</label>
                        <input className="input-minimal" value={edit ? form.phone : user.phone} readOnly={!edit} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '4rem' }}>
                    {edit ? (
                        <button className="btn btn-olive" onClick={() => { setUser(form); setEdit(false); }}>Save Profile</button>
                    ) : (
                        <button className="btn btn-outline" onClick={() => setEdit(true)}>Edit Profile</button>
                    )}
                    <button className="btn" style={{ background: '#F5F5F5', color: 'var(--dark)' }} onClick={handleLogout}>Logout</button>
                </div>
            </div>

        </section>
    );
}

export default Profile;