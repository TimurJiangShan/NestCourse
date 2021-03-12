module.exports = function (req, res, next) {
  // 401 Unauthorized: When user try to access a protected resource, but they don't supply a valid json web token, so give them a change to retry their jwt
  // 403 Forbidden: when they supply a valid json web token, but they still can't access the resouces, that's why we use 403
  if (!req.user.isAdmin) return res.status(403).send('Access denied');
  next();
};
