import React, { useState } from 'react';
import { useDeleteTaskMutation } from '../api/tasksApi';
import TaskEditForm from './TaskEditForm';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const handleDelete = async () => {
    await deleteTask(task.id);
    setIsDeleting(false);
  };

  const handleCloseDeleteModal = () => setIsDeleting(false);

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => setIsDeleting(true)} disabled={isLoading}>
        Delete
      </button>

      {isEditing && (
        <div className="modal">
          <TaskEditForm task={task} onClose={() => setIsEditing(false)} />
        </div>
      )}

      {isDeleting && (
        <div className="modal">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={handleDelete} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button onClick={handleCloseDeleteModal}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
