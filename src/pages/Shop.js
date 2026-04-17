import React from 'react';
import ProductCard from '../components/ProductCard';
import { products, colors } from '../data/products';


function Shop() {
    return (
        <section style={{padding:'6rem 6%'}}>
            <div className="section-header" style={{textAlign:'center', marginBottom: '4rem'}}>
                <p style={{fontSize:'0.7rem', color:'var(--olive)', fontWeight:'700', letterSpacing:'3px', marginBottom:'10px'}}>EXCLUSIVE 2026</p>
                <h2>The Silk Symphony</h2>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'4rem 2.5rem'}}>
                {products.map(p => <ProductCard key={p.id} p={p} colors={colors} />)}
            </div>
        </section>
    ); 
}

export default Shop;