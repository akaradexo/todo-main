import React from 'react';
import { FaEdit , FaTrash} from 'react-icons/fa';

const List=({items,deleteTask,editTask})=>{
  return(
    <div className="task-list">
      {items.map((item) =>{
        const {id,title}=item;
        return(
         <div className="task-container" key={id}>
           <p className="title">{title}</p>
           <div className="btn-group">
            <button type="button" className="edit-btn" onClick={()=>editTask(id)} ><FaEdit/></button>
            <button  type="button" className="delete-btn" onClick={()=>deleteTask(id)}><FaTrash/></button>
           </div>
         </div>
        );
      })}    
    </div>
  );
};

export default List;