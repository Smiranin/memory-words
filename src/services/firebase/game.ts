import { initializeApp } from 'firebase/app';
import { child, getDatabase, push, ref, update } from 'firebase/database';
import { firebaseConfig } from './config';

initializeApp(firebaseConfig);
const database = getDatabase();

interface Post {
  name: string;
}

export async function createGame() {
  // A post entry.
  const postData: Post = {
    name: 'Hello Bro'
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(database), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates: Record<string, Post> = {};
  updates['/games/' + newPostKey] = postData;

  return update(ref(database), updates);
}
