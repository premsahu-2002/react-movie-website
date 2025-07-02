import React , { useContext, useEffect } from 'react'
import style from './Movie.module.css'
import Button from './ui/Button'
import { Context } from '../provider/global-state-provider'
import Handler from './ui/Handler'

function Movie({movie}) {
   const {watchList , setWatchList} = useContext(Context)

   function handleWatchList(id) {
      if(watchList.includes(id)) return
      setWatchList((prev) => [...prev, id]);
   }
   
   useEffect(()=>{
      localStorage.setItem('savedMovies', JSON.stringify(watchList))
   },[watchList])

   return (
      <div className={style.movie}>
         <div className={style.image}>
            <img src={movie.Poster} alt={movie.Title} />
         </div>
         <div className={style.details}>
            <h1>{movie.Title}</h1>
            <p>Type : <span className={style.genre}>{movie.Type}</span></p>
            <p>Released year : {movie.Year}</p>
            <hr />
            <div className={style.btn}>
               <Handler handler={() => handleWatchList(movie.imdbID)} style={{fontSize: 'smaller', fontRadius: '8px'}}>Add To 
                  Watchlist
               </Handler>
               <Button to={`/movie/${movie.imdbID}`} style={{fontSize: 'smaller', fontRadius: '8px', backgroundColor: 'transparent'}}>See More</Button>
               </div>         
         </div>
      </div>
   )
}

export default Movie;
