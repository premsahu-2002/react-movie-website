import { useContext, useState , useEffect} from "react";
import Handler from "./ui/Handler";
import Loader from "./ui/LoadingSpinner";
import { Context } from "../provider/global-state-provider";
import style from './Movie.module.css'

function SavedMovies({movieId}) {

   const [movie, setMovie] = useState(null)
   const [loading , setLoading] = useState(true)
   const {watchList,setWatchList} = useContext(Context)

   useEffect(()=>{
      loadMovie()
   },[watchList])

   async function loadMovie(){
      try{
         const res = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=${import.meta.env.VITE_OMDB}`)
         if(!res.ok) throw Error('failed to load movie!!')
         const data = await res.json()
         setMovie(data)
      }catch(err){
         console.log(err.message)
      }finally{
         setLoading(false)
      }
   }

   function handleRemove(id){
      const filteredWatchList = watchList.filter(m=> m !== id)
      console.log(filteredWatchList)
      setWatchList(filteredWatchList)
   }
   function handleMoveTop(id){
      const filteredWatchList = watchList.filter((m) => m !== id);
      const newList = [id,...filteredWatchList]
      setWatchList(newList);
   }

   if(loading) return <Loader />

   return (
     <div className={style.movie} style={{maxWidth: '600px'}}>
       <div className={style.image} style={{minWidth: '40%'}}>
         <img src={movie?.Poster} alt={movie?.Title} />
       </div>
       <div className={style.details}>
         <h1>{movie?.Title}</h1>
         <p>
           Type : <span className={style.genre}>{movie?.Type}</span>
         </p>
         <p>Released year : {movie?.Year}</p>
         <p>Released year : {movie?.Plot}</p>
         <hr />
         <div className={style.btn} style={{display: 'flex', flexDirection: 'row'}}>
           <Handler
             handler={() => handleRemove(movie?.imdbID)}
             style={{ fontSize: "smaller", fontRadius: "8px" }}
           >
             Remove
           </Handler>
           <Handler handler={() => handleMoveTop(movie?.imdbID)} style={{ fontSize: "smaller", fontRadius: "8px" , backgroundColor: 'lightgreen'}}>
             Move Top
           </Handler>
         </div>
       </div>
     </div>
   );
}

export default SavedMovies
