const api = 'https://hacker-news.firebaseio.com/v0';
const json = 'json?print=pretty';

function removeDeadPosts(posts) {
  return posts.filter(Boolean).filter(({ dead }) => !dead);
}

function removeDeletedPosts(posts) {
  return posts.filter(({ deleted }) => !deleted);
}

export async function fetchMainPosts(type) {
  let response = await fetch(`${api}/${type}stories.${json}`);
  let ids = await response.json();
  let wantedIds = ids.splice(0, 50);
  let posts = await Promise.all(wantedIds.map(fetchPost));
  return removeDeletedPosts(removeDeadPosts(posts));
}

export function fetchPost(id) {
  return fetch(`${api}/item/${id}.${json}`).then((res) => res.json());
}

export function onlyComments({ kids }) {
  if (kids === undefined) return [];
  return Promise.all(kids.map(fetchPost));
}
