const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// bcrypt - hash password library


// Creating the user schema attributes
const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String,
    profile: {
        name: {type: String, default: ''},
        picture: {type: String, default: ''}
    },
    address: String,
    history: [{
        date: Date,
        paid: {type: Number, default: 0},
        // item: {type: Schema.Types.ObjectsId, ref: ''}
    }]
})

// Hashing the password before saving to the db
UserSchema.pre('save', function(next) {
    let user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(error, salt) {
        if(error) return next(error);
        bcrypt.hash(user.password, salt, null, function(error, hash) {
            if(error) return next(error);
            user.password = hash;
            next();
        });
    });
});

// Compare password in the db with the one the user inputs
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);