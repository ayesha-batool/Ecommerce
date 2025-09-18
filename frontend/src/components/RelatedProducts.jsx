import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Title } from './Title';
import { ProductItem } from './ProductItem'
export const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);
    useEffect(() => {

        if (products.length === 0) return;
        console.log("category",products,category,subCategory);
        const relatedProducts = products.filter(item => item.category === category && subCategory===item.subCategory);
        setRelated(relatedProducts);

    }
 , [products]);
    return (
        <div className='mt-20'>

            <div className="text-center text-3xl py-2">
                <Title text1={"Related"} text2={"Products"} />

            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((product) => (
                    console.log("product",product),
                    <ProductItem key={product._id} data={product} />
                ))}
            </div>
        </div>
    )
}
