module.exports = app => {
  const users = require("../controllers/usersController.js");

  var router = require("express").Router();

  // Create a new 
  router.post("/", users.create);

  // Retrieve all
  router.get("/users", users.findAll);

  // Retrieve a single with id
  router.get("/:id", users.findOne);

  router.get("/name/:name", users.UserByName);

  router.get("/email/:email", users.UserByEmail);


  router.get("/phone/:phone", users.UserByPhone);

  router.get("/address/:address", users.UserByAddress);

  // Update a with id
  router.put("/:id", users.update);

  // Delete a with id
  router.delete("/:id", users.delete);

  // delete all
  router.delete("/", users.deleteAll);

  app.use("/", router);
};
