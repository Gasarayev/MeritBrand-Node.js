const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/contact.json");

const getContactInfo = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const saveContactInfo = (contact) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(contact, null, 2));
};

exports.getContactInfo = (req, res) => {
  const contacts = getContactInfo();
  res.json(contacts);
};

exports.getContactInfoById = (req, res) => {
  const contacts = getContactInfo();
  const info = contacts.find((item) => item.id === parseInt(req.params.id));
  if (!info) {
    return res.status(404).send("Contact info not found");
  }
  res.json(info);
};

exports.createContactInfo = (req, res) => {
  const contacts = getContactInfo();
  const newContact = {
    id: contacts.length + 1, // You can change this to a random number generator as needed
    ...req.body,
  };
  contacts.push(newContact);
  saveContactInfo(contacts);
  res.status(201).json(newContact);
};

exports.updateContactInfoById = (req, res) => {
  const contacts = getContactInfo();
  const index = contacts.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Contact info not found");
  }

  contacts[index] = { id: parseInt(req.params.id), ...req.body };
  saveContactInfo(contacts);
  res.json(contacts[index]);
};

exports.deleteContactInfoById = (req, res) => {
  const contacts = getContactInfo();
  const newContacts = contacts.filter((item) => item.id !== parseInt(req.params.id));
  if (contacts.length === newContacts.length) {
    return res.status(404).send("Contact info not found");
  }

  saveContactInfo(newContacts);
  res.status(204).send();
};
