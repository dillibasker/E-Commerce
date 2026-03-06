import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
     type: String,
     required: true,
     unique: true
    },

password: {
  type: String,
  required: function () {
    return !this.googleUser; // password required only if NOT Google user
  }
},
    sessionToken: { type: String },
    verificationToken: String,
isVerified: {
  type: Boolean,
  default: false
},
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    googleUser: {
  type: Boolean,
  default: false
},
  },
    
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function(next) {

  if (!this.password) return next(); // skip for Google users

  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;