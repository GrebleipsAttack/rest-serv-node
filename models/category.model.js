const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    category: {
        type: String,
        required: [true, 'category name is mandatory'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
}

module.exports = model('Category', CategorySchema);