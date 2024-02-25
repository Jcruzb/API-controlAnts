const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
   priceHistory: {
       type: Array,
       default: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PriceHistory'
        }
       ]
   }, 
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

module.exports = mongoose.model('Product', productSchema);