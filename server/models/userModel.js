const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Hint: Why is bcrypt required here?
*/
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function (next) {
    const user = this;
    //if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            console.log('User password: ', user.password);
            if (err) return next(err);
            user.password = hash; // overwrite plaintext password with hash
            next()
        })
    })
});
// method for comparing inputted password vs hashed
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    // compare input password and hashed password
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

module.exports = mongoose.model('User', userSchema);