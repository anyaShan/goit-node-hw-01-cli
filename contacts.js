const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// const contactsPath = `${__dirname}/db/contacts.json`;
// console.log(contactsPath);

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  //   const result = await fs.readFile(contactsPath);
  //   const text = result.toString();
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);

  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

// -------------------------------------------------------

// const booksPath = path.join(__dirname, "books.json");

// const listBooks = async () => {
//   const result = await fs.readFile(booksPath);
//   return JSON.parse(result);
// };

// const getById = async (id) => {
//   const books = await listBooks();
//   const result = books.find((item) => item.id === id);

//   return result || null;
// };

// const add = async ({ title, author }) => {
//   const books = await listBooks();
//   const newBook = {
//     id: nanoid(),
//     title,
//     author,
//   };
//   books.push(newBook);

//   await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

//   return newBook;
// };

// const deleteById = async (id) => {
//   const books = await listBooks();
//   const index = books.findIndex((item) => item.id === id);
//   if (index === -1) {
//     return null;
//   }

//   const [result] = books.splice(index, 1);
//   await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
//   return result;
// };

// module.exports = {
//   listBooks,
//   getById,
//   add,
//   deleteById,
// };
