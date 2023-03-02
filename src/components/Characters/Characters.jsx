import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './Characters.module.css'

export default function Characters ({loading}) {
  const [ characters, setCharacters ] = useState([])
  const [ loader, setLoader ] = useState(
    <img src={loading} alt='loader' width={96} style={{margin: '5rem 2rem'}}/>
  )
  const [ page, setPage ] = useState(1)

  const getData = async (page) => {
    const data = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(data => data.json())
    setCharacters(data)
  }

  const handlerNavigation = async (page) => {
    await getData(page)
    await setPage(page)
  }

  useEffect(() => {
    window.scroll(0, 0)
    getData(1)
    setTimeout(() => {
      setLoader(
        <h2 style={{margin: '5rem 2rem', textAlign: 'center'}}>Something went wrong 😵‍💫</h2>
      )
    },5000)
  }, [])

  return(
    <div className={style['container']}>
      <h1>Characters:</h1>
      {
        characters.results?.length
        ? <ul className={style['characters-list']}>
            <div className={style['pages']}>
              {
                page > 1
                ? <button onClick={() => handlerNavigation(page-1)}>{'<'}</button>
                : ''
              }
              <button>{page}</button>
              {
                page < characters.info.pages
                ? <button onClick={() => handlerNavigation(page+1)}>{'>'}</button>
                : ''
              }
            </div>
            {
              characters.results?.map(character => {
                return (
                  <Link key={character.id} to={`/characters/${character.id}`}>
                    <li>
                      <img src={character.image} alt="character" width={'100%'}/>
                      <div className={style['info-character-container']}>
                        <div className={style['info-container']}>
                          <h3>Name: {character.name}</h3>
                          {
                            character.status === 'Alive'
                            ? <p><b>Status:</b> 🟢 - {character.status}</p>
                            : <p><b>Status:</b> 🔴 - {character.status}</p>
                          }
                          <p><b>Gender:</b> {character.gender}</p>
                          <p><b>From:</b> {character.origin.name}</p>
                        </div>
                        <p style={{ textDecoration: 'underline' }}>More info</p>
                      </div>
                    </li>
                  </Link>
                )
              })
            }
            <div className={style['pages']}>
              {
                page > 1
                ? <button onClick={() => handlerNavigation(page-1)}>{'<'}</button>
                : ''
              }
              <button>{page}</button>
              {
                page < characters.info.pages
                  ? <button onClick={() => handlerNavigation(page+1)}>{'>'}</button>
                  : ''
              }
            </div>
          </ul>
        : loader
      }
    </div>
  )
}