import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getTaskById, updateTask, deleteTask, addTask } from './idb';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [addsub, setAddsub] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTaskById(parseInt(taskId, 10));
      setTask(task);
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      setEditedDueDate(task.dueDate);
    };

    fetchTask();
  }, [taskId]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    await updateTask(task.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
    });
    setTask((prevTask) => ({
      ...prevTask,
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate,
    }));
    setEditMode(false);
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    navigate('/');
  };

  const handleAddSubtask = async () => {
    if (newSubtaskTitle.trim() !== '') {
      const newSubtask = { title: newSubtaskTitle, parentTaskId: task.id };
      await addTask(newSubtask);
      const updatedTask = await getTaskById(parseInt(taskId, 10));
      setTask(updatedTask);
      setNewSubtaskTitle('');
    }
    navigate('/');
  };

  return (
    <div className="modal-content bg-white px-4 pb-3 rounded-lg flex justify-center w-full flex-col">
      <div className="mt-4 rounded text-center border w-[30rem] shadow flex flex-col px-4 py-2">
        <h2 className="text-2xl font-bold mb-2">{task?.title}</h2>
        {editMode ? (
          <>
            <label className="block mb-2">Edit Task Title:</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border p-2 rounded mb-2"
            />
            
            <label className="block mb-2">Edit Description:</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border p-2 rounded mb-2"
            ></textarea>
           
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p className="mb-2">Description: {task?.description}</p>
            <p className="mb-2">Due Date: {task?.dueDate}</p>
            <div className="flex justify-between">
              <Link to="/" className="text-blue-500 mr-2 hover:text-green-500">
                Back to Task List
              </Link>
              <div>
                <button
                  onClick={handleEdit}
                  className="text-yellow-500 p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-500 p-2 rounded"
                >
                  Delete
                </button>
                {!addsub && (
                  <button
                    onClick={() => setAddsub(true)}
                    className="text-green-500 p-2 rounded"
                  >
                    Add Subtask
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Add Subtask Form */}
        {addsub && (
          <div className="mt-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Enter subtask title"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                className="border p-2 rounded mb-2 mr-2"
              />
              <button
                onClick={handleAddSubtask}
                className="text-green-500 p-2 rounded"
              >
                Add Subtask
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
