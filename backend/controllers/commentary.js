const Commentary = require("../model/Commentary");
const User = require("../model/user");

const addCommentary = async (req, res) => {
  const { from, to, content } = JSON.parse(req.body);
  console.log(from, to, content);
  if (!from || !to || !content)
    return res.status(400).json({ message: "All fields are required!" });

  try {
    const fromUser = await User.findOne({ _id: from }).exec();
    if (!fromUser)
      return res.status(404).json({ message: "No fromUser found" });
    const toUser = await User.findOne({ _id: to }).exec();
    if (!toUser) return res.status(404).json({ message: "No ToUser found!" });

    const comment = new Commentary({
      from,
      to,
      username: fromUser.username,
      content,
    });

    await comment.save();
    toUser.commentary.push(comment._id);
    await toUser.save();

    return res.status(201).json({ message: "Commentary successfully added!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

const getAllComment = async (req, res) => {
  const { userId } = req.params;
  if (!userId)
    return res.status(400).json({ message: "UserId is missing from param!" });

  try {
    const result = await Commentary.find({ to: userId }).exec();
    if (!result) {
      return res.status(404).json({ message: "No animals found!" });
    }
    return res.status(200).json({ comments: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { addCommentary, getAllComment };
