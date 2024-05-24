// import express from 'express';

// const setupServer = express();
// const PORT = 3000;
// setupServer.get('/', (req, res) => {
//   res.json({
//     message: 'Hello world!',
//   });
// });
// setupServer.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });
// setupServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
import { setupServer } from './server.js';
setupServer();
