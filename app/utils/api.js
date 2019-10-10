const api = 'https://hacker-news.firebaseio.com/v0';
const json = 'json?print=pretty';

function removeDeadPosts(posts) {
  return posts.filter(Boolean).filter(({ dead }) => !dead);
}

function removeDeletedPosts(posts) {
  return posts.filter(({ deleted }) => !deleted);
}

function removePostWithNoDescendant(post) {
  return post.filter(({ descendants }) => descendants !== undefined);
}

function removePostWithNoLink(post) {
  return post.filter(({ url }) => url);
}

function OnlyComments(post) {
  return post.filter(({ type }) => type === 'comment');
}

function OnlyStories(post) {
  return post.filter(({ type }) => type === 'story');
}

export async function fetchMainPosts(type) {
  try {
    let response = await fetch(`${api}/${type}.${json}`);
    let ids = await response.json();
    let wantedIds = ids.splice(0, 50);
    let posts = await Promise.all(wantedIds.map(fetchPost));
    return removeDeletedPosts(
      removeDeadPosts(removePostWithNoLink(removePostWithNoDescendant(posts)))
    );
  } catch (err) {
    return 'Fetch Failed';
  }
}

export function fetchPost(id) {
  return fetch(`${api}/item/${id}.${json}`).then((res) => res.json());
}

function getPosts(ids) {
  return Promise.all(ids.map(fetchPost));
}

export async function fetchComments(post) {
  if (post.kids === undefined) return [];
  let comments = await getPosts(post.kids);
  return removeDeadPosts(removeDeletedPosts(OnlyComments(comments)));
}

export function fetchUser(id) {
  return fetch(`${api}/user/${id}.${json}`).then((res) => res.json());
}

export async function fetchUserPosts(user) {
  if (user.submitted === undefined) return [];
  let posts = await getPosts(user.submitted.splice(0, 50));
  return removeDeadPosts(
    removePostWithNoDescendant(
      removePostWithNoLink(removeDeletedPosts(OnlyStories(posts)))
    )
  );
}
