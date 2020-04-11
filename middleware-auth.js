module.exports = function (req, res, next) {
  if (req.method === "POST" && req.originalUrl === "/auth") {
    return res.jsonp({ token: "foo" });
  }
  next();
};
