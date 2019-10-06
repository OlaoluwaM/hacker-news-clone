const api = 'https://hacker-news.firebaseio.com/v0';
const json = 'json?print=pretty';

export function fetchMainPosts(type) {
  return fetch(`${api}/${type}stories.${json}`)
    .then((res) => res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`Could not get the ${type} of posts`);
      }
      return ids.splice(0, 50);
    })
    .then((ids) => Promise.all(ids.map(fetchPost)))
    .then((posts) => removeDeletedPosts(removeDeadPosts(posts)));
}

function fetchPost(id) {
  return fetch(`${api}/item/${id}.${json}`).then((res) => res.json());
}

function removeDeadPosts(posts) {
  return posts.filter(Boolean).filter(({ dead }) => !dead);
}

function removeDeletedPosts(posts) {
  return posts.filter(({ deleted }) => !deleted);
}

fetchMainPosts('top').then(console.log);
