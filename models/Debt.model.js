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
    numberOfQuotes: { 
        type: Number,
        required: true
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

module.exports = mongoose.model('Debt', debtSchema);