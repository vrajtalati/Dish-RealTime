const mongoose = require('mongoose');
const Dish = require('./models/Dish');
require('dotenv').config();

MONGO_URI=process.env.MONGO_URI;

// Connection URL and options
const mongoUri = MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Dishes to be inserted
const dishes = [
  {
    dishName: "Jeera Rice",
    dishId: "1",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
    isPublished: true
  },
  {
    dishName: "Paneer Tikka",
    dishId: "2",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
    isPublished: true
  },
  {
    dishName: "Rabdi",
    dishId: "3",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
    isPublished: true
  },
  {
    dishName: "Chicken Biryani",
    dishId: "4",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
    isPublished: true
  },
  {
    dishName: "Alfredo Pasta",
    dishId: "5",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
    isPublished: true
  }
];

// Connect to MongoDB
mongoose.connect(mongoUri, options);

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');

  // Insert dishes
  Dish.insertMany(dishes)
    .then(() => {
      console.log('Dishes added');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error adding dishes:', err);
      mongoose.connection.close();
    });
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});
