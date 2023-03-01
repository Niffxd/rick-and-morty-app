import { Link } from 'react-router-dom'
import background from '../../assets/images/footer.png'
import style from './Footer.module.css'

export default function Footer () {
  const links = [
    {
      name: 'Instagram',
      image: 'https://cdn-icons-png.flaticon.com/512/3955/3955024.png',
      link: 'https://www.instagram.com/nicosanchez2497',
    },
    {
      name: 'GitHub',
      image: 'https://cdn-icons-png.flaticon.com/512/733/733609.png',
      link: 'https://github.com/Niffxd',
    },
    {
      name: 'LinkedIn',
      image: 'https://cdn-icons-png.flaticon.com/512/145/145807.png',
      link: 'https://www.linkedin.com/in/nirsanchez/',
    }
  ]

  return(
    <footer className={style['footer']} style={{backgroundImage:`url(${background})`}}>
      <div className={style['title-footer']}>
        <h1>Wubba lubba dub dub</h1>
        <p>Follow me for more!</p>
        <div className={style['social-links-container']}>
          {
            links.map(({name, image, link}) => {
              return(
                <Link key={name} to={link} target='_blank'>
                  <img className={style['social-icon']} src={image} alt={name} width={48} />
                </Link>
              )
            })
          }
        </div>
      </div>
    </footer>
  )
}