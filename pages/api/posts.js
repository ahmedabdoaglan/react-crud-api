import { getAllPosts, addPost } from "../../data/posts.js";

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  switch (req.method) {
    case "GET":
      // Get all posts
      const posts = getAllPosts();
      return res.status(200).json(posts);

    case "POST":
      // Create new post
      try {
        const newPost = addPost(req.body);
        return res.status(201).json(newPost);
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Error creating post", error: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
