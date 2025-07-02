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

function Handler({  handler, style = defaultStyle, children }) {
   return (
      <button  onClick={handler} style={{ ...defaultStyle, ...style }} >
         {children}
      </button  >
   )
}

export default Handler
