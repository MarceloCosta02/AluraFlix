import React from 'react';
import Logo from '../../assets/img/LogoMain.png'
import './Menu.css'

function Menu() {
    return (
        <nav className="Menu">
            <a href="/">
                <img className="Logo" src={Logo} alt="AluraFlix logo" />
            </a>
        </nav>
    ) 

}

export default Menu;