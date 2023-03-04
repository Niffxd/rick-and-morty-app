import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './Episodes.module.css'

export default function Episodes ({loading}) {
  const [ seasons, setSeasons ] = useState([])
  const [ cast, setCast ] = useState([])
  const [ loader, setLoader ] = useState(
    <img src={loading} alt='loader' width={96} style={{margin: '5rem 2rem'}}/>
  )
  const [ page, setPage ] = useState(1)
  const allCharacters = []

  const getData = async () => {
    let allData = []
    const orderBySeaons = []

    let pages = await fetch('https://rickandmortyapi.com/api/episode')
      .then(pages => pages.json())
    pages = pages.info.pages
    
    for(let page = 1; page <= pages; page++){
      const data = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
        .then(data => data.json())
      allData.push(data.results)
    }

    allData = allData.flat()

    const manySeasons = parseInt(allData[allData.length - 1].episode.substr(2, 1))
    for(let season = 1; season <= manySeasons; season++){
      orderBySeaons.push(allData.filter(episode => episode.episode.includes(`S0${season}`)))
    }

    setSeasons(orderBySeaons)
  }

  const getCast = async (cast) => {      
    for(let i = 0; i < cast.length; i++){
      let data = await fetch(cast[i])
        .then(data => data.json())
        allCharacters.push(data)
    }
  }

  const handlerNavigation = async (season) => {
    await setPage(season)
  }

  const handlerShowModal = (id, characters) => {
    setCast([])
    getCast(characters)
    setCast(allCharacters)
    setLoader(<img src={loading} alt='loader' width={96} style={{margin: '5rem 2rem'}}/>)
    document.getElementById(`characters-${id}`).showModal()
    document.getElementById(`characters-${id}`).classList.add(`${style['showModal']}`)
  }

  const handlerExitModal = (id) => {
    document.getElementById(`characters-${id}`).close()
    document.getElementById(`characters-${id}`).classList.remove(`${style['showModal']}`)
  }

  useEffect(() => {
    window.scroll(0, 0)
    getData()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoader(
        <h2 style={{margin: '5rem 2rem', textAlign: 'center'}}>Something went wrong 😵‍💫</h2>
      )
    }, 2000)
  }, [loader])

  return(
    <div className={style['container']}>
      <h1>Episodes:</h1>
      {
        seasons[page - 1]?.length
        ? <ul className={style['seasons-list']}>
            <div className={style['pages']}>
              {
                page > 1
                ? <button onClick={() => handlerNavigation(page-1)}>{'<'}</button>
                : ''
              }
              <button className={style['seasons']}>Season {page}</button>
              {
                page < seasons.length
                ? <button onClick={() => handlerNavigation(page+1)}>{'>'}</button>
                : ''
              }
            </div>
            {
              seasons[page - 1]?.map(episode => {
                return (
                  <li key={episode.id}>
                    <div className={style['info-seasons-container']}>
                      <h3>Episode: {episode.id}</h3>
                      <div className={style['']}>
                        <p>Name: {episode.name}</p>
                        <p>Release: {episode.air_date}</p>
                      </div>
                      <p
                        id={`showModal-${episode.id}`}
                        onClick={() => handlerShowModal(episode.id, episode.characters)}
                        style={{ width: 'fit-content', textDecoration: 'underline', cursor: 'pointer', marginBottom: '.5rem' }}
                        >Characters cast
                      </p>
                      <dialog id={`characters-${episode.id}`}>
                        <div className={style['title-episode']}>
                          <h2>{episode.name}</h2>
                          <button
                            id={`exitModal-${episode.id}`}
                            onClick={() => handlerExitModal(episode.id)}
                            >Back
                          </button>
                        </div>
                        {
                          !cast.length
                          ? !episode.cast?.length
                            ? loader
                            : <h2 style={{margin: 'auto 2rem', textAlign: 'center'}}>There are no cast on this episode</h2>
                          : <ul className={style['cast-list']}>
                              {
                                cast.map(resident => {
                                  return (
                                    <Link key={resident.id} to={`/characters/${resident.id}`}>
                                      <li>
                                        <img src={resident.image} alt="resident"/>
                                        <div className={style['info-resident-container']}>
                                          <div className={style['info-container']}>
                                            <p><b>Name:</b> {resident.name}</p>
                                          </div>
                                        </div>
                                      </li>
                                    </Link>
                                  )
                                })
                              }
                            </ul>
                        }
                      </dialog> 
                    </div>
                  </li>
                )
              })
            }
          </ul>
        : loader
      }
    </div>
  )
}