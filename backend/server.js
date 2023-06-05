const express = require('express');
require('express-async-errors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const color = require('colors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const { notFound, errorHandler } = require('./middlewares/errorMiddleWare');
dotenv.config();
connectDB();
const app = express();
app.use(express.json()); // to accept JSON Data
app.get('/', (req, res) => {
	res.send("API is running");
});
const PORT = process.env.PORT || 5000;
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
	databases: [mongoose],
	rootPath: '/admin',
})
const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`.yellow.bold));

const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", (socket) => {
	console.log('connected to socket.io');

	socket.on('setup', (userData) => {
		socket.join(userData._id);
		socket.emit('connected');
	});

	socket.on('join chat', (room) => {
		socket.join(room);
		console.log("User joined room:" + room);
	});

	socket.on('typing', (room) => socket.in(room).emit("typing"));
	socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;

		if (!chat.users) { return console.log("chat.user not defined"); }

		chat.users.forEach(user => {
			if (user._id == newMessageRecieved.sender._id) { return; }

			socket.in(user._id).emit("message recieved", newMessageRecieved);
		});
	});
	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
});