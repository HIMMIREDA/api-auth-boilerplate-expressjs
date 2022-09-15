// TO ADD LATER

const getPosts = (req, res) => {
  return res.status(200).json([
    {
      title: "hey",
      desc: "foo",
    },
    {
      title: "hello",
      desc: "world",
    },
  ]);
};

const getPost = (req, res) => {};

const addPost = (req, res) => {};

const deletePost = (req, res) => {};

const updatePost = (req, res) => {};

module.exports = {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
};
