import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import style from './Navbar.module.css'

export default function Navbar ({ links }) {
  const handleMenu = () => {
    if(!document.getElementById('menu').classList.value.includes(`${style['show-menu']}`)){
      document.getElementById('menu').classList.add(`${style['show-menu']}`)
    }else {
      document.getElementById('menu').classList.remove(`${style['show-menu']}`)
    }

    if(!document.getElementById('menu-links').classList.value.includes(`${style['show-menu-links']}`)){
      document.getElementById('menu-links').classList.add(`${style['show-menu-links']}`)
    }else {
      document.getElementById('menu-links').classList.remove(`${style['show-menu-links']}`)
    }
    
    window.addEventListener('click', event => {
      if(!document.getElementById('menu').contains(event.target) && !document.getElementById('menu-links').contains(event.target)){
        document.getElementById('menu-links').classList.remove(`${style['show-menu-links']}`)
        document.getElementById('menu').classList.remove(`${style['show-menu']}`)
      }
    })
  }
  
  return(
    <nav className={style['navbar']}>
      <Link to='/'>
        <img className={style['logo-container']} src={logo} alt="logo" />
      </Link>
      <button id='menu' className={style['menu-container']} onClick={handleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul id='menu-links' className={style['links-container']}>
        {
          links.map(({ to, title }) => {
            return (
              <Link className={style['link']} key={title} to={to} onClick={handleMenu}>
                <li>{title}</li>
              </Link>
            )
          })
        }
      </ul>
    </nav>
  )
}