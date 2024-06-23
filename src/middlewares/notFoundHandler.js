export const notFoundHandler = (err, req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Contact not found',
    data: { message: 'Contact not found' },
  });
};
