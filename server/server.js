const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Dish = require('./models/Dish');
require('dotenv').config();

MONGO_URI=process.env.MONGO_URI;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const mongoUri = MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(mongoUri, options);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to get all dishes
app.get('/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).send('Error fetching dishes');
  }
});

// Endpoint to toggle the publish status
app.post('/toggle-publish', async (req, res) => {
  const { dishId } = req.body;
  try {
    const dish = await Dish.findOne({ dishId });
    dish.isPublished = !dish.isPublished;
    await dish.save();
    io.emit('update-dishes');
    res.json({ status: 'success', isPublished: dish.isPublished });
  } catch (err) {
    res.status(500).send('Error toggling publish status');
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Notify clients on dish changes
Dish.watch().on('change', (change) => {
  if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
    io.emit('update-dishes');
  }
});

// Start the server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
