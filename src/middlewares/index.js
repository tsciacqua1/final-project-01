const isAdminBool = true;

export const isAdmin = (req, res, next) => {
  return isAdminBool
    ? next()
    : res.status(400).json({ error: true, message: "not allowed" });
};
