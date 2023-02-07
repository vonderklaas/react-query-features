import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createPost } from '../api/posts';

export const CreatePost = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate, status, data } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    mutate({
      title: titleRef?.current?.value!,
      body: bodyRef?.current?.value!,
    });
  }

  return (
    <div>
      {isError && JSON.stringify(error)}
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input id='title' ref={titleRef} />
        </div>
        <div>
          <label htmlFor='body'>Body</label>
          <input id='body' ref={bodyRef} />
        </div>
        <button disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
      <br />
      {status === 'success' ? (
        <div>
          <p>Title: {data?.title}</p>
          <p>Body: {data?.body}</p>
        </div>
      ) : null}
    </div>
  );
};
