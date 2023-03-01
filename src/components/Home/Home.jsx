import { Link } from 'react-router-dom'
import background from '../../assets/images/banner-1.png'
import style from './Home.module.css'

export default function Home({ links }) {

  return (
    <div className={style['home-container']} style={{backgroundImage:`url(${background})`}}>
      <div className={style['title-app']}>
        <h1>Rick & Morty</h1>
        <p>Welcome to my app about Rick and Morty. Hope you enjoy the tour and feel free to live me a feedback to improve next version. Have a great day!</p>
      </div>
      <ul className={style['navigation-container']}>
        {
          links.map(({ to, title }) => {
            return title !== 'Home'
            ? (
                <Link key={title} to={to}>
                  <button className={style['navigation-button']}>{title}</button>
                </Link>
              )
            : ''
          })
        }
      </ul>
    </div>
  )
}