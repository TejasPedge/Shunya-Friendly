import React from 'react'
import style from './Navbar.module.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className = {style.nav} >
        <Link style = {{textDecoration : 'none', color : 'black'}} to = '/'>
            <div className = {style['logo-container']}>
                    <img src="Shunya-Friendly-LOGO.png" alt="" />
                    <h3>Shunya Friendly</h3>
            </div>
        </Link>
    </div>
  )
}

export default Navbar