import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', ctrlWrapper(getContactByIdController));

router.post(
  '',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:id', ctrlWrapper(deleteContactController));

router.patch(
  '/:id',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
