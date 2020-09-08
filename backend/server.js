const express = require('express');
const cors = require('cors'); //imports modules into project
const mongoose = require('mongoose'); //connects to mongodb database

require('dotenv').config(); //configures so enviornment vars are in dotenv file

const app = express();
const port = process.env.PORT || 5000; //creates express server on port 5000

app.use(cors());
app.use(express.json()); //creates middleware

const uri = process.env.ATLAS_URI; //connects to the mongodb server using the link that was given in the connect menu
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } //deals with updates to mongodb
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}) //logs once connection is open

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter); //when someone goes to url and goes to url/exercises, will go to exercises router
app.use('/users', usersRouter); //someone goes to /users, load usersRouter

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); //starts the server

