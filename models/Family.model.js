const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
    familyName: {
        type: String,
        required: true,
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member'
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'blocked'],
            default: 'pending'
        }
    }],
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Family', familySchema);