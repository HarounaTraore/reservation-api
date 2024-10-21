import pkg from 'jsonwebtoken';
const { verify } = pkg;
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    verify(token, process.env.SECRET_AUTH, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;
