const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");

app.use(morgan("dev"));

// 각각의 static 파일들 경로 설정
app.use("/images", express.static(path.join(__dirname, "backend/images")));
app.use("/videos", express.static(path.join(__dirname, "backend/videos")));
app.use("/statics", express.static(path.join(__dirname, "frontend/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 설정
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
