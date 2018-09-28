import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
    {
        email: { type: String, required: true, lowercase: true, index: true, unique: true },
        passwordHash: { type: String },
        confirmed: { type: Boolean, default: false },
        confirmationToken: { type: String, default: '' }
    },
    { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcryptjs.compareSync(password, this.passwordHash);
}

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
        {
            email: this.email,
            confirmed: this.confirmed
        },
        process.env.JWT_SECRET
    );
}

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        confirmed: this.confirmed,
        token: this.generateJWT()
    };
}

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcryptjs.hashSync(password, 10);
}

schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
}

schema.methods.generateResetPasswordUrl = function generateResetPasswordUrl() {
    return `${process.env.HOST}/reset-password/${this.generateResetPasswordToken()}`;
}

schema.plugin(uniqueValidator, { message: 'This email is already taken'});

export default mongoose.model('User', schema);
