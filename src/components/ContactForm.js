import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

function ContactForm({ addNewContact, onClose, contact, updateContact }) {
  const [name, setName] = useState(contact ? contact.name : '');
  const [email, setEmail] = useState(contact ? contact.email : '');
  const [phone, setPhone] = useState(contact ? contact.phone : '');

  function onSubmit() {
    if (contact) {
      updateContact(name, email, phone, contact.id);
      onClose();
    } else {
      addNewContact(name, email, phone);
      onClose();
    }
  }

  const isEmailError = email === '';
  const isNameError = name === '';
  const isPhoneError = phone === '';

  return (
    <Stack>
      <FormControl id="name" isInvalid={isNameError} isRequired>
        <FormLabel htmlFor="name">Enter Name</FormLabel>
        <Input
          value={name}
          type="name"
          onChange={e => setName(e.target.value)}
        />
        {!isNameError ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>Name is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={isEmailError} id="email" isRequired>
        <FormLabel htmlFor="email">Enter Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        {!isEmailError ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="phone" isInvalid={isPhoneError} isRequired>
        <FormLabel htmlFor="phone">Enter Phone Number</FormLabel>
        <Input
          value={phone}
          type="tel"
          onChange={e => setPhone(e.target.value)}
        />
        {!isPhoneError ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>Phone is required.</FormErrorMessage>
        )}
      </FormControl>
      {contact ? (
        <Button onClick={onSubmit} alignSelf="self-end" colorScheme="green">
          Update Contact
        </Button>
      ) : (
        <Button onClick={onSubmit} alignSelf="self-end" colorScheme="green">
          Add Contact
        </Button>
      )}
    </Stack>
  );
}

export default ContactForm;
