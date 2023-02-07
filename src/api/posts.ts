import axios from 'axios';

export async function getPosts() {
  const res = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?&_limit=5',
    {
      params: { _sort: 'title' },
    }
  );
  return res.data;
}

export async function getPost(id: number | string) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.data;
}

export async function createPost({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
    title,
    body,
  });
  return res.data;
}

export async function getPostsPaginated(page: any) {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: { _page: page, _sort: 'title', _limit: 2 },
  });
  const hasNext = page * 2 <= parseInt(res.headers['x-total-count']);
  return {
    nextPage: hasNext ? page + 1 : undefined,
    previousPage: page > 1 ? page - 1 : undefined,
    posts: res.data,
  };
}
