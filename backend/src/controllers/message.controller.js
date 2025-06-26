import Message from "../models/message.model";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  // display all contacts but without ourself
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    // $ne: not equal MongoDB
    // .select("-password");  expect password
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
