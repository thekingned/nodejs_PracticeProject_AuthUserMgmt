const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  // Check if the friends object is empty
  if (Object.keys(friends).length === 0) {
    return res.status(404).send("No friends found");
  }
  // Convert the friends object to an array of friend objects
  res.send(JSON.stringify(friends, null, 4)); // Format the output with 3 spaces for indentation
  // This line is to be replaced with actual return value
  // res.send(friends);
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  // Check if the friend with the given email exists
  if (!friends[email]) {
    return res.status(404).send("Friend not found");
  }
  // Return the friend details
  res.send(friends[email]);
});

// POST request: Add a new friend
router.post("/",(req,res)=>{
  const newFriend = req.body;
  const email = newFriend.email;
  // Check if the email already exists
  if (friends[email]) {
    return res.status(400).send("Friend with this email already exists");
  }
  // Add the new friend to the friends object
  friends[email] = {
    firstName: newFriend.firstName,
    lastName: newFriend.lastName,
    DOB: newFriend.DOB
  };
  // Return the updated friends object
  res.send(`The user ${firstName} has been added successfully.`);
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  const updatedFriend = req.body;
  // Check if the friend with the given email exists
  if (!friends[email]) {
    return res.status(404).send("Friend not found");
  }
  // Update the friend's details
  friends[email] = {
    firstName: updatedFriend.firstName,
    lastName: updatedFriend.lastName,
    DOB: updatedFriend.DOB
  };
  // Return the updated friend details
  res.send(`The user with ${email} has been updated successfully.`);
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  // Check if the friend with the given email exists  
  if (!friends[email]) {
    return res.status(404).send("Friend not found");
  }
  // Delete the friend from the friends object
  delete friends[email];
  // Return a success message
  res.send("User successfully deleted.")//This line is to be replaced with actual return value
});

module.exports=router;
