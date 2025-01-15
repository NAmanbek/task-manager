import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTaskMutation } from '../api/tasksApi';

type TaskEditFormProps = {
  task: {
    id: number;
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low' | 'None';
    completed: boolean;
  };
  onClose: () => void;
};

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: task,
  });
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const onSubmit = async (data: typeof task) => {
    await updateTask(data);
    onClose(); // Закрыть модальное окно
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          {...register('title', { required: 'Title is required', minLength: 4 })}
        />
        {errors.title && <span>{errors.title.message}</span>}
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

      <div>
        <label>
          <input type="checkbox" {...register('completed')} />
          Completed
        </label>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default TaskEditForm;
