import {Schema, model} from 'mongoose';

const productSchema = new Schema({
    name: String,
    description: String,
    productLink: String,
    imgUrl: String
},
{
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);