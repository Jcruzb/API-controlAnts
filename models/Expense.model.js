const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KIND = ['fijo', 'variable', 'extra'];
const GROUP = ['familiar', 'personal'];
const PAYEDMETHOD = ['Efectivo', 'Tarjeta', 'Cuenta nominada', 'Tarjeta de alimentos', 'Por definir'];

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
    expenseGroup: {
        type: String,
        enum: GROUP,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
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
    plannedPayer: {  // Renombrado de planedPayer
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    realPayer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    payedWith: {
        payedMethod: {  // Corregido el typo
            type: String,
            enum: PAYEDMETHOD,
            default: 'Por definir'
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