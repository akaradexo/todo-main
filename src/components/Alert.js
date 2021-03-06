import React,{useEffect} from 'react';

const Alert=({message,type,removeAlert,items})=>{
useEffect(()=>{
  const timeout=setTimeout(()=>
  {
    removeAlert();
  },3000)
  return ()=>clearTimeout(timeout);
},[items]);
  return(
    <p className={`alert alert-${type}`}>
      {message}    
    </p>
  )
}

export default Alert;