const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const ROLE = ['administrador', 'usuario'];

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [3, 'Name needs at least 3 chars'],
        maxLength: [50, 'Name needs at most 50 chars']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [EMAIL_PATTERN, 'Invalid email format'],
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password needs at least 8 chars'],
        trim: true
    },
    role: {
        type: String,
        enum: ROLE,
        required: true,
        default: 'usuario'
    },
    family: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        index: true
    },
    incomes: [{
        type: Schema.Types.ObjectId,
        ref: 'Income'
    }],
    debts: [{
        type: Schema.Types.ObjectId,
        ref: 'Debt'
    }],
    debtsToPay: [{
        type: Schema.Types.ObjectId,
        ref: 'Debt'
    }],
    financialRecords: [{
        recordType: {
            type: String,
            enum: ['income', 'debt', 'expense', 'movement'],
            required: true
        },
        recordId: {
            type: Schema.Types.ObjectId,
            refPath: 'financialRecords.recordType',
            required: true
        }
    }],
    budgets: [{
        type: Schema.Types.ObjectId,
        ref: 'Budget'
    }],
    active: {
        type: Boolean,
        default: false
    },
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    }]
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret.password;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => bcrypt.hash(user.password, salt))
            .then(hash => {
                user.password = hash;
                next();
            })
            .catch(error => next(error));
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
}

module.exports = mongoose.model('User', userSchema);