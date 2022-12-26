const express = require("express");
const router = express.Router();
const ChatRoom = require("../Models/ChatRoom");

//Get All the rooms
router.get("/", async function (req, res) {
  try {
    const rooms = await ChatRoom.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Create a new Rooom
router.post("/create", async function (req, res) {
  const { roomname, userid, questions } = req.body;

  if (!roomname || !userid || !questions) {
    res.status(404).send({error:"Please enter all fields."});
  }
  try {
    const new_room = new ChatRoom({
      roomname: roomname,
      users: [userid],
      questions: questions,
    });
    await new_room.save();

    res.status(200).send(new_room);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//Update the room
router.put("/join/:name", async function (req, res) {
  //When user get added to the room
  const roomname = req.params.name;
  const { userid } = req.body;
  console.log(userid);
  if (userid == null) {
    res.status(500).send({ error: "userid not correct" });
  }
  try {
    var initial_userList = await getAllUsersFromRoom(roomname);
    initial_userList.push(userid);
    const new_room_data = await updateRoom(roomname, initial_userList);
    res.status(200).send(new_room_data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
  //When user get removed from the room
});

router.put("/leave/:name", async function (req, res) {
  //When user get removed from the room
  const roomname = req.params.name;
  const { userid } = req.body;
  console.log(userid);

  if (userid == null) {
    res.status(500).send({ error: "userid not correct" });
  }

  try {
    var initial_userList = await getAllUsersFromRoom(roomname);
    if (initial_userList.length <= 1) {
      await deleteRoom(roomname);
      res.status(200).send({ message: "success" });
    } else {
      var filtered_array = initial_userList.filter((e) => e !== userid);
      console.log("filtered_array ", filtered_array);
      const new_room_data = await updateRoom(roomname, filtered_array);
      res.status(200).send(new_room_data);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

async function getAllUsersFromRoom(roomname) {
  const room = await ChatRoom.find({ roomname: roomname });
  console.log(room[0].users);
  return room[0].users;
}

async function updateRoom(roomname, userslist) {
  return await ChatRoom.findOneAndUpdate(
    { roomname: roomname },
    { users: userslist }
  );
}

//Delete the room
async function deleteRoom(roomname) {
  //When user list is empty
  const post = ChatRoom.find({ roomname: roomname });
  try {
    await post.deleteOne();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = router;
