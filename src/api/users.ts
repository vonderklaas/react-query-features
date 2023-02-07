import axios from 'axios';

export async function getUser(id: number) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return res.data;
}
