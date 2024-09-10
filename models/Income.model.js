const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FREQUENCY = ['Mensual', 'Único'];
const GROUP = ['familiar', 'personal'];

const incomeSchema = new Schema({
    source: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        enum: FREQUENCY,
        required: true
    },
    incomeGroup: {
        type: String,
        enum: GROUP,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    limitDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: { // Cambiamos status a un objeto con propiedades booleanas
        planeado: {
            type: Boolean,
            default: true // Empieza como planeado
        },
        realizado: {
            type: Boolean,
            default: false // Por defecto no se ha realizado
        }
    },
    responsable: {
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

module.exports = mongoose.model('Income', incomeSchema);