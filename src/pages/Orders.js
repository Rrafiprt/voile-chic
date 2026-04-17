import React from 'react';
// 1. IMPORT YANG BENAR:
import { useOrder } from '../context/OrderContext';

function Orders() {
    // 2. CARA PANGGIL YANG BENAR (Pakai kurung kurawal):
    const { orders, cancelOrder } = useOrder();

    return (
        <section style={{ padding: '6rem 6%', minHeight: '65vh' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '4rem', fontFamily: "'Cormorant Garamond', serif" }}>Track Your Orders</h2>
            
            {!orders || orders.length === 0 ? (
                <p style={{ opacity: 0.5 }}>No active orders found. Let's shop!</p>
            ) : (
                orders.map((o) => (
                    <div key={o.id} style={{ background: 'white', padding: '3rem', border: '1px solid #EEE', marginBottom: '2rem', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                            <div>
                                <h3 style={{ color: 'var(--olive)', fontFamily: "'Cormorant Garamond', serif" }}>ORDER {o.id}</h3>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>Placed on {o.date}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: '700' }}>IDR {o?.total?.toLocaleString()}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginBottom: '3rem' }}>
                            <div className="track-step active"><div className="step-dot"></div><p style={{ fontSize: '0.6rem', fontWeight: '700' }}>PAID</p></div>
                            <div className="track-step active"><div className="step-dot"></div><p style={{ fontSize: '0.6rem', fontWeight: '700' }}>PROCESSING</p></div>
                            <div className="track-step"><div className="step-dot"></div><p style={{ fontSize: '0.6rem', fontWeight: '700' }}>SHIPPED</p></div>
                            <div className="track-step"><div className="step-dot"></div><p style={{ fontSize: '0.6rem', fontWeight: '700' }}>DELIVERED</p></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F5F5F5', paddingTop: '2rem' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span key={star} onClick={() => alert("Thank you for your rating!")} style={{ cursor: 'pointer', fontSize: '1.2rem' }}>☆</span>
                                ))}
                            </div>
                            {/* 3. TOMBOL CANCEL YANG BENAR: */}
                            <button className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.6rem', border: '1px solid #DDD', color: '#999' }} 
                                    onClick={() => cancelOrder(o.id)}>
                                Cancel Order
                            </button>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}

export default Orders;