import { Link } from "react-router-dom"

function ErrorPage() {
   return (
      <div style={{textAlign: 'center' , marginTop: '5rem'}}>
         <h1 style={{color: 'white' , textTransform: 'uppercase', fontSize: '2rem', background: 'red', padding: '2rem'}}>Page not found!!</h1>
         <p style={{marginTop: '1.4rem', fontSize: '1.4rem', textTransform: 'capitalize'}}>unable to find the requested page visit to 👉 <Link to={'/'}>Homepage</Link>.</p>
      </div>
   )
}

export default ErrorPage
