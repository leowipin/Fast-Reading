import mongoose from 'mongoose';
import {PERMISSIONS} from '../utils/permissions.js'

export interface RoleDocument extends Document {
    name: string;
    permissions: string[];
}

const roleSchema = new mongoose.Schema<RoleDocument>({
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

const Role = mongoose.model<RoleDocument>('Role', roleSchema);

export default Role