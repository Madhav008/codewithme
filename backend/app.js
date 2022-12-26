const express = require('express');
const session = require('express-session');
require('dotenv').config();
var cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const realtimeEditor = require('./realtimeEditor.js')

app.use(express.json())

app.use(
  cors({
    origin: process.env.clientURL,
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

io.on('connection', realtimeEditor)

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

const JudgeRoute = require('./Routes/judge');
app.use('/',JudgeRoute);

const Problems = require('./Routes/problems');
app.use('/problems',Problems);

const SubmissionRoute = require('./Routes/submission')
app.use('/result',SubmissionRoute);

const MetaRoute = require('./Routes/problem_meta')
app.use('/info',MetaRoute);

const ChatRoom = require('./Routes/rooms')
app.use('/room',ChatRoom);
// const SeederRoute = require('./seeder')
// app.use('/seeder',SeederRoute);


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


