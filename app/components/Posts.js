import React from 'react';
import PostTemplate from './Post';

export function TopPostDisplay() {
  return <PostTemplate type='top' />;
}

export function NewPostDisplay() {
  return <PostTemplate type='new' />;
}
