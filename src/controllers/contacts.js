import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '..//services/contacts.js';
import createHttpError from 'http-errors';
import { notFoundHandler } from '../middlewares/notFoundHandler.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;

  const contact = await getContactById(id);

  if (!contact) {
    next(createHttpError(notFoundHandler));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);

  if (!result) {
    next(createHttpError(notFoundHandler));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const contact = await deleteContact(id);

  if (!contact) {
    next(createHttpError(notFoundHandler));
    return;
  }
  res.status(204).send();
};