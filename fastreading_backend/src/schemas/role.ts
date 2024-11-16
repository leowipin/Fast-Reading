import mongoose from 'mongoose';
import {PERMISSIONS} from '../utils/permissions.js'

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

export default Role