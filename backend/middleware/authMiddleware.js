// authMiddleware.js
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole.role)) {
      console.log("⛔ Forbidden: User does not have access to this resource");
      return res.status(403).json({ message: "Forbidden: You do not have access to this resource" });
    }
    next();
  };
};
