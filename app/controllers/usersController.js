const db = require("../models");
const Users = db.users;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }

  // Create a Tutorial
  const users = new Users({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address:req.body.address
  });

  // Save Tutorial in the database
  users
    .save(users)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the users."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  Users.find().exec((err,data)=>{
        
        res.send(data);
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found users with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving users with id=" + id });
    });
};

// Find a single Tutorial with an name
exports.UserByName = async(req,res)=>{
    let name = req.params.name
    let hasil = await Users.find({name:{$regex:name,$options:'i'}});
    res.send(hasil);
}

exports.UserByEmail = async(req,res)=>{
    let email = req.params.email
    let hasil = await Users.find({email:{$regex:email,$options:'i'}});
    res.send(hasil);
}
exports.UserByPhone = async(req,res)=>{
    let phone = req.params.phone
    let hasil = await Users.find({phone:{$regex:phone,$options:'i'}});
    res.send(hasil);
}
exports.UserByAddress = async(req,res)=>{
    let address = req.params.address
    let hasil = await Users.find({address:{$regex:address,$options:'i'}});
    res.send(hasil);
}

// Update by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update users with id=${id}. Maybe users was not found!`
        });
      } else res.send({ message: "users was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating users with id=" + id
      });
    });
};

// Delete  with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete users with id=${id}. Maybe users was not found!`
        });
      } else {
        res.send({
          message: "deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all "
      });
    });
};
