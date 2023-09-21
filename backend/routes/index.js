const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(200).send({
    message: "hello world!",
  });
});

module.exports = router;
