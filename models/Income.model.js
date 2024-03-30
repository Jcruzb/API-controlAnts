const mongoose = require('mongoose')
const Schema = mongoose.Schema
const FRECUENCY = ['Mensual', 'Único']

const incomeSchema = new Schema({
    source: {
        type: String,
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
    frecuency: {
        type: String,
        enum: FRECUENCY,
        required: true

    },
    date:{
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps:true,
    toJSON: {
        transform: function(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret._v;  
            return ret
        }
    }
}
)

module.exports = mongoose.model('Income', incomeSchema)