const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const movementSchema = new Schema({
    movement: {
        income: {
            type: Schema.Types.ObjectId,
            ref: 'Income'
        },
        Debt: {
            type: Schema.Types.ObjectId,
            ref: 'Debt'
        },
        purchase:{
            type: Schema.Types.ObjectId,
            ref: 'Purchase' 
        }
    },
    kind: {
        type: String,
        enum: ['Ingreso', 'Salida'],
        required: true

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = red._id;
            delete ret._id
            delete ret._v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Movement', movementSchema)