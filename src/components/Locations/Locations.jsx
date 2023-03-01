import { useState, useEffect } from 'react'
import style from './Locations.module.css'

export default function Locations ({loading}) {
  const [ locations, setLocations ] = useState([])
  const [ loader, setLoader ] = useState(
    <img src={loading} alt='loader' width={96} style={{margin: '5rem 2rem'}}/>
  )
  const [ page, setPage ] = useState(1)

  const getData = async (page) => {
    const data = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
      .then(data => data.json())
    setLocations(data)
  }

  const handlerNavigation = async (page) => {
    await getData(page)
    await setPage(page)
  }

  useEffect(() => {
    getData(1)
    setTimeout(() => {
      setLoader(
        <h2 style={{margin: '5rem 2rem', textAlign: 'center'}}>Something went wrong 😵‍💫</h2>
      )
    },5000)
  }, [])

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
                      <h3>Name: {location.name}</h3>
                      <div className={style['']}>
                        <p>Type: {location.type}</p>
                        <p>Dimension: {location.dimension.replace('Dimension', '')}</p>
                      </div>
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