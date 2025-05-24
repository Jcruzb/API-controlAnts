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
    kind: {
        type: String,
        enum: ['fijo', 'variable'],
        required: true
    },
    amount: {
        type: Number
    },
    expenseGroup: {
        type: String,
        enum: ['familiar', 'personal'],
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    inactivatedAt: {
        type: Date
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
    // Solo para variables planeados o realizados
    date: {
        type: Date
    },
    // Solo para gastos fijos
    startDate: {
        type: Date
    },
    paymentHistory: [{
        amount: Number,
        paidAt: Date,
        payedWith: {
            payedMethod: {
                type: String,
                enum: ['Efectivo', 'Tarjeta', 'Cuenta nominada', 'Tarjeta de alimentos', 'Por definir'],
                default: 'Por definir'
            },
            description: String
        },
        realPayer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    // Referencias de usuario
    plannedPayer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    realPayer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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