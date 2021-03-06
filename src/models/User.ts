import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    roles: Array<string>;
    encryptPassword(password: string): Promise<string>
    validatePassword(password: string): Promise<boolean>
}

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        min: 3,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.methods.encryptPassword = async (password:string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
userSchema.methods.validatePassword = async function (password:string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);