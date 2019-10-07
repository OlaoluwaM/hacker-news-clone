import React from 'react';
import Posts from './Post';

export function TopPostDisplay() {
  return <Posts type='top' />;
}

export function NewPostDisplay() {
  return <Posts type='new' />;
}
