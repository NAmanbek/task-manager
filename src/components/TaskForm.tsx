import React from 'react';
import { useForm } from 'react-hook-form';
import { Task } from '../types';


type TaskFormValues = {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low' | 'None';
};

const TaskForm: React.FC<{ onTaskAdded?: (newTask: Omit<Task, 'id'>) => void }> = ({ onTaskAdded }) => {
  const { register, handleSubmit, reset } = useForm<TaskFormValues>();

  const onSubmit = (data: TaskFormValues) => {
    if (data.title.trim().length < 4) {
      alert('Title must be at least 4 characters long.');
      return;
    }

    if (onTaskAdded) {
      onTaskAdded({ ...data, completed: false });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input id="title" {...register('title', { required: true })} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" {...register('description')} />
      </div>
      <div>
        <label htmlFor="priority">Priority:</label>
        <select id="priority" {...register('priority')}>
          <option value="None">None</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;