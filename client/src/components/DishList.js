import React from 'react';
import DishItem from './DishItem';

function DishList({ dishes, onTogglePublish }) {
  return (
    <div>
      {dishes.map((dish) => (
        <DishItem key={dish.dishId} dish={dish} onTogglePublish={onTogglePublish} />
      ))}
    </div>
  );
}

export default DishList;
