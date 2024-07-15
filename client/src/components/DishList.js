import React from 'react';
import DishItem from './DishItem';

function DishList({ dishes, onTogglePublish }) {
  return (
    <div>
      <h1 className='header'>Live Dishes</h1>
      {dishes.map((dish) => (
        <DishItem key={dish.dishId} dish={dish} onTogglePublish={onTogglePublish} />
      ))}
    </div>
  );
}

export default DishList;
