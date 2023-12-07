
import Dexie from 'dexie';

const db = new Dexie('TaskDB');
db.version(1).stores({ tasks: '++id,title,description,parentTaskId' });

const addTask = async (task) => {
  const taskId = await db.tasks.add(task);
  return taskId;
};
const getAllTasks = async () => {
  return db.tasks.toArray();
};

const getTaskById = async (taskId) => {
  const task = await db.tasks.get(taskId);
  if (task) {
    if (task.parentTaskId) {
      task.subtasks = await db.tasks.where('parentTaskId').equals(task.parentTaskId).toArray();
    }
  }
  return task;
};

const updateTask = async (taskId, updatedFields) => {
  return db.tasks.update(taskId, updatedFields);
};

const deleteTask = async (taskId) => {
  return db.tasks.delete(taskId);
};

export { getAllTasks,getTaskById, addTask, updateTask, deleteTask };
