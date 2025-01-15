import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadSettingsFromLocalStorage } from './features/tasksSlice';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSettingsFromLocalStorage());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;