import { Document,Schema } from "mongoose";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  country?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  country: String,
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

interface UserDocument extends Document {
  password: string;
  // Other properties of the User document
}

userSchema.pre('save', async function(this: UserDocument, next:any) {
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports=User;
