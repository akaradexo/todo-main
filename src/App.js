import React,{useState} from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import Alert from './components/Alert'
import List from './components/List'


import {v4 as uuid4} from 'uuid';

const App=()=>{

  const [name,setName] = useState('');
  const[list,setList]=useState([]);
  const[isEditing,setIsEditing]=useState(false);
  const [editId,setEditID]=useState(null);

  const [alert,setAlert]=useState({
    show:false,
    message:'',
    type:'',
  });

  const showAlert =(show,message,type)=>{
    setAlert({
      show,
      message,
      type,
    })
  };
  
  const removeAlert=()=>{
    setAlert({...alert,show:false});
  } 

  const submitHandler=(e)=>{
    e.preventDefault();
    if(!name){
      //display Alert
      showAlert(true,'Task cannot be empty!','danger')
    }
    else if(name &&  isEditing){
      //deal with edit
      //edit Alert
      showAlert(true,'Task Updated','info')
    }
    else{
      //add Alert
      showAlert(true,'Task added','success')
    }
  };

  return(
    <section>
      <div className="container">
        <div className="header">
          <h1>TODO</h1>
          <button><BsFillSunFill/></button>
        </div>
        <form onSubmit={submitHandler}>
          {alert.show && <Alert {...alert} removeAlert={removeAlert}/>}
          <input  
            type="text" 
            className="" 
            placeholder="10 minutes meditation"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <button type="submit">ADD</button>
        </form>  
        <div className="list-container">
          <List items={list}/>
          <button onClick={()=>setList([])}>Clear All</button>
        </div>
      </div> 
    </section>
  )
}

export default App;
