import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div>
                <div className="logo" style={{color:'var(--blush)', marginBottom:'1.5rem'}}>Voile Chic</div>
                <p style={{fontSize:'0.8rem', opacity:0.5}}>High-end modesty for the modern soul.</p>
            </div>
            <div>
                <h4 style={{marginBottom:'1.5rem'}}>LINKS</h4>
                <p style={{fontSize:'0.8rem', marginBottom:'10px', opacity:0.6}}><Link to="/shop" style={{color: 'inherit', textDecoration: 'none'}}>Collection</Link></p>
                <p style={{fontSize:'0.8rem', opacity:0.6}}><Link to="/profile" style={{color: 'inherit', textDecoration: 'none'}}>Atelier / Profile</Link></p>
            </div>
            <div>
                <h4 style={{marginBottom:'1.5rem'}}>SOCIAL</h4>
                <p style={{fontSize:'0.8rem', marginBottom:'10px', opacity:0.6, cursor: 'pointer'}}>
                    <a  href="https://www.instagram.com/voilechic_official?igsh=djQ1OG90eGhibHhp"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{color: 'inherit', textDecoration: 'underline'}}> Instagram
                    </a>
                </p>
                <p style={{fontSize:'0.8rem', opacity:0.6, cursor: 'pointer'}}>
                    <a href="https:wa.me/8282135261738"
                        target ="_blank"
                        rel="noopener noreferrer "
                        style= {{color: 'inherit', textDecoration: 'underline'}}>Contact Person
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;