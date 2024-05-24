import express from 'express';
import cors from 'cors';

export const setupServer = () => {
  const app = express();
  const PORT = 3000;

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get('/', cors, (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use('*', (err, req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
    next();
  });

  app.listen(PORT, cors, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
