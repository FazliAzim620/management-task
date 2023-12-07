import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from './idb';

const TaskForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() !== '') {
      const newTask = { title, description, dueDate };
      await addTask(newTask);
      navigate('/');
    }
  };

  return (
    <div className="modal-content bg-white px-4 pb-3 rounded-lg  flex justify-center w-full">
    <form onSubmit={handleSubmit} className="mt-4 rounded text-center border w-[30rem] shadow flex flex-col p-4">
      <h2 className='text-xl font-semibold'>Add Task</h2>
    <div className='text-left '>
    <label className="block mb-2">Task Title:</label>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded mb-2 w-full outline-none"
      />
    </div>
    <div className='text-left '>

      <label className="block mb-2">Description:</label>
      <textarea
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded mb-2 w-full outline-none"
      ></textarea>
    </div>

<div className='text-left '>

      <label className="block mb-2">Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 rounded mb-2 w-full outline-none"
      />
</div>

      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </form>
    </div>
  );
};

export default TaskForm;
