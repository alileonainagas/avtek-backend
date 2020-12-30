import User, {IUser} from '../models/User';
import Role from '../models/Role';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {

    try {
        //Creating and saving a new user
        const {username, email, password, roles} = req.body;
    
        const newUser: IUser = new User({
            username,
            email,
            password,
        });
        newUser.password = await newUser.encryptPassword(newUser.password);
        const savedUser = await newUser.save();

        //Rol assignment

        //Por revisar
        if (roles) {
            const foundRole = await Role.find({name: {$in: roles}});
            newUser.roles = foundRole.map(role => role._id);
        } else {
            const defaultRole: any = await Role.findOne({name: 'prospector'});
            newUser.roles = [defaultRole._id];
        }
        
        //Token
        const token: string = jwt.sign({
            _id: savedUser._id
        }, process.env.TOKEN_SECRET || 'avilatektestoken');
        
        //Por revisar
        //res.header('auth-token', token).json(savedUser);
        console.log(savedUser);
        res.json({token});

    } catch (error) {
        console.log(error);
    }

}
export const signIn = async (req: Request, res: Response) => {

    try {
        //Validating user validation
        const currentUser = await User.findOne({email: req.body.email});
        if (!currentUser) return res.status(400).json('Email or password is wrong!');
        const correctPassword: boolean = await currentUser.validatePassword(req.body.password);
        if (!correctPassword) return res.status(400).json('Invalid password!');
        res.json('signin!');
        
        const token: string = jwt.sign({
            _id: currentUser._id
        }, process.env.TOKEN_SECRET || 'avilatektestoken',{
            expiresIn: 86400
        });
        
        //Revisar
        //res.header('auth-token', token).json(currentUser);
        console.log(currentUser);
        res.json({token});

    } catch (error) {
        console.log(error);
    }
}