import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPostsPaginated } from '../api/posts';

export const Pagination = () => {
  const [page, setPage] = useState(1);

  const { status, error, data, isPreviousData } = useQuery({
    queryKey: ['posts', { page }],
    // Show previous data while fetching next data
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  });

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (status === 'error') {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <>
      <h1>
        Paginated Posts
        <br />
      </h1>
      <small>
        {isPreviousData && 'Previous Data'}
        <br />
      </small>
      {data.posts.map((post: any) => (
        <div key={post.id}>{post.title}</div>
      ))}
      {data.previousPage && (
        <button onClick={() => setPage(data?.previousPage!)}>Previous</button>
      )}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </>
  );
};
