

import Movie from './components/Movie'
import { Context } from './provider/global-state-provider'
import Loader from './components/ui/LoadingSpinner'
import { useContext, useEffect, useState } from 'react'
import SavedMovies from './components/SavedMovies'


function Index() {
   const {isOpen , setIsOpen, prevSearch, isLoading, errorMessage, movies, setMovies,watchList } = useContext(Context)
   

   useEffect(() => {
      if (!prevSearch) return
      setMovies(prevSearch)
   }, [])

   return (
     <div className="outlet-container" style={{overflow: 'hidden', display: "flex", gap: "1rem" }}>
       <div
         className="search-list"
         style={{
           flex: 1,
           display: "flex",
           flexDirection: "column",
           padding: "2rem",
           gap: "1.5rem",
         }}
       >
         {isLoading && <Loader />}
         {errorMessage && (
           <p
             style={{
               fontSize: "xx-large",
               opacity: "0.8",
               fontWeight: "bold",
             }}
           >
             {errorMessage} !!
           </p>
         )}
         {!isLoading &&
           !errorMessage &&
           movies &&
           movies.map((m) => (
          
               <Movie key={m.imdbID} movie={m} />
             
           ))}
         {!errorMessage && !prevSearch && !movies && !isLoading && (
           <h1>Start Looking for.. </h1>
         )}
       </div>
       {watchList.length !== 0 && (
         <div
           className="watch-list"
           style={{
            top: 0,
             flex: 1,
             padding: "2rem",
             display: isOpen ? "flex" : 'none',
             flexDirection: "column",
             gap: "2rem",
           }}
         >
           <p
             style={{
               fontSize: "larger",
               padding: "1rem",
               background: "coral",
             }}
           >
             {watchList.length !== 0 &&
               `Found ${watchList.length} saved movies !`}
               
           </p>
           {watchList?.length !== 0 &&
             watchList.map((id) => <SavedMovies key={id} movieId={id} />)}
         </div>
       )}
     </div>
   );
}

export default Index
