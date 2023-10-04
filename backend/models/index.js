const Sequelize = require("sequelize");
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Recomment = require("./recomment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Recomment = Recomment;

// table 생성
User.initiate(sequelize);
Post.initiate(sequelize);
Comment.initiate(sequelize);
Recomment.initiate(sequelize);

// table 간의 관계 설정
User.associate(db);
Post.associate(db);
Comment.associate(db);
Recomment.associate(db);

module.exports = db;
