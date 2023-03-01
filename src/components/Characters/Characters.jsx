import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './Characters.module.css'

export default function Characters ({loading}) {
  const [ characters, setCharacters ] = useState([])
  const [ loader, setLoader ] = useState(
    <img src={loading} alt='loader' width={64}/>
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
    getData(1)
    setTimeout(() => {
      setLoader(
        <h1>Characters not found 😵‍💫</h1>
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
                page < 42
                ? <button onClick={() => handlerNavigation(page+1)}>{'>'}</button>
                : ''
              }
            </div>
            {
              characters.results?.map(character => {
                return (
                  <li key={character.id}>
                    <img src={character.image} alt="character" width={'100%'}/>
                    <div className={style['info-character-container']}>
                      <div className={style['info-container']}>
                        <h3>Name: {character.name}</h3>
                        {
                          character.status === 'Alive'
                          ? <p>Status: 🟢 - {character.status}</p>
                          : <p>Status: 🔴 - {character.status}</p>
                        }
                        <p>Gender: {character.gender}</p>
                        <p>From: {character.origin.name}</p>
                      </div>
                      <p><Link to={`/character/${character.id}`}>More info</Link></p>
                    </div>
                  </li>
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
                page < 42
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