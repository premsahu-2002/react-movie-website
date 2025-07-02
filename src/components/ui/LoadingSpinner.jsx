import style from './loader.module.css'

function Loader () {
   return (
      <div className={style.loader} style={{padding : '2rem',display : 'flex', alignItems : 'center', justifyContent: 'center', gap: '1rem'}}>
         
      </div>
   )
}

export default Loader
