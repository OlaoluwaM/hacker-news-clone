import React from 'react';
import Posts from './Post';
import { fetchMainPosts } from '../utils/api';

export default function TopPostDisplay() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let posts = await fetchMainPosts('topstories');
      setData(posts);
    })();
  }, []);

  return <Posts data={data} />;
}
