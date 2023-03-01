import { useState, useEffect } from 'react'
import style from './Episodes.module.css'

export default function Episodes ({loading}) {
  const [ seasons, setSeasons ] = useState([])
  const [ loader, setLoader ] = useState(
    <img src={loading} alt='loader' width={96} style={{margin: '5rem 2rem'}}/>
  )
  const [ page, setPage ] = useState(1)

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

  const handlerNavigation = async (season) => {
    await setPage(season)
  }

  useEffect(() => {
    getData()
    setTimeout(() => {
      setLoader(
        <h2 style={{margin: '5rem 2rem', textAlign: 'center'}}>Something went wrong 😵‍💫</h2>
      )
    },5000)
  }, [])

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
              <button className={style['seasons']}>Season {page}</button>
              {
                page < seasons.length
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