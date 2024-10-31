const mongoose = require('mongoose');
const PERMISSIONS = require('../utils/permissions')

const roleSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: [String],
        default: [],
        enum: Object.values(PERMISSIONS)
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role
