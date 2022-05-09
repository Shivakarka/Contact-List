import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { v4 as uuidv4 } from 'uuid';
import { Heading, Flex, Box } from '@chakra-ui/layout';
import { useState, useEffect } from 'react';
import {
  addContactonServer,
  getContactsfromServer,
  deleteContactOnServer,
} from './components/network';

import ContactCard from './components/ContactCard';
import ContactForm from './components/ContactForm';
import Kmodal from './components/Kmodal';

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContactsfromServer();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  //below isOpen,onOpen,onClose is used for the actions of modal

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [searchData, setSearchData] = useState('');
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState();

  const addNewContact = async (name, email, phone, id) => {
    //the below if conditions handles if any duplicate contacts exists
    //or any input field is empty. Only then a new contact can be added

    if (
      contacts.findIndex(contact => contact.email === email) === -1 &&
      email !== '' &&
      name !== '' &&
      phone !== ''
    ) {
      const data = await addContactonServer(name, email, phone, id);
      setContacts([
        ...contacts,
        { name: data.name, email: data.email, phone: data.phone, id: uuidv4() },
      ]);
      // console.log(data)
    }
  };

  let searchContacts = contacts.filter(contact =>
    contact.name.includes(searchData)
  );

  const getContactId = id => {
    setContactId(id);
  };

  const updateContact = async (name, email, phone, id) => {
    // as its a dummy api , I have commented this api request to handle error
    //  const data = await updateContactOnServer(id, name,email,phone);

    setContacts(prev => [
      ...contacts.filter(contact => contact.id !== id),
      { name, email, phone, id },
    ]);

    //in real api
    // {name:data.name,email:data.email,phone:data.phone,id}
  };

  const deleteContact = async id => {
    const data = await deleteContactOnServer(id);

    if (data.id === undefined) {
      setContacts(prev => [...contacts.filter(contact => contact.id !== id)]);
    }
  };

  //used in updating a contact by finding the id
  let selectContact = contacts.find(contact => contact.id === contactId);

  return (
    <>
      <Kmodal
        isOpen={isOpen}
        title={'Add New Contact'}
        onOpen={onOpen}
        onClose={onClose}
      >
        <ContactForm addNewContact={addNewContact} onClose={onClose} />
      </Kmodal>
      <Kmodal
        isOpen={isOpenEdit}
        title={'Update New Contact'}
        onOpen={onOpenEdit}
        onClose={onCloseEdit}
      >
        <ContactForm
          updateContact={updateContact}
          contact={selectContact}
          onClose={onCloseEdit}
        />
      </Kmodal>
      <Box width={{ sm: '100%', md: '80%', xl: '50%' }} mx="auto">
        <Flex p="4" justify="center" align="center">
          <Heading as="h1" textTransform="uppercase">
            Contact List
          </Heading>
        </Flex>
        <Box p="4">
          <Button
            bg="purple.700"
            color="white"
            w="full"
            fontSize="xl"
            fontWeight="bold"
            colorScheme="purple"
            onClick={onOpen}
          >
            <AddIcon h="20px" w="20px" mr="4" /> Add Contact
          </Button>
        </Box>
        <Box p="4">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              fontWeight="bold"
              focusBorderColor="blue.200"
              type="tel"
              placeholder="Search Contact..."
              onChange={e => setSearchData(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box p="4">
          {searchContacts.map(contact => (
            <ContactCard
              getContactId={getContactId}
              onOpen={onOpenEdit}
              contact={contact}
              key={contact.id}
              deleteContact={deleteContact}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default App;
