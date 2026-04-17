import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Success() {
    // useLocation digunakan untuk menangkap data 'state' yang dilempar dari navigate Cart.js
    const location = useLocation();
    const navigate = useNavigate();
    
    // Simpan data lemparan ke dalam variabel orderData
    const orderData = location.state;

    return (
        <section style={{padding: '6rem 6%', minHeight: '70vh', textAlign: 'center'}}>
            <div style={{maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem', background: '#F9F8F6', border: '1px solid #EEE'}}>
                
                <h1 style={{color: 'var(--olive)', fontSize: '3rem', marginBottom: '1rem', fontFamily: "'Cormorant Garamond', serif"}}>Payment Successful!</h1>
                <p style={{marginBottom: '3rem', color: '#666'}}>Thank you for your purchase. Your elegant pieces are being prepared.</p>

                {/* AREA MUNCULNYA BARANG (Hanya muncul jika ada data yang dibawa) */}
                {orderData && orderData.orderedItems ? (
                    <div style={{textAlign: 'left', background: 'white', padding: '2rem', marginBottom: '3rem', border: '1px solid #EAE7E1'}}>
                        <h3 style={{fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1.5rem', borderBottom: '1px solid #EEE', paddingBottom: '1rem'}}>ORDER SUMMARY</h3>
                        
                        {orderData.orderedItems.map((item, index) => (
                            <div key={index} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px dotted #EEE', paddingBottom: '1rem'}}>
                                <div style={{display: 'flex', gap: '1rem'}}>
                                    {/* Memunculkan foto barang */}
                                    <img src={item.image} alt={item.name} style={{width: '50px', height: '60px', objectFit: 'cover'}} />
                                    <div>
                                        <p style={{fontWeight: '700', fontSize: '0.9rem'}}>{item.name}</p>
                                        <p style={{fontSize: '0.7rem', color: '#999'}}>Color: {item.color.toUpperCase()} &nbsp;|&nbsp; Qty: {item.qty}</p>
                                    </div>
                                </div>
                                <p style={{fontWeight: '700', fontSize: '0.9rem'}}>IDR {(item.price * item.qty).toLocaleString()}</p>
                            </div>
                        ))}

                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem', fontSize: '1.1rem', fontWeight: '700', color: 'var(--olive)'}}>
                            <span>TOTAL PAID</span>
                            <span>IDR {orderData.finalTotal.toLocaleString()}</span>
                        </div>
                    </div>
                ) : (
                    // Jika user iseng buka /success tanpa belanja dulu
                    <p style={{fontStyle: 'italic', color: '#999', marginBottom: '3rem'}}>Your order details will appear here after a successful checkout.</p>
                )}

                <button className="btn btn-olive" onClick={() => navigate('/shop')}>Continue Shopping</button>
            </div>
        </section>
    );
}

export default Success;