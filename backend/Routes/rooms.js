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
  const { userid, name, topic, company, difficulty } = req.body;
  try {
    if (!topic && !company && !difficulty) {
      const questions = await getAllProblems();
      const new_room = new ChatRoom({
        roomname: name,
        users: [userid],
        questions: questions,
      });
      const room = await new_room.save();
      res.status(200).send(room);
    } else if (topic && !company && !difficulty) {
      const questions = await getProblemByTopic(topic);
      const new_room = new ChatRoom({
        roomname: name,
        users: [userid],
        questions: questions,
      });
      const room = await new_room.save();
      res.status(200).send(room);
    } else if (!topic && company && !difficulty) {
      const questions = await getProblemByCompany(company);
      const new_room = new ChatRoom({
        roomname: name,
        users: [userid],
        questions: questions,
      });
      const room = await new_room.save();
      res.status(200).send(room);
    } else if (!topic && !company && difficulty) {
      const questions = await getProblemByDifficulty(difficulty);
      const new_room = new ChatRoom({
        roomname: name,
        users: [userid],
        questions: questions,
      });
      const room = await new_room.save();
      res.status(200).send(room);
    } else if (topic && company && !difficulty) {
      const questions = await getProblemByCompany_Topic(company, topic);
      const new_room = new ChatRoom({
        roomname: name,
        users: [userid],
        questions: questions,
      });
      const room = await new_room.save();
      res.status(200).send(room);
    } else if (topic && !company && difficulty) {
      const questions = await getProblemByDifficulty_Topic(difficulty, topic);
      const new_room = new ChatRoom({
        roomname: name,
        users: [userid],
        questions: questions,
      });
      const room = await new_room.save();
      res.status(200).send(room);
    } else if (!topic && company && difficulty) {
      const questions = await getProblemByCompany_Difficulty(company, difficulty);
      const new_room = new ChatRoom({
        roomname: name,
        users: [userid],
        questions: questions,
      });
      const room = await new_room.save();
      res.status(200).send(room);
    } else {
      const questions = await getProblemByCompany_Difficulty_Topic(company, difficulty, topic);
      const new_room = new ChatRoom({
        roomname: name,
        users: [userid],
        questions: questions,
      });
      const room = await new_room.save();
      res.status(200).send(room);
    }
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



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Questions = require('../Models/Questions')

//Generate random questions 

async function getAllProblems() {
  const problems = await Questions.find().select('-url');
  let randomNumbers = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = getRandomInt(1, problems.length);
    randomNumbers.push(randomIndex);
  }

  let randomQuestions = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    const index = randomNumbers[i];
    const question = problems[index];

    randomQuestions.push(question);

  }
  return randomQuestions;

}

async function getProblemByDifficulty(difficulty) {
  const problems = await Questions.find({ difficulty: difficulty }).select('-url');
  let randomNumbers = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = getRandomInt(1, problems.length);
    randomNumbers.push(randomIndex);
  }

  let randomQuestions = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    const index = randomNumbers[i];
    const question = problems[index];

    randomQuestions.push(question);

  }
  return randomQuestions;
}

async function getProblemByTopic(topic) {
  const problems = await Questions.find({ topics_tags: topic }).select('-url');
  let randomNumbers = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = getRandomInt(1, problems.length);
    randomNumbers.push(randomIndex);
  }

  let randomQuestions = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    const index = randomNumbers[i];
    const question = problems[index];

    randomQuestions.push(question);

  }
  return randomQuestions;
}
async function getProblemByCompany(company) {
  const problems = await Questions.find({ company_tags: company }).select('-url');
  let randomNumbers = [];

  for (let i = 0; i < 4; i++) {
    let randomIndex = getRandomInt(1, problems.length);
    randomNumbers.push(randomIndex);
  }

  let randomQuestions = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    const index = randomNumbers[i];
    const question = problems[index];

    randomQuestions.push(question);

  }
  return randomQuestions;
}

async function getProblemByDifficulty_Topic(difficulty, topic) {
  const problems = await Questions.find({ difficulty: difficulty, topics_tags: topic }).select('-url');
  let randomNumbers = [];
  console.log("ALL PROBLEMS: " + problems.length);
  for (let i = 0; i < 4; i++) {
    let randomIndex = getRandomInt(1, problems.length);
    console.log(randomIndex);
    randomNumbers.push(randomIndex);
  }

  let randomQuestions = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    const index = randomNumbers[i];
    const question = problems[index];

    randomQuestions.push(question);

  }
  return randomQuestions;
}

async function getProblemByCompany_Topic(company, topic) {
  const problems = await Questions.find({ company_tags: company, topics_tags: topic }).select('-url');
  let randomNumbers = [];
  console.log("ALL PROBLEMS: " + problems.length);
  for (let i = 0; i < 4; i++) {
    let randomIndex = getRandomInt(1, problems.length);
    console.log(randomIndex);
    randomNumbers.push(randomIndex);
  }

  let randomQuestions = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    const index = randomNumbers[i];
    const question = problems[index];

    randomQuestions.push(question);

  }
  return randomQuestions;
}

async function getProblemByCompany_Difficulty(company, difficulty) {
  const problems = await Questions.find({ company_tags: company, difficulty: difficulty }).select('-url');
  let randomNumbers = [];
  console.log("ALL PROBLEMS: " + problems.length);
  for (let i = 0; i < 4; i++) {
    let randomIndex = getRandomInt(1, problems.length);
    console.log(randomIndex);
    randomNumbers.push(randomIndex);
  }

  let randomQuestions = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    const index = randomNumbers[i];
    const question = problems[index];

    randomQuestions.push(question);

  }
  return randomQuestions;
}

async function getProblemByCompany_Difficulty_Topic(company, difficulty, topic) {
  const problems = await Questions.find({ company_tags: company, topics_tags: topic, difficulty: difficulty }).select('-url');
  let randomNumbers = [];
  console.log("ALL PROBLEMS: " + problems.length);
  for (let i = 0; i < 4; i++) {
    let randomIndex = getRandomInt(1, problems.length);
    console.log(randomIndex);
    randomNumbers.push(randomIndex);
  }

  let randomQuestions = [];

  for (let i = 0; i < randomNumbers.length; i++) {
    const index = randomNumbers[i];
    const question = problems[index];

    randomQuestions.push(question);

  }
  return randomQuestions;
}














module.exports = router;
