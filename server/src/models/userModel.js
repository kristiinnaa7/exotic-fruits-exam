import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
        auto: true
    },
    tel: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(\d{3}-\d{3}-\d{4})$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true
    },
    __v: {
        type: Number,
        select: false 
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updatedAt'
    }
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = model('User', userSchema);

export default User;
