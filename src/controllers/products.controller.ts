import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
    const {name, description, productLink, imgUrl} = req.body;
    console.log(req.body);

    const newProduct = new Product({name, description, productLink, imgUrl});
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
}
export const getProducts = async (req: Request, res: Response) => {
    const allProducts = await Product.find();
    res.json(allProducts);
}
export const getProductById = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
}
export const updateProductById = async (req: Request, res: Response) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body,
        {
            new: true   
    });
    res.status(200).json(updatedProduct);
}
export const deleteProductById = async (req: Request, res: Response) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json();
}