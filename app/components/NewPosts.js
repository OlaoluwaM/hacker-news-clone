import React from 'react';
import Posts from './Post';
import { fetchMainPosts } from '../utils/api';

export default function NewPostDisplay() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let posts = await fetchMainPosts('newstories');
      setData(posts);
    })();
  }, []);

  return <Posts data={data} />;
}
