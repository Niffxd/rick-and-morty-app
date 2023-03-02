import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import style from './Locations.module.css'

export default function Locations ({loading}) {
  const [ locations, setLocations ] = useState([])
  const [ residents, setResidents ] = useState([])
  const [ loader, setLoader ] = useState(
    <img src={loading} alt='loader' width={96} style={{margin: '5rem 2rem'}}/>
  )
  const [ page, setPage ] = useState(1)
  const allResidents = []
    
  const getData = async (page) => {
    const data = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
      .then(data => data.json())
    setLocations(data)
  }

  const getResidents = async (residents) => {      
    for(let i = 0; i < residents.length; i++){
      let data = await fetch(residents[i])
        .then(data => data.json())
      allResidents.push(data)
    }
  }

  const handlerNavigation = async (page) => {
    await getData(page)
    await setPage(page)
  }

  const handlerShowModal = (id, residents) => {
    setResidents([])
    getResidents(residents)
    setResidents(allResidents)
    setLoader(<img src={loading} alt='loader' width={96} style={{margin: '5rem 2rem'}}/>)
    document.getElementById(`residents-${id}`).showModal()
    document.getElementById(`residents-${id}`).classList.add(`${style['showModal']}`)
  }

  const handlerExitModal = (id) => {
    document.getElementById(`residents-${id}`).close()
    document.getElementById(`residents-${id}`).classList.remove(`${style['showModal']}`)
  }

  
  useEffect(() => {
    getData(1)
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
      <h1>Locations:</h1>
      {
        locations.results?.length
        ? <ul className={style['locations-list']}>
            <div className={style['pages']}>
              {
                page > 1
                ? <button onClick={() => handlerNavigation(page-1)}>{'<'}</button>
                : ''
              }
              <button>{page}</button>
              {
                page < locations.info.pages
                ? <button onClick={() => handlerNavigation(page+1)}>{'>'}</button>
                : ''
              }
            </div>
            {
              locations.results?.map(location => {
                return (
                  <li key={location.id}>
                    <div className={style['info-location-container']}>
                      <h3>{location.name}</h3>
                      <div className={style['']}>
                        <p><b>Type:</b> {location.type}</p>
                        <p><b>Dimension:</b> {location.dimension.replace('Dimension', '')}</p>
                        <p><b>Residents:</b> {location.residents.length}</p>
                      </div>
                      <p
                        id={`showModal-${location.id}`}
                        onClick={() => handlerShowModal(location.id, location.residents)}
                        style={{ width: 'fit-content', textDecoration: 'underline', cursor: 'pointer', marginBottom: '.5rem' }}
                        >Who resides here
                      </p>
                      <dialog id={`residents-${location.id}`}>
                        <div className={style['title-location']}>
                          <h2>{location.name}</h2>
                          <button
                            id={`exitModal-${location.id}`}
                            onClick={() => handlerExitModal(location.id)}
                            >Salir
                          </button>
                        </div>
                        {
                          !residents.length
                          ? !location.residents.length
                            ? <h2 style={{margin: 'auto 2rem', textAlign: 'center'}}>There are no residents yet</h2>
                            : loader
                          : <ul className={style['residents-list']}>
                              {
                                residents.map(resident => {
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
            <div className={style['pages']}>
              {
                page > 1
                ? <button onClick={() => handlerNavigation(page-1)}>{'<'}</button>
                : ''
              }
              <button>{page}</button>
              {
                page < locations.info.pages
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