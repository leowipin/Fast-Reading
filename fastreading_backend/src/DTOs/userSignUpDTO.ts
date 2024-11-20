import Role from '../schemas/role.js';
import mongoose from 'mongoose';
import { hashPassword } from '../utils/auth.js';


export interface UserSignUpInputDTO {
    username: string;
    email: string;
    password: string;
}

export interface UserSignUpOutputDTO {
    username: string;
    email: string;
    password: string;
    role: mongoose.Types.ObjectId;
}

export const transformUserSignUpDTO = async (input: UserSignUpInputDTO): Promise<UserSignUpOutputDTO> => {
    
    let {username, email, password} = input;
    password = await hashPassword(password)
    const defaultRole = "normal_user";
    const role = await Role.findOne({ name: defaultRole });
    
    if (!role) {
      const error = new Error(`Role ${defaultRole} not found`) as any;
      error.status = 404;
      error.showMessageToUser = false;
      throw error;
    }

    return {
        username,
        email,
        password,
        role: role._id
    } 
}