import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';
import RearrangeTable from './RearrangeTable';
import { getAllTasks } from './idb';
const App = () => {
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasks();
      setInitialData(tasks);
    };

    fetchTasks();
  }, []);
  return (
    <Router>
      <div className="container mx-auto p-4">
     <div className='flex justify-between items-center  pb-4'>
     <Link to='/' className="text-3xl font-bold  text-center">Nested Task Management </Link>
       <div className='flex gap-3'>
       <Link to="/rearrange" className="bg-blue-500 text-white p-2 rounded  inline-block">
      Re arrange tasks
      </Link>
        <Link to="/add" className="bg-blue-500 text-white p-2 rounded  inline-block">
        Add Task
      </Link>
       </div>
     </div>
        <Routes>
          <Route path="/" exact element={<TaskList/>} />
          <Route path="/rearrange" element={<RearrangeTable data={initialData}/>} />
          <Route path="/add" element={<TaskForm/>} />
          <Route path="/task/:taskId" element={<TaskDetails/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
