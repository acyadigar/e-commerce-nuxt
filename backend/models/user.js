const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  products: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      autopopulate: {
        maxDepth: 1
      }
    }
  ]
});
UserSchema.plugin(require('mongoose-autopopulate'))

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
