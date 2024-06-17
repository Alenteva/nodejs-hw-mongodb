import { registerUser } from '../services/auth.js';
import createHttpError from 'http-errors';
import { authErrorHendler } from '../middlewares/authErrorHendler.js';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  if (user) {
    next(createHttpError(authErrorHendler));
    return;
  }

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};