import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllTasks, deleteTask } from './idb';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  console.log('tasks',tasks)

  return (
    <div >
      
      <ul className={`flex gap-2 flex-wrap ${tasks.length>2?'justify-between':'justify-start'}`}>
        {tasks.map((task) => {

        if(!task?.parentTaskId){
            return(
                <li className="bg-gray-200 w-[25rem] px-2 py-1 rounded">
                   <p className="text-slate-600 capitalize text-center font-bold mb-2 text-xl"> {task.title}</p>
                   <p className="text-gray-500 mb-2"><b>Description</b>: {task.description}</p>
                   <p className="text-gray-500 mb-2"><b>Due Date</b>: {task.dueDate}</p>
                  {task?.parentTaskId}

          {tasks.filter(subtask => subtask.parentTaskId === task.id).length > 0 && (
            <ul className="text-gray-500 mb-2">
              <b>Subtasks:</b>
              {tasks
                .filter(subtask => subtask.parentTaskId === task.id)
                .map(subtask => (
                  <li key={subtask.id}>{subtask.title}</li>
                ))}
            </ul>
          )}
          {/* End of rendering child tasks */}

                  <div className='flex justify-between'>
                  <Link to={`/task/${task.id}`} className="text-blue-500">
                     View
                   </Link>{' '}
                   <button
                     onClick={() => handleDeleteTask(task.id)}
                     className="text-red-500 ml-2"
                   >
                     Delete
                   </button>
                  </div>
                 </li>
               )
        }
       })}
      </ul>
      
    </div>
  );
};

export default TaskList;
