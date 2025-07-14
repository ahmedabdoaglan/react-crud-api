// data/posts.js - Shared data source
let posts = [
  {
    id: "1",
    title: "this is first title",
    description: "this is first description",
  },
  {
    id: "2",
    title: "this is second title",
    description: "this is second description",
  },
];

// Helper function to generate new ID
export function generateId() {
  return String(Date.now());
}

// Get all posts
export function getAllPosts() {
  return posts;
}

// Get single post by ID
export function getPostById(id) {
  return posts.find((post) => post.id === id);
}

// Add new post
export function addPost(newPost) {
  const post = {
    id: generateId(),
    title: newPost.title || "",
    description: newPost.description || "",
  };
  posts.push(post);
  return post;
}

// Update post
export function updatePost(id, updatedPost) {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    title: updatedPost.title || posts[index].title,
    description: updatedPost.description || posts[index].description,
  };
  return posts[index];
}

// Delete post
export function deletePost(id) {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  const deletedPost = posts.splice(index, 1)[0];
  return deletedPost;
}
