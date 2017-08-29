module.exports = function ErrorMiddleware (err, req, res, next) {
  res.status(400);
  res.json(err);
};