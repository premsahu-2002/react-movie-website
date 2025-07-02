import NavBar from "../components/ui/NavBar"
import Button from "../components/ui/Button"
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { Context } from "../provider/global-state-provider"
import Loader from "../components/ui/LoadingSpinner"

function MovieSeprate() {

   const { movieId } = useParams()
   const [movie, setMovie] = useState(null)
   const [ isLoading, setIsLoading ] = useState(false)

   useEffect(() => {
      const controller = new AbortController()
      getMovie(controller.signal, movieId)
      return () => controller.abort()
   }, [movieId])

   async function getMovie(signal, movieId) {
      try {
         const res = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${import.meta.env.VITE_OMDB}`, { signal })
         console.log(res)
         if (!res.ok) throw new Error("Can't get movie !!")
         const data = await res.json()
         console.log(data);
         setMovie(data)
      } catch (err) {
         console.log('Seprate Movie ' + err.message)
      } finally {
         setIsLoading(true)
      }
   }


   if (!isLoading ) return (
      <div style={{ maxWidth: '1400px', margin: '0 auto', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
         
         <div className="movie" style={{ height: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem 1rem' }}>


            <Loader />
         </div>
         <footer style={{ padding: '2rem 1rem', boxShadow: ' .5px -1px .5px #ddd' }}>

            <Button style={{ fontSize: 'small' }} to='..' relative="path">Go Back </Button>
         </footer>
      </div>
   )

   return (
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
         <div className="movie" style={{ height: '100%', flex: 1, display: 'flex', gap: '2rem', padding: '2rem 1rem' }}>

            <div style={{padding: '1rem', height: '100%', minWidth: '30%', boxShadow: '0 0 2px grey' }}>
               <img style={{ height: '100%', width: '100%' }} src={movie?.Poster} alt="" />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem',  padding: '1.5rem 1rem' }}>
               <h1 style={{marginBottom: '1rem'}}> <span style={{fontWeight: 'bolder', fontSize: 'xx-large',padding: '.4rem .8rem', background: 'lightgrey',textTransform: 'uppercase' }}>{movie?.Title} ({movie?.Year})</span></h1>
               <p style={{ letterSpacing: '.3px' }}>Actors : {movie?.Actors}</p>
               <p style={{ letterSpacing: '.3px' }}>Writer : {movie?.Writer}</p>
               <p style={{ letterSpacing: '.3px' }}>Director : {movie?.Director}</p>
               <p style={{ letterSpacing: '.3px' }}>Language : {movie?.Language}</p>
               <p>Released : {movie?.Released}</p>
               <p>Genre : {movie?.Genre}</p>
               <p style={{fontSize: 'large',letterSpacing: '.3px',lineHeight: 1.4}}>Summury : {movie?.Plot}</p>
               <p style={{ marginTop: '.5rem' }}>Rating ⭐ : <span style={{padding: '.4rem .8rem', borderRadius: '12px' , background : 'orange' , color: '#323232', fontWeight: 'bold'}}>{movie?.imdbRating} / 10</span></p>
               <div className="seprate-movie-btn" style={{marginTop: '3rem' , display: 'flex', gap: '2rem'}}>
                  <Button style={{background: 'transparent'}}>Add to Watchlist</Button>
                  <Button>Go to Watchlist</Button>
               </div>
            </div>

         </div>

         <footer style={{display: 'flex', alignItems:'center', justifyContent: 'space-between', padding: '2rem', boxShadow: ' .5px -1px .5px #ddd' }}>

            <Button style={{ fontSize: 'small' }} to='..' relative="path">Go Back </Button>
            <p style={{color: 'olive'}}>Thanks to OMDB 💗</p>
         </footer>
      </div>
   )
}

export default MovieSeprate
