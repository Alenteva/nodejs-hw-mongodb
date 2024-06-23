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
import { ROLES } from '../index.js';
import { checkRoles } from '../middlewares/checkRoles.js';

const router = Router();

router.use(authenticate);
router.get('/', checkRoles(ROLES.ADMIN), ctrlWrapper(getContactsController));
router.get(
  '/:id',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  ctrlWrapper(getContactByIdController),
);
router.post(
  '',
  checkRoles(ROLES.ADMIN),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:id',
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/:id',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
