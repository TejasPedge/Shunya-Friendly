import React from 'react'
import style from './Navbar.module.css'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import Logo from './Shunya-Friendly-LOGO.png'
import { useLocation } from 'react-router-dom'
const Navbar = () => {

    const {pathname} = useLocation();

    console.log(pathname);

  return (
    <div className = {style.nav} >
        <Link style = {{textDecoration : 'none', color : 'black'}} to = '/'>
            <div className = {style['logo-container']}>
                    <img src = {Logo} alt="" />
                    <h3>Shunya Friendly</h3>
            </div>
        </Link>

        <Link to = '/'>
            {pathname !== '/' ? <Button>Go To Home Page</Button> : null}
        </Link>
    </div>
  )
}

export default Navbar