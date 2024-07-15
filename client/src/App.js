import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import DishList from './components/DishList';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dishes');
        setDishes(response.data);
      } catch (err) {
        console.error('Error fetching dishes:', err);
        setError('Error fetching dishes');
      }
    };

    fetchDishes();

    socket.on('update-dishes', fetchDishes);

    return () => {
      socket.off('update-dishes', fetchDishes);
    };
  }, []);

  const togglePublish = async (dishId) => {
    try {
      const response = await axios.post('http://localhost:5000/toggle-publish', { dishId });
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === dishId ? { ...dish, isPublished: response.data.isPublished } : dish
        )
      );
    } catch (err) {
      console.error('Error toggling publish status:', err);
      setError('Error toggling publish status');
    }
  };

  return (
    <div className="App">
      {error && <div className="error">{error}</div>}
      <DishList dishes={dishes} onTogglePublish={togglePublish} />
    </div>
  );
}

export default App;
