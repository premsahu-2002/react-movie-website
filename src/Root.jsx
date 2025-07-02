
import { useContext } from 'react'
import NavBar from './components/ui/NavBar'
import './global.css'
import { Outlet } from 'react-router-dom'
import { Context } from './provider/global-state-provider'

function Root() {

   const {watchList} = useContext(Context)

   return (
     <div
       style={{
         overflow: "hidden",
         position: "relative",
         maxWidth: "1400px",
         minHeight: "100dvh",
         margin: "0 auto",
         backgroundColor: "#e7e7e7",
       }}
     >
       <NavBar />
       <Outlet />
     </div>
   );
}

export default Root
