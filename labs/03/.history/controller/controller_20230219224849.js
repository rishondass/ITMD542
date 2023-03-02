const getContacts = (req,res) => {
    res.status(200).send(database.contactsData);
}