import i18next from 'i18next';
import jsonwebtoken from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; 
    jsonwebtoken.verify(token, process.env.SECRET_AUTH, (err, user) => {
      if (err) {
        return res.sendStatus(403); 
      }

      req.user = user; 
      next(); 
    });
  } else {
    res.status(401).json({message: i18next.t("authJWS.accessDenied")});
  }
};

export default authenticateJWT;
