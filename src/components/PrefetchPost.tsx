import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/posts';
import { getUser } from '../api/users';

export const PrefetchPost = ({ id }: { id: number }) => {
  const { status, data, error } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
  });

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', data?.userId],
    queryFn: () => getUser(data?.userId),
    enabled: !!data?.userId,
  });

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (status === 'error') {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <small>{isLoading ? 'Loading User' : usersData.name}</small>
      <p>{data.body}</p>
    </div>
  );
};
