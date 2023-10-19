const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");

const indexRouter = require("./backend/routes/index");
const authRouter = require("./backend/routes/auth");
const { sequelize } = require("./backend/models/index");
const passportConfig = require("./backend/passport/index");

sequelize
  .sync({ force: true }) // force: true -> 서버 실행 시마다 테이블 재생성
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
passportConfig();

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");

// 각각의 static 파일들 경로 설정
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "backend/images")));
app.use("/videos", express.static(path.join(__dirname, "backend/videos")));
app.use("/statics", express.static(path.join(__dirname, "frontend/public")));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  // 에러 처리 미들웨어
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  console.error(err);
  res.send({
    message: err.message,
    error: err,
  });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
