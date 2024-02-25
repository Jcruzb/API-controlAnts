const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceHistorySchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
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

module.exports = mongoose.model('PriceHistory', priceHistorySchema);