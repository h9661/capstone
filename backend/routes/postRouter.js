const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const Recomment = require("../models/recomment");
const User = require("../models/user");
const { isLoggedIn } = require("../middlewares");

// 카태고리에 해당하는 글들을 얻어옵니다.
router.get("/:postCategory", isLoggedIn, async (req, res) => {
  let postCategory = req.params.postCategory;

  let categorizedPost = await Post.findAll({
    where: { category: postCategory },
    order: [["createdAt", "DESC"]],
  });

  res.json(categorizedPost);
});

// 글의 상세 정보를 얻어옵니다.
router.get("/:postId/detail", isLoggedIn, async (req, res) => {
  let postId = req.params.postId;

  let postDetail = await Post.findOne({ where: { id: postId } });

  res.json(postDetail);
});

// 글을 작성합니다.
router.post("/write", isLoggedIn, async (req, res) => {
  let { title, category, content, writer } = req.body;

  try {
    await Post.create({
      title: title,
      category: category,
      content: content,
      writer: writer,
    });
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

// 글을 수정합니다.
router.put("/:postId/update", isLoggedIn, async (req, res) => {
  let postId = req.params.postId;
  let { title, category, content } = req.body;

  try {
    await Post.update(
      {
        title: title,
        category: category,
        content: content,
      },
      { where: { id: postId } }
    );
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

// 글을 삭제합니다.
router.delete("/:postId/delete", isLoggedIn, async (req, res) => {
  let postId = req.params.postId;

  try {
    await Post.destroy({ where: { id: postId } });
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

// 댓글을 작성합니다.
router.post("/:postId/comment/write", isLoggedIn, async (req, res) => {
  let postId = req.params.postId;
  let { writer, content } = req.body;

  try {
    await Comment.create({
      writer: writer,
      content: content,
      post_id: postId,
    });
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

// 댓글을 수정합니다.
router.put("/:postId/comment/:commentId/update", isLoggedIn, async (req, res) => {
  let commentId = req.params.commentId;
  let { writer, content } = req.body;

  try {
    await Comment.update(
      {
        writer: writer,
        content: content,
      },
      { where: { id: commentId } }
    );
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

// 댓글을 삭제합니다.
router.delete("/:postId/comment/:commentId/delete", isLoggedIn, async (req, res) => {
  let commentId = req.params.commentId;

  try {
    await Comment.destroy({ where: { id: commentId } });
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

// 대댓글을 작성합니다.
router.post("/:postId/comment/:commentId/recomment/write", isLoggedIn, async (req, res) => {
  let postId = req.params.postId;
  let commentId = req.params.commentId;
  let { writer, content } = req.body;

  try {
    await Recomment.create({
      writer: writer,
      content: content,
      post_id: postId,
      comment_id: commentId,
    });
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

// 대댓글을 수정합니다.
router.put("/:postId/comment/:commentId/recomment/:recommentId/update", isLoggedIn, async (req, res) => {
  let recommentId = req.params.recommentId;
  let { writer, content } = req.body;

  try {
    await Recomment.update(
      {
        writer: writer,
        content: content,
      },
      { where: { id: recommentId } }
    );
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

// 대댓글을 삭제합니다.
router.delete("/:postId/comment/:commentId/recomment/:recommentId/delete", isLoggedIn, async (req, res) => {
  let recommentId = req.params.recommentId;

  try {
    await Recomment.destroy({ where: { id: recommentId } });
  } catch (err) {
    console.error(err);
  }

  res.json({ result: "success" });
});

module.exports = router;
