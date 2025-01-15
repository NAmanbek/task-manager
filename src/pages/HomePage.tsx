import React from 'react';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useGetTasksQuery, useCreateTaskMutation } from '../api/tasksApi';
import { Task } from '../types';

const HomePage = () => {
  const { data: tasks = [], error, isLoading } = useGetTasksQuery({ page: 1 });
  const [createTask] = useCreateTaskMutation();

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Failed to load tasks.</p>;

  const handleTaskAdded = async (newTaskData: Omit<Task, 'id'>) => {
    try {
      await createTask(newTaskData).unwrap();
    } catch (err) {
      alert('Failed to add task.');
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskFilters />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default HomePage;
