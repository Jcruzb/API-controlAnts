const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quote: {
        type: Number,
        required: true
    },
    numberOfQuotes: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    limitDate: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    payedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Debt', debtSchema);