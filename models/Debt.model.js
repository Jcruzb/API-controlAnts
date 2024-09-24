const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KIND = ['familiar', 'personal'];

const debtSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    kind: {
        type: String,
        enum: KIND,
        required: true
    },
    quote: { 
        type: Number,
        required: true
    },
    pays: [{
        quotes: {
            type: Number,
            required: true,
            default: 0
        },
        payDate: {
            type: Date
        }
    }],
    toPay: {
        type: Number,
    },
    numberOfQuotes: { 
        type: Number,
        required: true
    },
    feesToPay: {
        type: Number,
        default: 0
    },
    amount: { 
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    debtOwner: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
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

// Método para calcular el monto total de la deuda
debtSchema.virtual('totalDebt').get(function() {
    return this.quote * this.numberOfQuotes;
});

// Middleware para calcular automáticamente la fecha final de pago (endDate)
debtSchema.pre('save', function(next) {
    if (this.startDate && this.numberOfQuotes) {
        const startDate = new Date(this.startDate);
        const totalMonths = this.numberOfQuotes;
        startDate.setMonth(startDate.getMonth() + totalMonths);
        this.endDate = startDate; 
    }
    next();
});

debtSchema.pre('save', function(next) {
    const totalPaid = this.pays.reduce((total, pay) => total + pay.quotes*this.quote, 0);
    this.toPay = this.amount - totalPaid;

    const totalQuotesPaid = this.pays.reduce((total, pay) => total + pay.quotes, 0);
    this.feesToPay = this.numberOfQuotes - totalQuotesPaid;
    
    next();
});

module.exports = mongoose.model('Debt', debtSchema);