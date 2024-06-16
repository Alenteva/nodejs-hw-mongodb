import { Contact } from '../db/contact.js';
import mongoose from 'mongoose';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../index.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = Contact.find();

  if (filter.type) {
    contactsQuery = contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite === true || filter.isFavourite === false) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const countQuery = contactsQuery.clone();

  const contactsCount = await countQuery.countDocuments();

  console.log('~contactsCount:', contactsCount);

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    throw error;
  }
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (id) => {
  const contact = await Contact.findOneAndDelete({ _id: id });
  return contact;
};
