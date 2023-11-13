const Commentary = require("../model/Commentary");
const User = require("../model/user");
const Rating = require("../model/Rating");
const mongoose = require("mongoose");

const addCommentary = async (req, res) => {
  const { from, to, content, ratingNote } = JSON.parse(req.body);
  console.log(from, to, content, ratingNote);
  if (!from || !to || !content || !ratingNote) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const fromUser = await User.findOne({ _id: from }).exec();
    if (!fromUser)
      return res.status(404).json({ message: "No fromUser found" });
    const toUser = await User.findOne({ _id: to }).exec();
    if (!toUser) return res.status(404).json({ message: "No ToUser found!" });

    const newRating = new Rating({
      from: from,
      userId: to,
      rating: ratingNote,
      username: fromUser.username,
    });

    await newRating.save();

    const comment = new Commentary({
      from,
      to,
      username: fromUser.username,
      content,
      ratingId: newRating._id,
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

const addRating = async (req, res) => {
  const { from, userId, ratingNote } = JSON.parse(req.body);
  console.log(userId, ratingNote);

  if (!userId || !ratingNote) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  try {
    const fromUser = await User.findOne({ _id: from }).exec();
    const userFound = await User.findOne({ _id: userId }).exec();

    if (!userFound) {
      return res.status(404).json({ message: "User not found!" });
    }

    const newRating = new Rating({
      from: from,
      userId: userId,
      rating: ratingNote,
      username: fromUser.username,
    });

    await newRating.save();
    userFound.notes.push(newRating._id);
    await userFound.save();
    return res.status(201).json({ message: "Note correctly added!" });
  } catch (err) {
    console.log("Error in addRating", err);
    return res.status(404).json({ error: err });
  }
};

const getAllComment = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Commentary.aggregate([
      {
        $match: {
          to: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "ratingId",
          foreignField: "_id",
          as: "ratings_details",
        },
      },
      {
        $unwind: {
          path: "$ratings_details",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          from: { $first: "$from" },
          to: { $first: "$to" },
          username: { $first: "$username" },
          content: { $first: "$content" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          ratings_details: {
            $max: "$ratings_details",
          },
        },
      },
      {
        $project: {
          _id: 0,
          from: 0,
          to: 0,
          updatedAt: 0,
          ratings_details: {
            username: 0,
            _id: 0,
            from: 0,
            userId: 0,
            __v: 0,
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    if (!result.length) {
      return res.status(404).json({ message: "Data not found" });
    }

    return res.status(200).json({ comments: result });
  } catch (error) {
    console.error("Error fetching comments with ratings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// const getAllRating = async (req, res) => {
//   const { userId } = req.params;
//   if (!userId)
//     return res.status(400).json({ message: "UserId is missing from param!" });

//   try {
//     const result = await Rating.find({ _id: userId }).exec();
//     if (!result) {
//       return res.status(404).json({ message: "No rating found!" });
//     }
//     return res.status(200).json({ comments: result });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: err.message });
//   }
// };

module.exports = { addCommentary, getAllComment, addRating };
