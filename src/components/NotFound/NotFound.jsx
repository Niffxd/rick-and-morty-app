import NotFoundImage from './../../assets/images/notFound.png'
import style from './NotFound.module.css'

export default function NotFound () {
  return(
    <div className={style['container']}>
      <h3>Error 404: Page not found</h3>
      <img src={NotFoundImage} alt="not-found" width={250}/>
      <h2>There's a lesson here, and I'm not going to be the one to figure it out.</h2>
    </div>
  )
}