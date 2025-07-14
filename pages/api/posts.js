// pages/api/posts.js
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
function generateId() {
  return String(Date.now());
}

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
      return res.status(200).json(posts);

    case "POST":
      // Create new post
      const newPost = {
        id: generateId(),
        title: req.body.title || "",
        description: req.body.description || "",
      };
      posts.push(newPost);
      return res.status(201).json(newPost);

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
