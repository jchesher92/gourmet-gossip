// ! Imports
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// ! User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favourites: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Recipe'
  }],
  recipesAdded: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Recipe'
  }]
})

// * Virtual fields

userSchema.virtual('passwordConfirmation')
  .set(function (fieldValue) {
    // Field value is going to be res.body.passwordConfirmation
    this._passwordConfirmation = fieldValue
  })

// * Pre Validation

userSchema
  .pre('validate', function (next) {
    // Check if the password is bein
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
  })

// * Pre Save

userSchema
  .pre('save', function (next) {
    //  Hash the password
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, 12)
    }
    next()
  })

// * Custom Method
userSchema.methods.validatePassword = function (plainTextPassword) {
  // Compare the plainTextPassword with the hash on the document itself
  return bcrypt.compareSync(plainTextPassword, this.password)
}

export default mongoose.model('User', userSchema)