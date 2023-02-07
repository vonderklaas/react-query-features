import { useQueries, useQuery } from '@tanstack/react-query';
import { getPost, getPosts } from '../api/posts';

export const Posts = () => {
  const { data, status, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    // Initial data
    placeholderData: [{ id: 1, title: 'Initial Data Title' }],
  });

  // Bunch of queries inside the array
  const queries = useQueries({
    queries: (data ?? []).map((post: any) => {
      return {
        queryKey: ['posts', post.id],
        queryFn: () => getPost(post.id),
      };
    }),
  });
  console.log(queries.map((query) => query.data));

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (status === 'error') {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};
