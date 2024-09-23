const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KIND = ['fijo', 'variable'];
const GROUP = ['familiar', 'personal'];
const PAYEDMETHOD = ['Efectivo', 'Tarjeta', 'Cuenta nominada', 'Tarjeta de alimentos'];

const expenseSchema = new Schema({
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
    expenseGroup: {
        type: String,
        enum: GROUP,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: { // Cambiamos status a un objeto con propiedades booleanas
        planeado: {
            type: Boolean,
            default: true
        },
        realizado: {
            type: Boolean,
            default: false
        }
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String
    },
    planedPayer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    realPayer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    payedWith: {
        payedMetod: {
            type: String,
            enum: PAYEDMETHOD
        },
        description: {
            type: String
        }        
    }
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

module.exports = mongoose.model('Expense', expenseSchema);