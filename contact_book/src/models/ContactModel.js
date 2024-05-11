const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telephone: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now },

});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

Contact.prototype.register = async function() {
    this.validate();

    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body)
};

Contact.prototype.validate =  function() {
    this.cleanUp();
    
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid email');
    if(!this.body.name) this.errors.push('Name is a required field');
    if(!this.body.telephone && !this.body.email) this.errors.push('Email or phone number required');
}

Contact.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        name: this.body.name[0].toUpperCase() + this.body.name.substr(1).toLowerCase(),
        surname: this.body.surname[0].toUpperCase() + this.body.surname.substr(1).toLowerCase(),
        email: this.body.email,
        telephone: this.body.telephone,
    };
};

Contact.prototype.edit = async function (id) {
    if(typeof id !== 'string') return;
    this.validate();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true })
}

Contact.findID = async function(id) {
    if(typeof id !== 'string') return;
    const contact = await ContactModel.findById(id);
    return contact;
};

Contact.findContacts = async function() {
    const contacts = await ContactModel.find().sort({createdAt: -1});
    return contacts;
};

Contact.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contact = await ContactModel.findOneAndDelete({_id: id});
    return contact;
};

module.exports = Contact;