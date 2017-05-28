import { schema } from 'normalizr';

// Users
export const user = new schema.Entity('users');

// Posts
export const post = new schema.Entity('posts', {
    author: user,
});
export const comment = new schema.Entity('comments', {
    author: user,
    post: post,
});

// Relations
export const friend = new schema.Entity('friends', {
    person: user,
    friend: user,
});
export const request = new schema.Entity('requests', {
    author: user,
    target: user,
});

// Chats
export const chat = new schema.Entity('chats', {
    participants: [ user ]
});

export const message = new schema.Entity('messages', {
    author: user,
});

