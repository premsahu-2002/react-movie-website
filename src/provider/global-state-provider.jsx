import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function CtxProvider({children})  {

   useEffect(()=>{
      const saveMovies = localStorage.getItem('savedMovies')
      if(!saveMovies) return
      setWatchList(JSON.parse(saveMovies))
   },[])

   const [movies , setMovies] = useState(null);
   const [saveMovies , setSaveMovies] = useState(null);
   const [isLoading , setIsLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [errorMessage , setErrorMessage] = useState('')
   const [prevSearch , setPrevSearch] = useState(null)
   const [watchList , setWatchList] = useState([])


   const state = {
     movies,
     setMovies,
     saveMovies,
     setSaveMovies,
     isLoading,
     setIsLoading,
     errorMessage,
     setErrorMessage,
     prevSearch,
     setPrevSearch,
     watchList,
     setWatchList,
     isOpen,
     setIsOpen,
   };

   return (
      <Context.Provider value={state}>
         {children}
      </Context.Provider>
   )
}