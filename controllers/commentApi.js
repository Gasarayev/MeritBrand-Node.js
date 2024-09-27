const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/comment.json");

const getComments = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const saveComments = (comments) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(comments, null, 2));
};

exports.getAllComments = (req, res) => {
  const comments = getComments();
  res.json(comments);
};

exports.getCommentById = (req, res) => {
  const comments = getComments();
  const comment = comments.find((c) => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).send("Comment not found");
  }
  res.json(comment);
};

exports.createComment = (req, res) => {
  const comments = getComments();
  const newComment = {
    id: comments.length + 1,
    ...req.body,
  };
  comments.push(newComment);
  saveComments(comments);
  res.status(201).json(newComment);
};

exports.updateComment = (req, res) => {
  const comments = getComments();
  const index = comments.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Comment not found");
  }
  comments[index] = { id: parseInt(req.params.id), ...req.body };
  saveComments(comments);
  res.json(comments[index]);
};

exports.deleteComment = (req, res) => {
  const comments = getComments();
  const newComments = comments.filter((c) => c.id !== parseInt(req.params.id));
  if (comments.length === newComments.length) {
    return res.status(404).send("Comment not found");
  }
  saveComments(newComments);
  res.status(204).send();
};
