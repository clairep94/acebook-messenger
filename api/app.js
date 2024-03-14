require("dotenv").config();
require("./config/cloudinaryConfig");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");
const uploadImageRoute = require("./routes/upload_image");
const userDataRouter = require("./routes/userData");
const chatsRouter = require("./routes/chats");
const messagesRouter = require("./routes/messages");

const app = express();

// setup for receiving JSON
app.use(express.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// CORS middleware
app.use(
  cors({
    origin: ["https://acebook-mo3r.onrender.com", "http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7);
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "auth error" });
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// route setup
// No Auth
app.use("/tokens", authenticationRouter);
app.use("/users", usersRouter); // creating a user
// app.use("/messages", messagesRouter);

// Auth only
app.use("/posts", tokenChecker, postsRouter);
app.use("/upload_image", uploadImageRoute);
app.use("/comments", tokenChecker, commentsRouter);
app.use("/chats", tokenChecker, chatsRouter);
app.use("/messages", tokenChecker, messagesRouter);
app.use("/userData", tokenChecker, userDataRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({ message: "server error" });
});

module.exports = app;
