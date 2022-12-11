const express = require('express');
const session = require('express-session');
require('dotenv').config();
var cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true
  }
});



app.use(
  session({
    secret: process.env.GITHUB_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);



// Initialize DB
require('./initDB')();

const AuthRoute = require('./Routes/passport');
app.use('/auth',AuthRoute)

const JudgeRoute = require('./Routes/judge')
app.use('/',JudgeRoute);


//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});


