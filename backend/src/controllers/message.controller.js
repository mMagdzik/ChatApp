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

//get messages between two users
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    //currently authenticated user:
    const myId = req.user._id;
    // finding messages:
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId }, // find all where sender is me or reciever is the other user
        { senderId: userToChatId, recieverId: myId }, // vice versa
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessages = async (req, res) => {
  // tezt or image
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id; //me

    let imageUrl; //at first undefined
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const NewMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });

    await NewMessage.save();

    //to do : realTime functionality

    res.status(201).json(NewMessage);
  } catch (error) {
    console.error("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
