const mongoose = require('mongoose')
module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      email: String,
      phone: "number",
      address: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Users = mongoose.model("ujian", schema);
  return Users;
};
