const express = require('express');
const router = express.Router();
const ChatRoom = require('../Models/ChatRoom')



//Get All the rooms
router.get('/romms', async function (req, res) {
    try {
        const metaInfo = await MetaInfo.find({ pid: req.params.pid })
        res.status(200).send(metaInfo[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
});


//Create a new Rooom
router.post('/create', async function (req, res) {
    try {
        const metaInfo = await MetaInfo.find({ pid: req.params.pid })
        res.status(200).send(metaInfo[0]);
    } catch (error) {
        res.status(500).send(error.message)
    }
});
//Delete the room
router.delete('/delete', async function (req, res) {
    //When user list is empty

})
//Update the room
router.put('/update',async function(req,res){
    
    //When user get added to the room
    //When user get removed from the room
}) 



module.exports = router;