import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

function ContactCard({ contact, onOpen, getContactId, deleteContact }) {
  const updateHandler = id => {
    getContactId(id);
    onOpen();
  };

  const deleteContactHandler = id => {
    deleteContact(id);
  };

  return (
    <Flex
      justify="space-between"
      bg="blue.200"
      p="4"
      borderRadius="xl"
      boxShadow="xl"
      mb="4"
    >
      <Flex align="center">
        <Box mr="8" ml="7">
          <FontAwesomeIcon size="3x" icon={faUser} />
        </Box>
        <Stack>
          <Text> Name: {contact.name} </Text>
          <Text> Email: {contact.email} </Text>
          <Text> Phone: {contact.phone} </Text>
        </Stack>
      </Flex>
      <Flex align="center">
        <Box
          mr="6"
          onClick={() => {
            updateHandler(contact.id);
          }}
        >
          <FontAwesomeIcon size="2x" icon={faEdit} />
        </Box>
        <Box color="red" onClick={() => deleteContactHandler(contact.id)}>
          <FontAwesomeIcon size="2x" icon={faTrash} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default ContactCard;
