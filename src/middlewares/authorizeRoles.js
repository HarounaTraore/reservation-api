const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res.sendStatus(403);
    }

    next();
  };
};

export default authorizeRoles;
