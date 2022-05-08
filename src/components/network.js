import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com/users';

export const addContactonServer = async (name, email, phone, id) => {
  try {
    const { data } = await axios.post(baseUrl, { name, email, phone, id });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getContactsfromServer = async (name, email, phone, id) => {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateContactOnServer = async (id, name, email, phone) => {
  try {
    const { data } = await axios.put(`${baseUrl}/${id}`, {
      id: id,
      name: name,
      email: email,
      phone: phone,
    });
    return data;
  } catch (error) {
    // console.log(error);
  }
};

export const deleteContactOnServer = async id => {
  try {
    const { data } = await axios.delete(`${baseUrl}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
