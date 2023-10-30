const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Recomment = require("../models/recomment");
const { isLoggedIn } = require("../middlewares");

// 유저의 정보를 얻어옵니다.
router.get("/:username/info", isLoggedIn, async (req, res) => {
  let username = req.params.username;

  let userInfo = await User.findOne({
    where: { username: username },
    attributes: ["username", "email", "createdAt"],
  });

  res.json(userInfo);
});

// 유저가 쓴 글을 얻어옵니다.
router.get("/:username/posts", isLoggedIn, async (req, res) => {
  let username = req.params.username;

  let userPosts = await Post.findAll({
    where: { writer: username },
    order: [["createdAt", "DESC"]],
  });

  res.json(userPosts);
});

// 유저가 쓴 댓글 및 대댓글을 얻어옵니다.
router.get("/:username/comments", isLoggedIn, async (req, res) => {
  let username = req.params.username;

  let userComments = await Comment.findAll({
    where: { writer: username },
    order: [["createdAt", "DESC"]],
  });

  let userRecomments = await Recomment.findAll({
    where: { writer: username },
    order: [["createdAt", "DESC"]],
  });

  let allWritedComments = userComments.concat(userRecomments);

  res.json(allWritedComments);
});

// 유저의 계정을 삭제합니다.
router.delete("/:username/delete", isLoggedIn, async (req, res) => {
  let username = req.params.username;

  await User.destroy({ where: { username: username } });

  res.json({ result: "success" });
});

// 유저의 정보를 수정합니다.
router.put("/:username/update", isLoggedIn, async (req, res) => {
  let username = req.params.username;
  let { password, email } = req.body;

  await User.update(
    {
      password: password,
      email: email,
    },
    { where: { username: username } }
  );

  res.json({ result: "success" });
});

module.exports = router;
