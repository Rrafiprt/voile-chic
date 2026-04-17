import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ p, colors }) {
    const [selCol, setSelCol] = useState('Olive');
    const { addToBag } = useCart();

    return (
        <div className="product-card">
            <div className="img-container">
                <img src={p.image} alt={p.name} />
                <div className="product-overlay">
                    <button className="btn btn-olive" style={{padding:'10px 20px', fontSize:'0.6rem'}} onClick={() => addToBag(p, selCol, 1)}>
                        + Quick Bag
                    </button>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
                <div>
                    <h3 style={{fontSize:'1.1rem', marginBottom:'5px'}}>{p.name}</h3>
                    <p style={{fontSize:'0.8rem', color:'var(--olive)', fontWeight:'700'}}>IDR {p.price.toLocaleString()}</p>
                </div>
                <div style={{display:'flex', gap:'6px', marginTop:'5px'}}>
                    {colors.map(c => (
                        <div key={c.name} 
                             onClick={() => setSelCol(c.name)} 
                             style={{
                                 width:'12px', height:'12px', borderRadius:'50%', background:c.hex, cursor:'pointer', 
                                 border: selCol === c.name ? '2px solid var(--dark)' : '1px solid #DDD'
                             }}>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;