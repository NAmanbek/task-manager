import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type TaskListProps = {
  tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { filter, sort } = useSelector((state: RootState) => state.tasks);

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter.status === 'all' ||
      (filter.status === 'completed' && task.completed) ||
      (filter.status === 'notCompleted' && !task.completed);

    const matchesPriority =
      filter.priority === 'all' || filter.priority === task.priority;

    return matchesStatus && matchesPriority;
  });

  // Сортировка задач
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'name') {
      return a.title.localeCompare(b.title);
    }
    if (sort === 'priority') {
      const priorityOrder: Record<'High' | 'Medium' | 'Low' | 'None', number> = {
        High: 1,
        Medium: 2,
        Low: 3,
        None: 4,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sort === 'completed') {
      return Number(a.completed) - Number(b.completed);
    }
    if (sort === 'id') {
      return a.id - b.id;
    }
    return 0;
  });

  return (
    <div>
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
