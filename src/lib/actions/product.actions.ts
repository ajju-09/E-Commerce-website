'use server'

import { connectToDatabase } from "../db"
import Product, { IProduct } from "../db/models/product.model";

export async function getAllCategories() {
    await connectToDatabase();
    // for distinct: “Give me a list of all unique values for the category field in this filtered set.”
    const categories = await Product.find({ isPublished: true}).distinct('category');
    return categories;
}

// It accepts tags compulsory and limit is optional
export async function getProductsForCard({tag, limit = 4,}: {tag: string, limit?: number}) {
    await connectToDatabase();
    const products = await Product.find( 
        {tags: { $in: [tag] }, isPublished: true },
        {
            name: 1,
            href: { $concat: ['/product/', '$slug'] },
            image: { $arrayElemAt:  [ '$images', 0] },
        }
    )
    .sort({ createdAt: 'desc'})
    .limit(limit)

    return JSON.parse(JSON.stringify(products)) as {
        name: string
        href: string
        image: string
    }[]
}

export async function getProductsByTag({ tag , limit = 10 }: { tag: string, limit?: number }){
    await connectToDatabase();
    const products = await Product.find({
        tags: { $in: [tag]},
        isPublished: true,
    })
    .sort({ createdAt: 'desc'})
    .limit(limit)

    return JSON.parse(JSON.stringify(products)) as IProduct[]
} 