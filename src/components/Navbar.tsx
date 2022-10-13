import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import logo from '../styles/assets/localib.png'

export const Navbar = () => {
  return (
    <nav>
        <Link to="/">
            <figure className='logo-container'>
                <img src={logo} alt="localib-logo" />
            </figure>
        </Link>
        <div className='nav-items'>
            <Link to="/">Locataires</Link>
            <Link to="/vehicules">Vehicules</Link>
        </div>
    </nav>
  )
}
