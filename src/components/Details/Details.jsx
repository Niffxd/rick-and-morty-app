import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import style from './Details.module.css'

export default function Characters ({loading}) {
  const { id } = useParams();

  const [ character, setCharacter ] = useState({})
  const [ loader, setLoader ] = useState(
    <img src={loading} alt='loader' width={96} style={{margin: '5rem 2rem'}}/>
  )

  const getData = async (id) => {
    const data = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(data => data.json())
    setCharacter(data)
  }

  useEffect(() => {
    window.scroll(0, 0)
    getData(id)
    setTimeout(() => {
      setLoader(
        <h2 style={{margin: '5rem 2rem', textAlign: 'center'}}>Something went wrong 😵‍💫</h2>
      )
    },5000)
  }, [])

  return Object.keys(character).length > 1
    ? (
        <div className={style['container']}>
          <h1>{character.name}:</h1>
          <img src={character.image} alt="char-profile" />
          <div className={style['details-info']}>
            <p><b>Species:</b> {character.species}</p>
            {
              character.type?.length
              ? <p><b>Type:</b> {character.type}</p>
              : ''
            }
            {
              character.status === 'Alive'
              ? <p><b>Status:</b> 🟢 ({character.status})</p>
              : <p><b>Status:</b> 🔴 ({character.status})</p>
            }
            <p><b>Origin:</b> {character.origin?.name}</p>
            <p><b>Last location:</b> {character.location?.name}</p>
            <p><b>Gender:</b> {character.gender}</p>
          </div>
          <p><b>Episodes:</b> {character.episode?.length}</p>
        </div>
      )
    : (
        <div className={style['container']}>
          { loader }
        </div>
      )
}