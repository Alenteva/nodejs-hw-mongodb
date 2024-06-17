export const authErrorHendler = (err, req, res, next) => {
  res.status(409).json({
    status: 409,
    message: 'Email in use',
    data: { message: 'Email in use' },
  });
  next();
};
