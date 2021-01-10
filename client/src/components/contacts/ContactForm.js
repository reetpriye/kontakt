import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, clearCurrent, current, updateContact } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  useEffect(() => {
    if (current) setContact(current);
    else
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if (contact.name !== '')
      current ? updateContact(contact) : addContact(contact);
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='name'
          value={name}
          placeholder='Name'
          onChange={onChange}
        />
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Email'
          onChange={onChange}
        />
        <input
          type='text'
          name='phone'
          value={phone}
          placeholder='Phone'
          onChange={onChange}
        />
        <h5>Contact Type</h5>
        <input
          type='radio'
          name='type'
          value='personal'
          checked={type === 'personal'}
          onChange={onChange}
        />
        Personal{' '}
        <input
          type='radio'
          name='type'
          value='professional'
          checked={type === 'professional'}
          onChange={onChange}
        />
        Professional{' '}
        <div>
          <input
            type='submit'
            value={current ? 'Update Contact' : 'Add Contact'}
            className='btn btn-primary btn-block'
          />
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
