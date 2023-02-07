import { useState } from 'react';

import { getPost } from './api/posts';
import { useQueryClient } from '@tanstack/react-query';

// Pages
import { Posts } from './components/Posts';
import { Post } from './components/Post';
import { CreatePost } from './components/CreatePost';
import { Pagination } from './components/Pagination';
import { InfiniteScrolling } from './components/InfiniteScrolling';
import { PrefetchPost } from './components/PrefetchPost';

function App() {
  const [currentPage, setCurrentPage] = useState(<Posts />);

  const queryClient = useQueryClient();

  // Prefetch (pre-populate data inside cache)
  const onHoverPost = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () => getPost(1),
    });
  };

  return (
    <div>
      <button onClick={() => setCurrentPage(<Posts />)}>
        Posts - ['posts']
      </button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
        Post - ['posts', id]
      </button>
      <button
        onMouseEnter={onHoverPost}
        onClick={() => setCurrentPage(<PrefetchPost id={1} />)}
      >
        Prefetch Post - ['posts', id]
      </button>
      <button onClick={() => setCurrentPage(<CreatePost />)}>
        Add Post - [mutation]
      </button>
      <button onClick={() => setCurrentPage(<Pagination />)}>Pagination</button>
      <button onClick={() => setCurrentPage(<InfiniteScrolling />)}>
        Infinite Scrolling
      </button>
      <br />
      {currentPage}
    </div>
  );
}

export default App;
