// pages/api/posts/[id].js
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

  // Find post by ID
  const postIndex = posts.findIndex((post) => post.id === id);

  switch (req.method) {
    case "GET":
      // Get single post
      if (postIndex === -1) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.status(200).json(posts[postIndex]);

    case "PUT":
      // Update post
      if (postIndex === -1) {
        return res.status(404).json({ message: "Post not found" });
      }
      posts[postIndex] = {
        ...posts[postIndex],
        title: req.body.title || posts[postIndex].title,
        description: req.body.description || posts[postIndex].description,
      };
      return res.status(200).json(posts[postIndex]);

    case "DELETE":
      // Delete post
      if (postIndex === -1) {
        return res.status(404).json({ message: "Post not found" });
      }
      const deletedPost = posts.splice(postIndex, 1)[0];
      return res
        .status(200)
        .json({ message: "Post deleted successfully", post: deletedPost });

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
