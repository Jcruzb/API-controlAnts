const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new Schema({

    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    family: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        required: true
    },
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    }],
    debts: [{
        type: Schema.Types.ObjectId,
        ref: 'Debt'
    }]
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

module.exports = mongoose.model('Program', programSchema);