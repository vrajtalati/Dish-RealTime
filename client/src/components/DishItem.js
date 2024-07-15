import React from 'react';

function DishItem({ dish, onTogglePublish }) {
  return (
    <div className="dish-item">
      <div className='image'>
      <img src={dish.imageUrl} alt={dish.dishName} />
      </div>
      <h3>{dish.dishName}</h3>
      <button onClick={() => onTogglePublish(dish.dishId)}>
        {dish.isPublished ? 'Unpublish' : 'Publish'}
      </button>
    </div>
  );
}

export default DishItem;
