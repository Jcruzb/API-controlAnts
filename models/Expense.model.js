const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KIND = [ 'fijo', 'variable', 'extra' ];

const expenseSchema = new Schema({
    name: {
        type: String,
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
    kind: {
        type: String,
        enum: KIND,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
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
}
);

module.exports = mongoose.model('Expense', expenseSchema);