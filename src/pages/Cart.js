import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder} from '../context/OrderContext';
// Anda bisa memisahkan CheckoutModal ke file terpisah di src/components/CheckoutModal.js, 
// tapi untuk kemudahan, kita deklarasikan di sini dulu seperti kode asli Anda.

function CheckoutModal({ onConfirm, onCancel, user }) {
    const [address, setAddress] = useState(user.address);
    const [pay, setPay] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{marginBottom:'2.5rem'}}>Secure Checkout</h2>
                <div style={{marginBottom:'1.5rem'}}>
                    <label style={{fontSize:'0.6rem', fontWeight:'700'}}>SHIPPING ADDRESS</label>
                    <input className="input-minimal" value={address} onChange={e=>setAddress(e.target.value)} />
                </div>
                <div style={{marginBottom:'1.5rem'}}>
                    <label style={{fontSize:'0.6rem', fontWeight:'700'}}>PAYMENT METHOD</label>
                    <select className="input-minimal" onChange={e=>setPay(e.target.value)}>
                        <option value="">Select Method</option>
                        <option>Virtual Account Mandiri</option>
                        <option>Credit Card (Visa/Mastercard)</option>
                        <option>GoPay / ShopeePay</option>
                    </select>
                </div>
                <div style={{marginBottom:'2.5rem'}}>
                    <label style={{fontSize:'0.6rem', fontWeight:'700'}}>CONFIRM PASSWORD</label>
                    <input className="input-minimal" type="password" placeholder="Re-enter password" onChange={e=>setPass(e.target.value)} />
                </div>
                <div style={{display:'flex', gap:'10px'}}>
                    <button className="btn btn-outline" style={{flex:1}} onClick={onCancel}>Back</button>
                    <button className="btn btn-olive" style={{flex:1}} onClick={() => {
                        if(address && pay && pass === 'admin123') onConfirm({address});
                        else alert("Please complete form (Pass: admin123)");
                    }}>Pay Now</button>
                </div>
            </div>
        </div>
    );
}

function Cart() {
    const { cart, removeFromBag, updateQty, clearCart } = useCart();
    const { addOrder } = useOrder();
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    const handleCheckout = (details) => {
        // Logika order akan kita bahas nanti, untuk sekarang kita tutup modal dan arahkan ke success
        setShowCheckoutModal(false);

        const newOrder = {
            id: 'VC-' + Math.floor(Math.random() * 10000), // Contoh hasil: VC-4829
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            total: cartTotal,
            status: 'Processing'
        };

        addOrder(newOrder); // Simpan data order ke OrderContext
        navigate('/success', {
            state: {
                orderedItems: cart,
                finalTotal: cartTotal
            }
        });
        clearCart(); // Kosongkan keranjang setelah checkout
    };
    const cartTotal = cart.reduce((s,i) => s + (i.price * i.qty), 0);

    return (
        <section style={{padding:'6rem 6%', minHeight: '80vh'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'4rem', borderBottom: '1px solid #121212', paddingBottom: '1rem'}}>
                <h2 style={{fontSize:'3rem'}}>Shopping Bag</h2>
                <p style={{fontSize: '0.8rem', fontWeight: '600'}}>{cart.length} ITEMS</p>
            </div>

            {cart.length === 0 ? (
                <div style={{textAlign: 'center', padding: '5rem 0'}}>
                    <p style={{opacity:0.5, marginBottom: '2rem'}}>Your bag is as light as air. Let's fill it with something beautiful.</p>
                    <button className="btn btn-outline" onClick={() => navigate('/shop')}>Return to Collection</button>
                </div>
            ) : (
                <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:'5rem'}}>
                    {/* BAGIAN KIRI: Daftar Item */}
                    <div>
                        <div style={{display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 0.2fr', paddingBottom: '1rem', borderBottom: '1px solid #EEE', fontSize: '0.6rem', fontWeight: '700', letterSpacing: '2px', color: '#999'}}>
                            <span>PRODUCT</span>
                            <span style={{textAlign: 'center'}}>QUANTITY</span>
                            <span style={{textAlign: 'right'}}>TOTAL</span>
                            <span></span>
                        </div>

                        {cart.map(item => (
                            <div key={item.bagID} style={{display:'grid', gridTemplateColumns: '3fr 1fr 1fr 0.2fr', alignItems: 'center', padding:'2.5rem 0', borderBottom:'1px solid #F5F5F5'}}>
                                <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
                                    <div style={{width: '80px', height: '100px', background: '#EEE'}}>
                                        <img src={item.image} alt={item.name} style={{width:'100%', height:'100%', objectFit: 'cover'}} />
                                    </div>
                                    <div>
                                        <h3 style={{fontSize:'1rem', marginBottom: '5px'}}>{item.name}</h3>
                                        <p style={{fontSize:'0.65rem', color:'var(--olive)', fontWeight:'700'}}>COLOR: {item.color.toUpperCase()}</p>
                                    </div>
                                </div>

                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', border: '1px solid #EEE', padding: '8px', width: 'fit-content', margin: '0 auto'}}>
                                    <span style={{cursor: 'pointer', fontSize: '1.2rem', padding: '0 5px'}} onClick={() => updateQty(item.bagID, -1)}>−</span>
                                    <span style={{fontSize: '0.9rem', fontWeight: '600', minWidth: '20px', textAlign: 'center'}}>{item.qty}</span>
                                    <span style={{cursor: 'pointer', fontSize: '1.2rem', padding: '0 5px'}} onClick={() => updateQty(item.bagID, 1)}>+</span>
                                </div>

                                <div style={{fontWeight:'700', textAlign: 'right', fontSize: '0.9rem'}}>
                                    IDR {(item.price * item.qty).toLocaleString()}
                                </div>

                                <div style={{textAlign: 'right'}}>
                                    <span 
                                        style={{cursor: 'pointer', color: '#CCC', fontSize: '1.2rem', transition: '0.3s'}} 
                                        onMouseOver={(e) => e.target.style.color = 'var(--error)'}
                                        onMouseOut={(e) => e.target.style.color = '#CCC'}
                                        onClick={() => removeFromBag(item.bagID)}
                                    >×</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BAGIAN KANAN: Ringkasan Belanja */}
                    <div style={{background:'#F9F8F6', padding:'3.5rem', height:'fit-content', position: 'sticky', top: '120px'}}>
                        <h3 style={{fontSize: '1.2rem', marginBottom:'2rem', borderBottom: '1px solid #EEE', paddingBottom: '1rem'}}>Order Summary</h3>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', opacity: 0.7}}>
                            <span>Subtotal</span>
                            <span>IDR {cartTotal.toLocaleString()}</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '0.8rem', opacity: 0.7}}>
                            <span>Shipping</span>
                            <span style={{fontStyle: 'italic'}}>Calculated at checkout</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem', fontWeight: '700', fontSize: '1.1rem'}}>
                            <span>Total</span>
                            <span>IDR {cartTotal.toLocaleString()}</span>
                        </div>

                        <button className="btn btn-olive" style={{width:'100%', padding: '1.5rem'}} onClick={() => isLoggedIn ? setShowCheckoutModal(true) : navigate('/login')}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}

            {/* Panggil Modal jika state true */}
            {showCheckoutModal && <CheckoutModal onConfirm={handleCheckout} onCancel={() => setShowCheckoutModal(false)} user={user} />}
        </section>
    );
}

export default Cart;