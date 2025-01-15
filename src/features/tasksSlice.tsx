import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: { status: 'all', priority: 'all' },
  sort: 'name',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
      localStorage.setItem('filter', JSON.stringify(state.filter));
    },
    setSort(state, action) {
      state.sort = action.payload;
      localStorage.setItem('sort', state.sort);
    },
    loadSettingsFromLocalStorage(state) {
      const savedFilter = localStorage.getItem('filter');
      const savedSort = localStorage.getItem('sort');
      if (savedFilter) {
        state.filter = JSON.parse(savedFilter);
      }
      if (savedSort) {
        state.sort = savedSort;
      }
    },
  },
});

export const { setFilter, setSort, loadSettingsFromLocalStorage } = tasksSlice.actions;
export default tasksSlice.reducer;
