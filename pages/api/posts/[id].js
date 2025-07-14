import { getPostById, updatePost, deletePost } from "../../../data/posts.js";

export default function handler(req, res) {
  const { id } = req.query;

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
      // Get single post
      const post = getPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.status(200).json(post);

    case "PUT":
      // Update post
      try {
        const updatedPost = updatePost(id, req.body);
        if (!updatedPost) {
          return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(updatedPost);
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Error updating post", error: error.message });
      }

    case "DELETE":
      // Delete post
      try {
        const deletedPost = deletePost(id);
        if (!deletedPost) {
          return res.status(404).json({ message: "Post not found" });
        }
        return res
          .status(200)
          .json({ message: "Post deleted successfully", post: deletedPost });
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Error deleting post", error: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
