// Import express package
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const expressValidator = require('express-validator');
// const expressSession = require('express-session');

let routes = require('./routes/pages');

//Connecting to DB
const dbName = 'dailyfarm';

// Render/production: берём строку подключения из переменной окружения
// Local: по умолчанию localhost
const mongoUrl = process.env.MONGO_URL || `mongodb://localhost:27017/${dbName}`;

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });
let db = mongoose.connection;

//Test Connection
db.once('open', ()=>{
    console.log('Database connected successfully');
});

//Test Connection Error
db.on('error', (error)=>{
    console.log(error);
});

// Initialize express
const app = express();

// Set up a view engine
app.set('view engine', 'ejs');

// Set a static folder
app.use(express.static('public'));

// Body Parser Middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Define the index router
app.use('/', routes);
// app.use(expressValidator());
// app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

// Define the port number
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

