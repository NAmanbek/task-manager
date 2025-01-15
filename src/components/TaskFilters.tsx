import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSort } from '../features/tasksSlice';
import { RootState } from '../store';

const TaskFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { filter, sort } = useSelector((state: RootState) => state.tasks);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ ...filter, status: e.target.value }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({ ...filter, priority: e.target.value }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div>
      <div>
        <label>Status:</label>
        <select value={filter.status} onChange={handleStatusChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>
      <div>
        <label>Priority:</label>
        <select value={filter.priority} onChange={handlePriorityChange}>
          <option value="all">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
          <option value="None">None</option>
        </select>
      </div>
      <div>
        <label>Sort by:</label>
        <select value={sort} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="priority">Priority</option>
          <option value="completed">Status</option>
          <option value="id">Date (by ID)</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
