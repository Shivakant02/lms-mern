import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minLength: [4, 'Full name must be at least 4 characters'],
        maxLength: [50, 'Full name must be at most 50 characters'],
        
    },
    email:
    {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email'],

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters'],
        maxLength: [15, 'Password must be at most 15 characters'],
        select: false,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default:'USER'
    },
    avatar: {
        Public_id: {
            type: String,
            // required: true,
        },
        secure_url: {
            type: String,
            // required: true,
        },

    },
    forgotPassword: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },



}, {
    timestamps: true
});

const User = model('user', userSchema);
export default User;