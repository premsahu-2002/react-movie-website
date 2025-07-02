import { Link } from "react-router-dom"

const defaultStyle = {
   backgroundColor: 'orange',
   padding: '1rem 1.2rem',
   fontSize: '1.1rem',
   border: 'none',
   borderRadius: 16,
   boxShadow: '0 0 2px grey',
   cursor: 'pointer',
   width: 'fit-content'
}

function Button({to='#', onclick , style=defaultStyle,  children}) {
   return (
      <Link to={to} onClick={onclick}  style={{...defaultStyle , ...style}} >
         {children}
      </Link  >
   )
}

export default Button
