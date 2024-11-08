const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const userRoute = require('./Routes/userRoute');
const adminRoute = require('./Routes/adminRoute');
const boardRoute = require('./Routes/boardRoute');
const listRoute = require('./Routes/listRoute');
const cardRoute = require('./Routes/cardRoute');

dotenv.config();

//MONGODB CONNECTION

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
	console.log(`DB Error : ${err.message}`);
  })
  
const app = express();

app.use(cors());
app.use(express.json());

//ROUTES

app.use('/superadmin', adminRoute);
app.use('/user', userRoute);
app.use('/board', boardRoute);
app.use('/list', listRoute);
app.use('/card', cardRoute);

app.listen(process.env.PORT, () => {
	console.log(`Server is online! Port: ${process.env.PORT}`);
});
