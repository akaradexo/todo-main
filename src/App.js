import React,{useState,useEffect} from 'react';
import { BiTask } from 'react-icons/bi';
import Alert from './components/Alert'
import List from './components/List'

import {v4 as uuid4} from 'uuid';

const getLocalStorage=()=>{
  let list =localStorage.getItem('task');
  if(list){
    return JSON.parse(list);
  }else{
    return [];
  }
}

const App=()=>{

  const[name,setName] = useState('');
  const[list,setList] = useState(getLocalStorage());
  const[isEditing,setIsEditing] = useState(false);
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

  const deleteTask=(id)=>{
    //deal with removing
    const updatedList =list.filter(item=>item.id!==id) ;
    setList(updatedList)
    //delete alert
    showAlert(true,'Task removed!','danger')
  }

  const editTask =(id)=>{
    //deal wit edit
    const taskToEdit=list.find((item)=>item.id===id) ;
    setIsEditing(true);
    setEditID(id);
    setName(taskToEdit.title);
    //show alert
    showAlert(true,'Task Updating!','info')
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    if(!name){
      //display Alert
      showAlert(true,'Task cannot be empty!','danger')
    }
    else if(name &&  isEditing){
      //deal with edit
     const newList= list.map((item)=>{
       if(item.id===editId){
         return{
           ...item,title:name,
         }
       }else{
         return item;
       }
     });
    setList(newList)
    setIsEditing(false)
    setEditID(null)
    setName('')
      //edit Alert
    showAlert(true,'Task Updated!','info')
    }
    else{
      //deal with adding
      const newTask={id:uuid4(),title:name};
      setList([...list,newTask])
      setName('');
      //add Alert
      showAlert(true,'Task added!','success')
    }
  };

  useEffect(()=>{
    localStorage.setItem('task',JSON.stringify(list));
  },[list])

  return(
    <section>
      <div className="container">
        <div className="header">
          <h1>TODO</h1>
          <button><BiTask/></button>
        </div>
        <form onSubmit={submitHandler}>
          {alert.show && <Alert {...alert} removeAlert={removeAlert} items={list}/>}
          <div className="formControl">
          <input  
            type="text" 
            className="inputForm" 
            placeholder="e.g. 10 minutes meditation..."
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <button className="add-btn" type="submit">ADD</button>
          </div>
        </form>  
        {list.length > 0 && <div className="list-container">
          <List items={list} deleteTask={deleteTask} editTask={editTask}/>
          <button className="clear-btn"
          onClick={()=>{setList([]);showAlert(true,'All Task Removed!','danger')}}>
            Clear All</button>
        </div>}
      </div> 
    </section>
  )
}

export default App;
